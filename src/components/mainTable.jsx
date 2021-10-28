import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gameService from "../services/gameService";
import PageHeader from "./common/pageHeader";
import GameEnd from "./gameEnd";
import PlayerCard from "./topStats/playerCard";
import CardTable from "./topStats/cardTable";
import SuccessP from "./topStats/successp";
import CurrMonth from "./topStats/currMonth";
import Profits from "./topStats/profits";
import { SpinnerDiamond } from "spinners-react";

export default function MainTable(props) {
  //get the data for the table
  const [data, setData] = useState([]);
  // const [profit, setProfit] = useState([]);
  const [avgprofit, setAvgprofit] = useState([]);
  const [totalgames, setTotalgames] = useState([]);
  const [avgcashing, setAvgcashing] = useState([]);
  const [success, setSuccess] = useState([]);
  const [gamesprofit, setGamesprofit] = useState([]);

  // const [monthleader, setMonthleader] = useState("");
  const [profits, setProfits] = useState([]);

  const teamId = props.match.params.teamId;

  //fetch data from DB
  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.table(teamId);
      table = table.data;

      await table.sort((a, b) => b.totalProfit - a.totalProfit);
      setData(table);

      let totoalg = [...table];
      const totalG = await totoalg.sort((a, b) => b.numOfGames - a.numOfGames);
      setTotalgames(totalG);

      let avgp = [...table];
      const avgP = await avgp.sort((a, b) => b.avgProfit - a.avgProfit);
      setAvgprofit(avgP);

      let gamep = [...table];
      const gameP = await gamep.sort(
        (a, b) => b.gamesWithProfit - a.gamesWithProfit
      );
      setGamesprofit(gameP);

      let successPc = [...table];
      const successP = await successPc.sort(
        (a, b) => b.successPercentage - a.successPercentage
      );
      setSuccess(successP);
      let avgc = [...table];
      const avgC = await avgc.sort((a, b) => a.avgCashing - b.avgCashing);
      setAvgcashing(avgC);
    };

    getTable();
  }, [setData, teamId]);

  // useEffect(() => {
  //   const dataByMonths = async () => {
  //     let results = await gameService.monthsData(props.match.params.teamId);
  //     results = results.data;

  //     if (results.length > 0) {
  //       const currMonth = results.filter(
  //         (e) => e._id.monthPlayed !== thisMonth
  //       );

  //       const currMonthLeader = await currMonth.reduce((prev, current) =>
  //         +prev.totalProfit > current.totalProfit ? prev : current
  //       );

  //       setMonthleader(currMonthLeader);
  //     }
  //   };
  //   dataByMonths();
  // }, [thisMonth, props.match.params.teamId]);

  useEffect(() => {
    const profits = async () => {
      let results = await gameService.profits(props.match.params.teamId);
      results = results.data;

      setProfits(results);
    };
    profits();
  }, [props.match.params.teamId]);

  // let rank = 1;

  <CardTable teamId={teamId} data={data} key={data.lastGame} />;

  return (
    <div className="container" id="dashboard">
      <PageHeader className="mb-0" titleText={new Date().getFullYear() + " Top Stats"} />
      <span>{new Date().toLocaleDateString("en-GB")}</span>
      {data.length < 1 && (
        <div className="spinner mt-5">
          <SpinnerDiamond
            size={130}
            thickness={151}
            speed={81}
            color="rgba(108, 20, 180, 1)"
            secondaryColor="rgba(252, 252, 252, 1)"
            // enabled={true}
            enabled={data.length < 1 ? true : false}
          />
        </div>
      )}
      {data.length > 1 && (
        <React.Fragment>
          <div id="dashboardDisplay">
            <PlayerCard
              header="Total Profit"
              data={data[0].totalProfit}
              name={data[0]._id.name}
              image={data[0]._id.image}
              cardName="totalProfit"
              team={teamId}
              table={data}
            />
            {avgprofit.length > 1 && (
              <PlayerCard
                header="Average Profit"
                data={avgprofit[0].avgProfit}
                name={avgprofit[0]._id.name}
                image={avgprofit[0]._id.image}
                cardName="avgProfit"
                team={teamId}
              />
            )}

            {totalgames.length > 1 && (
              <PlayerCard
                header="Total Games"
                data={totalgames[0].numOfGames}
                name={totalgames[0]._id.name}
                image={totalgames[0]._id.image}
                cardName="numOfGames"
                team={teamId}
              />
            )}

            {gamesprofit.length > 1 && (
              <PlayerCard
                header="Games With Profit"
                data={gamesprofit[0].gamesWithProfit}
                name={gamesprofit[0]._id.name}
                image={gamesprofit[0]._id.image}
                cardName="gamesWithProfit"
                team={teamId}
              />
            )}

            {success.length > 1 && (
              <SuccessP
                header="Success %"
                data={success[0].successPercentage}
                name={success[0]._id.name}
                image={success[0]._id.image}
                cardName="successPercentage"
                team={teamId}
              />
            )}
         
            {avgcashing.length > 1 && (
              <PlayerCard
                header="Average Cashing"
                data={avgcashing[0].avgCashing}
                name={avgcashing[0]._id.name}
                image={avgcashing[0]._id.image}
                cardName="avgCashing"
                team={teamId}
              />
            )}

   

           <Profits
              header="Top 10 Profits"
              name={profits.length > 0 ? profits[0].players.name : ""}
              image={profits.length > 0 ? profits[0].players.image : ""}
              data={profits.length > 0 ? profits[0].players.profit : ""}
              team={teamId}
            /> 
                     {/*
         <CurrMonth
              header="Current Month"
              data={monthleader.totalProfit}
              name={monthleader ? monthleader._id.name : ""}
              image={monthleader ? monthleader._id.image : ""}
              cMonth={monthleader ? monthleader.lastGame : ""}
              team={teamId}
            />   */}
          </div>
          {/* 
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
          )} */}

          {/* <Paper className={classes.root}>
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
    </Paper> */}
          {/* // Display last game played */}
        </React.Fragment>
      )}
    </div>
  );
}
