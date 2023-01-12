import React, { useState, useEffect } from "react";
import _ from "lodash";
import { SpinnerDotted } from "spinners-react";
import teamService from "../../services/teamService";
import gameServices from "../../services/gameService";
import { apiImage } from "../../config.json";

import BigCard from "./bigCard";
import PageHeader from "../common/pageHeader";
import PlayersImages from "./playersImages";
import SmallCard from "./smallCard";
import TotalStatsForTeam from "./totalStatsForTeam";

const NewMainTable = (props) => {
  const teamId = props.match.params.teamId;
  const [team, setTeam] = useState({});
  const [totalStats, setTotalStats] = useState({});

  useEffect(() => {
    async function getTeam() {
      const { data: team } = await teamService.newGetTeam(teamId);
      setTeam(team);
    }
    getTeam();
    async function getTotalStatsForTeam() {
      const { data: totalStats } = await gameServices.getTotalStatsForTeam(
        teamId
      );
      setTotalStats(totalStats);
      console.log("totalStats", totalStats);
    }
    getTotalStatsForTeam();
  }, []);

  return (
    <div className="container">
      <PageHeader
        className="mb-0"
        titleText={new Date().getFullYear() + " Top Stats"}
      />
      {_.isEmpty(totalStats) && (
        <div className="spinner mt-5">
          <SpinnerDotted
            size={50}
            thickness={100}
            speed={100}
            color="rgba(0, 157, 255, 1)"
          />
        </div>
      )}
      {!_.isEmpty(team) && (
        <div className="teamDetails">
          <div className="logoContainer d-flex justify-content-center ">
            <div className="teamLogo">
              <img src={`${apiImage}${team.teamImage}`} alt="" />
            </div>
          </div>
          <p className="text-center mt-2" id="teamName">
            {team.name}
          </p>
          <div className="playersImages my-2">
            <div className="row">
              {team.players.map((player) => (
                <div className="col-2 playersImagesRounded d-flex justify-content-center">
                  <PlayersImages key={player._id} player={player} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* <span className="text-center">Season:2023</span> */}
      {!_.isEmpty(totalStats) && (
        <>
          <TotalStatsForTeam totalStats={totalStats} />
          <div className="odds text-center">
            <a
              href="https://www.cardschat.com/poker/tools/poker-odds-calculator/"
              target="_blank"
            >
              Texas Odds Calculator
            </a>
          </div>
        </>
      )}
      <div className="playersCardsNew mt-3 pb-3">
        <div className="row mx-2">
          <BigCard
            teamId={teamId}
            cardTitle="Total Profit"
            stats="profitsStats"
            data={[
              "totalProfit",
              "totalGames",
              "gamesWithPlus",
              "avgProfit",
              "avgCashing",
            ]}
            playersData={["Total Profit", "TG", "GIP", "AP", "AC"]}
            leaderData={[
              "Profit",
              "Total Games",
              "Games In Plus",
              "Average Profit",
              "Average Cashing",
            ]}
          />
          <div className="col-6 my-3">
            <SmallCard
              teamId={teamId}
              cardTitle="Top Ten Profits"
              stats="topTenProfits"
              data={["profit", "date", "cashInHand", "cashing"]}
              playersData={["P:", "D:", "CIN", "C"]}
              leaderData={["Profit", "Date", "Cash In Hand", "Cashing"]}
            />
          </div>
          <div className="col-6 mt-3">
            <SmallCard
              teamId={teamId}
              cardTitle="Head To Head"
              stats="head2head"
              data={[
                "totalPoints",
                "totalGames",
                "avgPoints",
                "successPercentage",
              ]}
              playersData={["Points: ", "AP: ", "", ""]}
              leaderData={[
                "Total Points",
                "Total Games",
                "Avg Points",
                "Success Percentage",
              ]}
            />
          </div>
          <BigCard
            teamId={teamId}
            cardTitle="Hourly Stats"
            stats="getHourlyStats"
            data={[
              "profitPerHour",
              "cashingPerHour",
              "hoursPlayed",
              "totalGames",
              "avgHourPerGame",
            ]}
            playersData={["Profit/Hour", "CPH", "HP", "TG", "AHPG"]}
            leaderData={[
              "Profit Per Hour",
              "Cashing Per Hour",
              "Hours Played",
              "Total Games",
              "Average Hour Per Game",
            ]}
          />
          <div className="col-6 mt-3">
            <SmallCard
              teamId={teamId}
              cardTitle="Stats By Months"
              stats="getStatsByMonth"
              data={[
                "totalProfit",
                "roundedAvgProfit",
                "numOfGames",
                "roundedAvgCashing",
              ]}
              playersData={["Profit: ", "AP: ", "", ""]}
              leaderData={[
                "Total Porfit",
                "Avg Profit",
                "Total Games",
                "Avg Cashing",
              ]}
              extraHeader={new Date().toLocaleString("default", {
                month: "long",
              })}
            />
          </div>
          <div className="col-6 mt-3">
            <SmallCard
              teamId={teamId}
              cardTitle="Top Ten Comebacks"
              stats="getTopComebacks"
              data={["cashing", "profit", "date", "cashInHand"]}
              playersData={["Cashing: ", "P: ", "", ""]}
              leaderData={["Cashing", "Profit", "Date", "CashinHand"]}
            />
          </div>
          <div className="col-6 mt-3">
            <SmallCard
              teamId={teamId}
              cardTitle="Winning Streak"
              stats="getWiningStreak"
              data={[
                "maxWinStreak",
                "currWinStreak",
                "successPercentage",
                "won",
              ]}
              playersData={["MWS: ", "CWS: ", "", ""]}
              leaderData={[
                "Max Win Streak",
                "Current Win Streak",
                "% Success",
                "Total Games In Plus",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMainTable;
