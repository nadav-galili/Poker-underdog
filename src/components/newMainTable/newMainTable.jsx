import React, { useState, useEffect } from "react";
import _ from "lodash";
import { SpinnerDiamond } from "spinners-react";
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
          <SpinnerDiamond
            size={130}
            thickness={151}
            speed={81}
            color="rgba(108, 20, 180, 1)"
            secondaryColor="rgba(252, 252, 252, 1)"
            enabled={_.isEmpty(totalStats) ? true : false}
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
          <div className="playersImages">
            <div className="row">
              {team.players.map((player) => (
                <div className="playersImage col-2">
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
      <div className="playersCardsNew mt-3">
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
              cardTitle="Top Ten profits"
              stats="topTenProfits"
              data={["profit", "date", "cashInHand", "cashing"]}
              playersData={["P:", "D:", "CIN", "C"]}
              leaderData={["Profit", "Date", "Cash In Hand", "cashing"]}
            />
          </div>
          <div className="col-6 mt-3">
            {/* <SmallCard
              teamId={teamId}
              cardTitle="Head To Head"
              stats="head2head"
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
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMainTable;
