import React, { useState, useEffect } from "react";
import gameService from "../services/gameService";
import userService from "../services/userService";
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
import { IoIosTrophy } from "react-icons/io";
import StatsPerHour from "./topStats/statsPerHour";
import SideBetsCard from "./sidebets/sidebetsCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import * as dayjs from "dayjs";
import addNotification from "react-push-notification";
import { Notifications } from "react-push-notification";

export default function MainTable(props) {
  //get the data for the table
  const [data, setData] = useState("");
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
  const [totalGames, setTotalGames] = useState("");
  const [statsPerHour, setstatsPerHour] = useState([]);
  const teamId = props.match.params.teamId;
  const [teams, setTeams] = useState([]);
  const [lastGame, setLastGame] = useState([]);
  const [user, setUser] = useState({});
  // const [register, setRegister] = useState({});
  var relativeTime = require("dayjs/plugin/relativeTime");

  useEffect(() => {
    const getLastGame = async () => {
      let game = await gameService.lastGame(teamId);
      game = game.data[0];
      setLastGame(game);
      const me = await userService.getUserDetails();
      setUser(me.data);
    };

    getLastGame();
  }, [teamId]);

  // useEffect(() => {
  //   const reg = async () => {
  //     let sw = await navigator.serviceWorker.register("../../");
  //     console.log("sw", sw);
  //   };
  //   reg();
  // }, []);

  //fetch data from DB

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.table(teamId);
      table = table.data;

      table.sort((a, b) => b.totalProfit - a.totalProfit);
      setData(table);

      let teamPic = await teamService.getTeam(teamId);
      setTeamImage(teamPic.data);

      let totalCash = await gameService.totalCash(teamId);
      setTotalCash(totalCash.data);

      let totalGames = await gameService.totalGames(teamId);
      setTotalGames(totalGames.data);

      let h2h = await h2hService.getPointsByTeam(teamId);
      if (h2h.data[0]._id.name === "Nispach") {
        h2h.data.shift();
      }
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
    return () => {
      let isCancelled = true;
    };
  }, [teamId]);

  useEffect(() => {
    const dataByMonths = async () => {
      let thisMonth = new Date().getMonth();
      let results = await gameService.monthsData(
        props.match.params.teamId,
        thisMonth + 1
      );
      results = results.data;
      if (results.length > 0) {
        const currMonth = results.filter(
          (e) => e._id.monthPlayed !== thisMonth
        );
        const currMonthLeader = await currMonth.sort(
          (a, b) => b.totalProfit - a.totalProfit
        );

        setMonthleader(currMonthLeader);
      } else {
        const currMonth = results.filter(
          (e) => e._id.monthPlayed !== thisMonth - 1
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

  useEffect(() => {
    const statsPerHour = async () => {
      const dataPerHour = await gameService.statsPerHour(
        props.match.params.teamId
      );
      setstatsPerHour(dataPerHour.data);
    };
    statsPerHour();
  }, [props.match.params.teamId]);

  //get team players for avatars
  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await teamService.getMyTeam();

      setTeams(data[0].players);
    };
    fetchTeams();
  }, []);
  const subscribe = () => {
    console.log("aa");
    addNotification({
      title: "Warning",
      native: true,
    });
  };
  function successNotification() {
    addNotification({
      title: "Success",
      subtitle: "You have successfully submitted",
      message: "Welcome to GeeksforGeeks",
      theme: "light",
      closeButton: "X",
      backgroundTop: "green",
      native: true,
    });
  }

  dayjs.extend(relativeTime);
  let daysFromGame = dayjs(lastGame.createdAt).fromNow();

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
            enabled={data.length < 1 ? true : false}
          />
        </div>
      )}

      {data.length > 1 && (
        <React.Fragment>
          <div className="teamImages d-flex w-100 justify-content-between">
            <motion.img
              style={{
                width: 150,
                height: 150,
                borderRadius: 30,
                backgroundColor: "#fff",
              }}
              animate={{ rotate: 360 }}
              transition={{
                type: "spring",
                duration: 5,
                bounce: 0.6,
              }}
              src={`${apiImage}${teamImage.teamImage}`}
              alt="team"
            />
            <Link to={`/players-stats/${user._id}`}>
              <div
                className="teamShield d-flex justify-content-center flex-column align-items-center"
                style={{
                  backgroundImage: `url(${apiImage}images/fifaCard.png)`,
                }}
              >
                <img src={`${apiImage}${user.image}`} alt="" />
                <p className="m-0">{user.nickName}</p>
              </div>
            </Link>
          </div>
          <div>
            {/* <button onClick={successNotification} className="btn btn-primary">
              subscribe
            </button> */}
            <p className="ms-2 text-white mb-2 mt-2 display-6">
              {teamImage.name}
            </p>
            <div className="container playersList mb-2">
              {teams.map((player) => (
                <motion.div
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 5 }}
                >
                  <Link to={`/players-stats/${player._id}`}>
                    <img src={`${apiImage}${player.image}`} alt="player" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{
              delay: 2,
              type: "spring",
              duration: 2,
              bounce: 0.6,
            }}
            className="totalCash d-flex flex-column mb-2 ps-1"
          >
            <p className="mb-0">
              Total Cash Played:
              <strong>
                <span className="ps-1">
                  {totalCash[0]
                    ? totalCash[0].totalCashing.toLocaleString()
                    : null}
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
                  <IoIosTrophy className="ms-1 mb-1" />
                </span>
              </strong>
            </p>
            <p className="mb-0">
              Last Game Played:
              <strong>
                <span className="ps-1">
                  {totalGames[0] ? daysFromGame : ""}
                  <MdDateRange className="ms-1 " />
                </span>
              </strong>
            </p>
            <div className="cardOdds">
              <a
                href="https://www.cardschat.com/poker/tools/poker-odds-calculator/"
                target="_blank"
              >
                Texas Odds Calculator
              </a>
            </div>
          </motion.div>
          <motion.div
            id="dashboardDisplay"
            initial={{ opacity: 0 }}
            animate={{
              y: ["300px", "0px"],
              delay: 2.2,
              opacity: 1,
            }}
            transition={{ duration: 2 }}
          >
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
            {statsPerHour.length > 1 && (
              <StatsPerHour
                header="Profit Per Hour"
                name={statsPerHour.length > 0 ? statsPerHour[0]._id.name : ""}
                image={statsPerHour.length > 0 ? statsPerHour[0]._id.image : ""}
                data={
                  statsPerHour.length > 0 ? statsPerHour[0].profitPerHour : ""
                }
                team={teamId}
                path={`/stats-per-hour/${props.match.params.teamId}`}
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
                header="Stats By Month's"
                data={monthleader[0].totalProfit}
                name={monthleader[0]._id.name}
                image={monthleader[0]._id.image}
                cMonth={monthleader[0].lastGame}
                team={teamId}
              />
            )}
            {monthleader.length === 0 && (
              <p className="text-danger display-10">
                {new Date().toLocaleString("en-us", { month: "long" })} Stats-No
                games this month yet
              </p>
            )}
            {h2h.length > 0 && (
              <H2hCard
                header="H2H Games"
                data={h2h[0].avgPoints.toFixed(2)}
                name={h2h[0]._id.name}
                image={h2h[0]._id.image}
                team={teamId}
              />
            )}
            {/* {teamId === "61b243ac87b6640ad041224f" && (
              <SideBetsCard teamId={teamId} />
            )} */}
          </motion.div>
          <MainLastgame teamId={teamId} />
          <AllGames teamId={teamId} />
        </React.Fragment>
      )}
    </div>
  );
}
