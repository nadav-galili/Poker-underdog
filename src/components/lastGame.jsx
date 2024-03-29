import React, { useEffect, useState } from "react";
//import PropTypes from "prop-types";
//import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
//import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
//import TableSortLabel from "@material-ui/core/TableSortLabel";
//import Toolbar from "@material-ui/core/Toolbar";
//import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//import Checkbox from "@material-ui/core/Checkbox";
//import IconButton from "@material-ui/core/IconButton";
//import Tooltip from "@material-ui/core/Tooltip";
////import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Switch from "@material-ui/core/Switch";
//import DeleteIcon from "@material-ui/icons/Delete";
//import FilterListIcon from "@material-ui/icons/FilterList";
import { Link } from "react-router-dom";
import gameService from "../services/gameService";
import { Avatar } from "@material-ui/core";
import PageHeader from "../components/common/pageHeader";
import { apiImage } from "../config.json";

const columns = [
  { id: "rank", label: "Rank", align: "center" },
  { id: "player", label: "Player", align: "center" },
  {
    id: "image",
    label: "Image",
    // maxWidth: 10,
    align: "center",
  },
  {
    id: "profit",
    label: "Profit",
    // minWidth: 20,
    align: "center",
  },
  {
    id: "num_of_cashing",
    label: "Num of cashing",
    // minWidth: 20,
    align: "center",
  },
];

function createData(rank, player, image, profit, num_of_cashing) {
  return { rank, player, image, profit, num_of_cashing };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function LastGame(props) {
  const [data, setData] = useState([]);
  const [lastGame, setLastGame] = useState([]);

  useEffect(() => {
    const getLastGame = async () => {
      let game = await gameService.lastGame(props.match.params.teamId);

      game = game.data[0];
      setData(game.players);
      setLastGame(game);
    };

    getLastGame();
  }, []);

  const classes = useStyles();

  const rows = [];

  if (data.length > 0) {
    let rank = 1;
    data.forEach((e) => {
      rows.push(
        createData(
          rank++,
          e.name,
          <Avatar src={`${apiImage}${e.image}`} />,
          e.profit,
          e.numOfcashing
        )
      );
    });
  }

  const gameDate = new Date(lastGame.created_at);
  const day = gameDate.getDate();
  const month = gameDate.getMonth() + 1;
  const year = gameDate.getFullYear();
  const formated = `${day}/${month}/${year}`;

  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-12 col-lg-6">
          <PageHeader titleText="Last Game" />
          <h3 className="mb-4">Played at:{formated}</h3>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table" size="medium">
                <TableHead>
                  <TableRow className="last-head">
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
                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
          </Paper>
        </div>
      </div>

      <Link
        to={`/main-table/${props.match.params.teamId}`}
        className="btn btn-primary btn-lg mt-5"
      >
        See Team's Statistics
      </Link>
    </div>
  );
}
