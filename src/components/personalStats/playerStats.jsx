import React, { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/userService";
import gameService from "../../services/gameService";
import h2hService from "../../services/h2hService";
import PageHeader from "../common/pageHeader";
import { SpinnerCircular } from "spinners-react";
import { apiImage } from "../../config.json";
import _ from "lodash";
import TotalPersonal from "./totalPersonal";
import { Line } from "react-chartjs-2";

const PlayerStats = (props) => {
  const [me, setMe] = useState({});
  const [stats, setStats] = useState({});
  const [month, setMonth] = useState([]);
  const [points, setPoints] = useState([]);
  const [details, setDetails] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDates, setChartDates] = useState([]);
  const [chartCashing, setChartCashing] = useState([]);
  let currentMonth = new Date();
  let currentMonthNumber = currentMonth.getMonth() + 1;
  currentMonth = currentMonth.toLocaleString("en-US", { month: "long" });

  useEffect(() => {
    const getTable = async () => {
      if (me.teams) {
        let table = await gameService.monthsData(me.teams[0]);
        table = table.data;
        let currentMonth = [...table];
        currentMonth = currentMonth.filter(
          (month) => month._id.monthPlayed === currentMonthNumber
        );
        currentMonth = currentMonth.find((e) => e._id.player_id === me._id);
        setMonth(currentMonth);
        let detailed = await gameService.personalGames(me._id);
        setDetails(detailed.data);

        let myDetailed = await gameService.personalGames(me._id);

        let chartDetails = [];
        let chartDates = [];
        let chartCash = [];
        try {
          await myDetailed.data.forEach((e) =>
            chartDetails.push(e.players.profit)
          );
          setChartData(chartDetails);

          await myDetailed.data.forEach((e) =>
            chartCash.push(e.players.cashing)
          );
          setChartCashing(chartCash);

          await myDetailed.data.forEach((e) =>
            chartDates.push(
              new Date(e.createdAt).toLocaleDateString("en-GB").substr(0, 5)
            )
          );
          setChartDates(chartDates);
        } catch {
          console.log("errr");
        }
      }
    };

    getTable();
  }, [setMonth, currentMonthNumber, me.teams, me._id]);

  useEffect(() => {
    const getMydata = async () => {
      let myData = await userService.getPlayerDetails(props.match.params.id);
      delete myData.data.password;
      setMe(myData.data);
      let myStats = await gameService.personal(myData.data._id);
      setStats(myStats.data[0]);
    };
    getMydata();
  }, []);

  useEffect(() => {
    const points = async () => {
      if (me._id) {
        let myPoints = await h2hService.getPointsByPlayer(me._id);
        setPoints(myPoints.data[0]);
      }
    };
    points();
  }, [me._id]);

  const data = {
    labels: chartDates,
    datasets: [
      {
        label: "Profit",
        data: chartData,
        fill: false,
        backgroundColor: "#6c14b4",
        borderColor: "#6c14b4",
      },
      {
        label: "Cashing",
        data: chartCashing,
        fill: false,
        backgroundColor: "#2752ea",
        borderColor: "#2752ea",
      },
    ],
  };
  let delayed;
  const options = {
    options: {
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (
            context.type === "data" &&
            context.mode === "default" &&
            !delayed
          ) {
            delay = context.dataIndex * 400 + context.datasetIndex * 200;
          }
          return delay;
        },
      },
      scales: {
        x: {
          type: "linear",
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="container playerStats pb-4">
      <PageHeader titleText="Player Statistics" />
      {_.isEmpty(stats) && (
        <div className="spinner">
          <SpinnerCircular
            size={130}
            thickness={151}
            speed={81}
            color="rgba(108, 20, 180, 1)"
            secondaryColor="rgba(252, 252, 252, 1)"
            // enabled={true}
            enabled={_.isEmpty(stats) ? true : false}
          />
        </div>
      )}
      {!_.isEmpty(stats) && (
        <div className="">
          <div className="playerInfo bg-white col-11 col-lg-4">
            <span className="text-primary ms-3">
              {new Date().toLocaleDateString("en-GB")}
            </span>
            <div
              className="playerBg d-flex justify-content-around"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <div className="pDetails">
                <p>
                  {me.firstName} {me.lastName}
                </p>
                <p className="text-white">{me.nickName}</p>
              </div>
              <div className="pImage">
                <img src={`${apiImage}${me.image}`} alt="" />
              </div>
            </div>
            <div className="detailedStats d-flex justify-content-between mt-3">
              <div className="personalStatP">
                <p>Total Profit</p>
                <p>{stats.totalProfit}</p>
              </div>
              <div className="personalStatP">
                <p>Avg Profit</p>
                <p>{stats.avgProfit ? stats.avgProfit.toFixed(2) : 0}</p>
              </div>
              <div className="personalStatP">
                <p>Total Games</p>
                <p>{stats.numOfGames}</p>
              </div>
              <div className="personalStatP">
                <p>Games W/ Profit</p>
                <p>{stats.gamesWithProfit}</p>
              </div>
              <div className="personalStatP">
                <p>Success %</p>
                <p>{stats.successPercentage}%</p>
              </div>
            </div>
            <div className="detailedStatsRow2 d-flex justify-content-between">
              <div className="personalStatP">
                <p>Avg Cashing</p>
                <p>{stats.avgCashing.toFixed(2)}</p>
              </div>
              <div className="personalStatP">
                <p>Max Profit</p>
                <p>{stats.maxProfit}</p>
              </div>
              <div className="personalStatP">
                <p>Max Loss</p>
                <p>{stats.minProfit}</p>
              </div>
              <div className="personalStatP">
                <p>{currentMonth}-Total Profit</p>
                <p>{month ? month.totalProfit : "No games this month"}</p>
              </div>
              <div className="personalStatP">
                <p>H2H Points</p>
                <p>{points.totalPoints}</p>
              </div>
            </div>
            <div className="detailedStats d-flex justify-content-between">
              <div className="personalStatP">
                <p>Avg Game Rank</p>
                <p>{stats.avgGameRank ? stats.avgGameRank.toFixed(2) : 0}</p>
              </div>
              <div className="personalStatP">
                <p>Last Game</p>
                <p>{new Date(stats.lastGame).toLocaleDateString("en-GB")}</p>
              </div>
            </div>
          </div>
          <div className="header">
            <h1 className="title  mt-2">Personal Chart</h1>
          </div>
          <div className="col-lg-4 col-11">
            <Line data={data} options={options} />
          </div>
          <TotalPersonal details={details} />
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
