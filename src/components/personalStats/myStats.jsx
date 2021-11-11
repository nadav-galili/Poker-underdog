import React, { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/userService";
import gameService from "../../services/gameService";
import h2hService from "../../services/h2hService";
import PageHeader from "../common/pageHeader";
import { SpinnerCircular } from "spinners-react";
import { apiImage } from "../../config.json";
import _ from "lodash";

const MyStats = () => {
  const [me, setMe] = useState({});
  const [stats, setStats] = useState({});
  const [month, setMonth] = useState([]);
  const [points, setPoints] = useState([]);
  let currentMonth = new Date();
  let currentMonthNumber = currentMonth.getMonth() + 1;
  currentMonth = currentMonth.toLocaleString("en-US", { month: "long" });

  useEffect(() => {
    const getTable = async () => {
     
      if (me.teams) {
        
        let table = await gameService.monthsData(me.teams[0]);
        console.log(table,"sd");
        table = table.data;
       
        table = table.filter(
          (month) => month._id.monthPlayed === currentMonthNumber
        );
        
        table = table.find((e) => e._id.player_id === me._id);
        setMonth(table);
      }
    };

    getTable();
  }, [setMonth, currentMonthNumber, me.teams, me._id]);

  useEffect(() => {
    const getMydata = async () => {
      let myData = await userService.getUserDetails();
      delete myData.data.password;
      setMe(myData.data);
      let myStats = await gameService.personal(me._id);
      setStats(myStats.data[0]);
    };
    getMydata();
  }, [setMe, me._id]);

  useEffect(() => {
    const points = async () => {
      if (me._id) {
        let myPoints = await h2hService.getPointsByPlayer(me._id);
        setPoints(myPoints.data[0]);
      }
    };
    points();
  }, [me._id]);

  console.log(month);

  return (
    <div className="container playerStats">
      <PageHeader titleText="Player Statistics" />
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
      {!_.isEmpty(stats) && (
        <div className="playerInfo bg-white col-11 col-lg-4">
          <span className="text-primary ms-3">
            {new Date().toLocaleDateString("en-GB")}
          </span>
          <div
            className="playerBg d-flex justify-content-around bg-primary"
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
              <p>{me.nickName}</p>
            </div>
            <div className="pImage">
              <img src={`${apiImage}${me.image}`} alt="" />
            </div>
          </div>
          <div className="detailedStats d-flex justify-content-between mt-3">
            <div className="personalStat">
              <p>Total Profit</p>
              <p>{stats.totalProfit}</p>
            </div>
            <div className="personalStat">
              <p>Avg Profit</p>
              <p>{stats.avgProfit.toFixed(2)}</p>
            </div>
            <div className="personalStat">
              <p>Total Games</p>
              <p>{stats.numOfGames}</p>
            </div>
            <div className="personalStat">
              <p>Games W/ Profit</p>
              <p>{stats.gamesWithProfit}</p>
            </div>
            <div className="personalStat">
              <p>Success %</p>
              <p>{stats.successPercentage}%</p>
            </div>
          </div>
          <div className="detailedStatsRow2 d-flex justify-content-between">
            <div className="personalStat">
              <p>Avg Cashing</p>
              <p>{stats.avgCashing.toFixed(2)}</p>
            </div>
            <div className="personalStat">
              <p>Max Profit</p>
              <p>{stats.maxProfit}</p>
            </div>
            <div className="personalStat">
              <p>Max Loss</p>
              <p>{stats.minProfit}</p>
            </div>
            <div className="personalStat">
              <p>Month-{currentMonth}</p>
              {/* <p>{month.totalProfit}</p> */}
            </div>
            <div className="personalStat">
              <p>H2H Points</p>
              <p>{points.totalPoints}</p>
            </div>
          </div>
          <div className="detailedStats d-flex justify-content-between">
            <div className="personalStat">
              <p>Avg Game Rank</p>
              <p>{stats.avgGameRank.toFixed(2)}</p>
            </div>
            <div className="personalStat">
              <p>Last Game</p>
              <p>{new Date(stats.lastGame).toLocaleDateString("en-GB")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStats;
