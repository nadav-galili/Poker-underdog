import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../services/gameService";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "./common/pageHeader";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Avatar } from "@material-ui/core";
import MainLastGame from "./mainLastGame";
import PlayerCard from "./topStats/playerCard";
import CardTable from "./topStats/cardTable";
import SuccessP from "./topStats/successp";
import CurrMonth from "./topStats/currMonth";

//set headers for the tables
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
    minWidth: 51,
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

///func to get the data 4 the table
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
  //get the data for the table
  const [data, setData] = useState([]);
  const [profit, setProfit] = useState("");
  const [avgprofit, setAvgprofit] = useState("");
  const [totalgames, setTotalgames] = useState("");
  const [avgcashing, setAvgcashing] = useState("");
  const [success, setSuccess] = useState("");
  const [gamesprofit, setGamesprofit] = useState("");
 
  const [monthleader, setMonthleader] = useState("");
  

  const teamId=props.match.params.teamId;

  
  // get current year for header
  const year = new Date();
  const thisYear = year.getFullYear();
  const thisMonth = year.getMonth();
  

  //fetch data from DB
  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.table(teamId);
      table = table.data;
     
      if (table.length > 0) {
        const profit = await table.reduce((prev, current) =>
          +prev.totalProfit > current.totalProfit ? prev : current
        );
        const avgProfit = await table.reduce((prev, current) =>
          +prev.avgProfit > current.avgProfit ? prev : current
        );
        const totalGames = await table.reduce((prev, current) =>
          +prev.numOfGames > current.numOfGames ? prev : current
        );
        const avgcashing = await table.reduce((prev, current) =>
          +prev.avgCashing < current.avgCashing ? prev : current
        );

        const successP = await table.reduce((prev, current) =>
          +prev.successPercentage > current.successPercentage ? prev : current
        );

        const gamesProfit = await table.reduce((prev, current) =>
          +prev.gamesWithProfit > current.gamesWithProfit ? prev : current
        );

        setGamesprofit(gamesProfit);
        setSuccess(successP);
        setAvgcashing(avgcashing);
        setTotalgames(totalGames);
        setAvgprofit(avgProfit);
        setProfit(profit);
        setData(table);
      }
    };

    getTable();
  }, [setData, teamId]);

  useEffect(() => {
    const dataByMonths = async () => {
      let results = await gameService.monthsData(props.match.params.teamId);
      results = results.data;

      if (results.length > 0) {
        const currMonth = results.filter(
          (e) => e._id.monthPlayed !== thisMonth
        );
       
  
        const currMonthLeader = await currMonth.reduce((prev, current) =>
          +prev.totalProfit > current.totalProfit ? prev : current
        );


        setMonthleader(currMonthLeader);
      }
    };
    dataByMonths();
  }, [thisMonth, props.match.params.teamId]);
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
        <Avatar src={player._id.image} className={classes.large} />,
        player.totalProfit,
        player.avgProfit.toFixed(2),
        player.numOfGames,
        player.avgCashing.toFixed(2),
        formated
      )
    );
  });

  <CardTable teamId={teamId} data={data}/>
  return (
    <div className="container">
      <h1>{thisYear} Top Stats</h1>
      <div className="row ">
        <PlayerCard
          header="Total Profit"
          data={profit.totalProfit}
          name={profit ? profit._id.name : ""}
          image={profit ? profit._id.image : ""}
          cardName="totalProfit"
          team={teamId}
          table={data}
        />
        <PlayerCard
          header="Average Profit"
          data={avgprofit.avgProfit}
          name={avgprofit ? avgprofit._id.name : ""}
          image={avgprofit ? avgprofit._id.image : ""}
          cardName="avgProfit"
          team={teamId}
        />
        <PlayerCard
          header="Total Games"
          data={totalgames.numOfGames}
          name={totalgames ? totalgames._id.name : ""}
          image={totalgames ? totalgames._id.image : ""}
          cardName="numOfGames"
          team={teamId}
        />
        <PlayerCard
          header="Average Cashing"
          data={avgcashing.avgCashing}
          name={avgcashing ? avgcashing._id.name : ""}
          image={avgcashing ? avgcashing._id.image : ""}
          cardName="avgCashing"
          team={teamId}
       />
        <PlayerCard
          header="Games With Profit"
          data={gamesprofit.gamesWithProfit}
          name={gamesprofit ? gamesprofit._id.name : ""}
          image={gamesprofit ? gamesprofit._id.image : ""}
          cardName="gamesWithProfit"
          team={teamId}
        />
        <SuccessP
         header="Success %"
         data={success.successPercentage}
         name={success ? success._id.name : ""}
         image={success ? success._id.image : ""}
         cardName="successPercentage"
        team={teamId}
       />
        <CurrMonth
           header="Current Month"
           data={monthleader.totalProfit}
           name={monthleader ? monthleader._id.name : ""}
           image={monthleader ? monthleader._id.image : ""}
           cMonth={monthleader ? monthleader.lastGame : ""}
           team={teamId}/>

      </div>

      <PageHeader titleText="Main Table" />
      {data.length < 1 && (
        <div className="start">
          <h2 className="noGames">No Games Played Yet!</h2>
          <Link
            className="btn btn-success mb-2"
            to={`/new-game/${props.match.params.teamId}`}
          >
            Start a new game
          </Link>
        </div>
      )}
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
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className={
                              column.id === "avgProfit" && value > 0
                                ? "bg-success"
                                : column.id === "avgProfit" && value < 0
                                ? "bg-danger"
                                : ""
                            }

                            // style={inputStyles}
                          >
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
  {/* // Display last game played */} 
      <MainLastGame team={props.match.params.teamId} />
    </div>
  );
}
