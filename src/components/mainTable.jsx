import React, { useState, useEffect } from "react";
import gameService from "../services/gameService";
import PageHeader from "./common/pageHeader";
import PlayerCard from "./topStats/playerCard";
import SuccessP from "./topStats/successp";
import CurrMonth from "./topStats/currMonth";
import Profits from "./topStats/profits";
import { SpinnerDiamond } from "spinners-react";
import MainLastgame from "./mainLastGame";
import teamService from "../services/teamService";
import { apiImage } from "../config.json";
import h2hService from "../services/h2hService";
import H2hCard from "./h2h/h2hCard";
import AllGames from "./games/allGames";
import {IoIosTrophy} from "react-icons/io"

export default function MainTable(props) {
  //get the data for the table
  const [data, setData] = useState([]);
  const [avgprofit, setAvgprofit] = useState([]);
  const [totalgames, setTotalgames] = useState([]);
  const [avgcashing, setAvgcashing] = useState([]);
  const [success, setSuccess] = useState([]);
  const [gamesprofit, setGamesprofit] = useState([]);
  const [h2h, setH2h] = useState([]);

  const [monthleader, setMonthleader] = useState([]);
  const [profits, setProfits] = useState([]);
  const [teamImage, setTeamImage] = useState("");
  const [totalCash, setTotalCash] = useState({});
  const [totalGames, setTotalGames]=useState("");

  const teamId = props.match.params.teamId;

  //fetch data from DB
  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.table(teamId);
      table = table.data;
      await table.sort((a, b) => b.totalProfit - a.totalProfit);
      setData(table);

      let teamPic = await teamService.getTeam(teamId);
      setTeamImage(teamPic.data);

      let totalCash = await gameService.totalCash(teamId);
      setTotalCash(totalCash.data);

      let totalGames=await gameService.totalGames(teamId);
      setTotalGames(totalGames.data);

      let h2h = await h2hService.getPointsByTeam(teamId);
      setH2h(h2h.data);

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

  useEffect(() => {
    const dataByMonths = async () => {
      let results = await gameService.monthsData(props.match.params.teamId);
      results = results.data;
      let thisMonth = new Date().getMonth();
      if (results.length > 0) {
        const currMonth = results.filter(
          (e) => e._id.monthPlayed !== thisMonth
        );
        const currMonthLeader = await currMonth.sort(
          (a, b) => b.totalProfit - a.totalProfit
        );

        setMonthleader(currMonthLeader);
      }
    };
    dataByMonths();
  }, [props.match.params.teamId]);

  useEffect(() => {
    const profits = async () => {
      let results = await gameService.profits(props.match.params.teamId);
      results = results.data;
      setProfits(results);
    };
    profits();
  }, [props.match.params.teamId]);

  return (
    <div className="container" id="dashboard">
      <PageHeader
        className="mb-0"
        titleText={new Date().getFullYear() + " Top Stats"}
      />
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
           <div className="teamImg w-100 d-flex flex-row mb-2 justify-content-start">
        <img src={`${apiImage}${teamImage.teamImage}`} alt="" />
        <p className="ms-2">{teamImage.name}</p>
      </div>
      <div className="totalCash d-flex flex-column mb-2">
        <p className="mb-0">
          Total Cash Played:
          <strong>
            <span className="ps-1">
              {totalCash[0] ? totalCash[0].totalCashing.toLocaleString() : null}
              <i className="fas fa-money-bill-alt ps-1"></i>
            </span>
          </strong>
        </p>
        <p className="mb-0">
          Total Hours Played:
          <strong>
            <span className="ps-1">
              {totalCash[0] ? totalCash[0].totalHours.toFixed(2) : null}
              <i className="fas fa-hourglass-half ps-1 "></i>
            </span>
          </strong>
        </p>
        <p className="mb-0">
          Total Games Played:
          <strong>
            <span className="ps-1">
              {totalGames[0] ? totalGames[0].TotalGames : null}
              <IoIosTrophy className="ms-1 mb-1"/>
            </span>
          </strong>
        </p>
      </div>
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
            {monthleader.length > 0 && (
              <CurrMonth
                header="Current Month"
                data={monthleader[0].totalProfit}
                name={monthleader[0]._id.name}
                image={monthleader[0]._id.image}
                cMonth={monthleader[0].lastGame}
                team={teamId}
              />
            )}
            {monthleader.length===0 &&(<p className="text-danger display-10">{new Date().toLocaleString('en-us',{month:'long'})} Stats-No games this month yet</p>)}
            {h2h.length > 0 && (
              <H2hCard
                header="H2H Games"
                data={h2h[0].totalPoints}
                name={h2h[0]._id.name}
                image={h2h[0]._id.image}
                team={teamId}
              />
            )}
          </div>
          <MainLastgame teamId={teamId} />
          <AllGames teamId={teamId}  />
        </React.Fragment>
      )}
    </div>
  );
}
