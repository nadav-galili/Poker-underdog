import React, { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const columns = [
  { id: "name", label: "Name", minWidth: 70 },
  { id: "image", label: "Image", minWidth: 70 },
  { id: "add_cashing", label: "Add Cashing", minWidth: 70 },
  {
    id: "ammount_cashed",
    label: "Ammount Cashed",
    minWidth: 70,
    //   align: 'right',
  },
  {
    id: "cash_in_hand",
    label: "Cash In Hand",
    minWidth: 70,
    // align: "right",
  },
  {
    id: "profit",
    label: "Profit/Loss",
    minWidth: 70,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "cancel_cashing",
    label: "Cancel Cashing",
    minWidth: 70,
    //   align: 'right',
  },
];

function createData(
  name,
  image,
  add_cashing,
  ammount_cashed,
  cash_in_hand,
  profit,
  cancel_cashing
) {
  //const profit = cash_in_hand - ammount_cashed;
  return {
    name,
    image,
    add_cashing,
    ammount_cashed,
    cash_in_hand,
    profit,
    cancel_cashing,
  };
}

const useStyles = makeStyles({
  root: {
    width: "80%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Game(props) {
  const [livePlayers, setLivePlayers] = useState([]);

  useEffect(() => {
    let players = localStorage.getItem("playersInGame");
    players = JSON.parse(players);

    setLivePlayers(players);
    setUpdate(players);
  }, []);

  const rows = [];

  const [cashing, setCashing] = useState(livePlayers);
  const [cashInHand, setCashInHand] = useState(livePlayers);
  const [update, setUpdate] = useState(livePlayers);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function addCashing(playerId) {
    let player = livePlayers.find((e) => playerId === e.id);

    setCashing((player.cashing += 50));
  }

  function undoCashing(playerId) {
    let player = livePlayers.find((e) => playerId === e.id);
    if (player.cashing > 0) {
      setCashing((player.cashing -= 50));
    }
  }

  function handleChange(cash, playerId) {
    let player = livePlayers.find((e) => playerId === e.id);
    cash = parseInt(cash);
    setCashInHand((player.cashInHand = cash));
  }

  async function updateGame() {
    Swal.fire({
      title: "Are you sure you ended the game?",
      text: "you wont be able to cancel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        update.map((player) => {
          player.profit = player.cashInHand - player.cashing;
          player.numOfcashing = player.cashing / 50;
          return setUpdate(player);
        });
        let data = localStorage.getItem("data");
        data = JSON.parse(data);
        let teamInfo = {};
        teamInfo.team_name = data.name;
        teamInfo.team_id = data._id;
        teamInfo.players = update;
        localStorage.removeItem("playersInGame");
        localStorage.removeItem("data");
        http.post(`${apiUrl}/games`, teamInfo);

        props.history.push(`/last-game/${teamInfo.team_id}`);
        toast.success("GAME OVER", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }

  livePlayers.forEach((e) => {
    rows.push(
      createData(
        e.name,
        <Avatar src={e.image} alt={e.name} />,
        <i
          className="fas fa-money-bill-wave  "
          onClick={() => addCashing(e.id)}
        >
          Add 50$
        </i>,
        e.cashing,
        <input
          type="number"
          onChange={(input) => handleChange(input.target.value, e.id)}
        ></input>,
        e.cashInHand - e.cashing,
        <i className="fas fa-minus-circle" onClick={() => undoCashing(e.id)}>
          Cancel cashing
        </i>
      )
    );
  });
  return (
    <div className="container-fluid">
      <PageHeader titleText="Start a new game" />
     
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
                      key={row.name}
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
      <button
        type="button"
        onClick={updateGame}
        className="btn btn-primary btn-lg mt-3 border mb-3"
      >
        Update results
      </button>
      <p className="steps">Steps for starting a new game:</p>
      <ol>
        <li>
          Add an initial cashing for each player participating (usually just
          50$).
        </li>
        <li>
          Start playing poker with your friends and each time a player cashes in
          , press the "add 50" icon.
        </li>
        <li>
          After you finished playing , insert the total ammount of cash each
          player has in the "Cash in hand" field.
        </li>
        <li>
          Press the update results button and get a summary of your latest game.
        </li>
        <li>All In!!!</li>
      </ol>
    </div>
  );
}
