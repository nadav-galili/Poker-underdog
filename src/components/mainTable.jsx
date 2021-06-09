import React, { useState, useEffect } from "react";
import gameService from "../services/gameService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Avatar } from "@material-ui/core";

const columns = [
  { id: "rank", label: "Rank", minWidth: 50 },

  { id: "player", label: "Player", minWidth: 100 },

  {
    id: "image",
    label: "Image",
    maxWidth: 50,
    align: "left",
  },
  {
    id: "profit",
    label: "Profit",
    minWidth: 50,
    align: "right",
  },
  {
    id: "avgProfit",
    label: "Average Profit",
    minWidth: 50,
    align: "center",
  },
  {
    id: "numOfGames",
    label: "Number Of Games",
    minWidth: 50,
    align: "center",
  },
  {
    id: "avgCashing",
    label: "Average Cashing",
    minWidth: 50,
    align: "center",
  },
  {
    id: "lastGame",
    label: "Last Game Played",
    minWidth: 50,
    align: "center",
  },
];

function createData(
  rank,
  player,
  image,
  profit,
  avgProfit,
  numOfGames,
  avgCashing,
  lastGame
) {
  return {
    rank,
    player,
    image,
    profit,
    avgProfit,
    numOfGames,
    avgCashing,
    lastGame,
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function MainTable(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.table(props.match.params.teamId);
      table = table.data;
      setData(table);
    };

    getTable();
  }, [setData, props.match.params.teamId]);

  const classes = useStyles();
  const rows = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rank = 1;
  data.forEach((player) => {
    const playerDate = new Date(player.lastGame);
    const day = playerDate.getDate();
    const month = playerDate.getMonth() + 1;
    const year = playerDate.getFullYear();
    const formated = `${day}/${month}/${year}`;

    rows.push(
      createData(
        rank++,
        player._id.name,
        <Avatar src={player._id.image} />,
        player.totalProfit,
        player.avgProfit.toFixed(2),
        player.numOfGames,
        player.avgCashing.toFixed(2),
        formated
      )
    );
  });
  return (
    <div className="container mt-3">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.player}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
