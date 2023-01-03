import React, { useEffect, useState } from "react";
import h2hService from "../../services/h2hService";
import teamService from "../../services/teamService";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";
import H2hGameCard from "./h2hGameCard";

const H2hTable = (props) => {
  const [data, setData] = useState();
  const [hero, setHero] = useState();
  const [teamImg, setTeamImg] = useState("");

  const teamId = props.match.params.teamId;
  useEffect(() => {
    const getTable = async () => {
      let table = await h2hService.getPointsByTeam(teamId);
      table = table.data.filter((player) => player._id.name !== "Nispach");

      setData(table);
      let myHero = table.shift();
      setHero(myHero);

      let teamPic = await teamService.getTeam(teamId);
      setTeamImg(teamPic.data);
    };

    getTable();
  }, [setData, teamId]);

  let rank = 2;
  return (
    <div className="container">
      <PageHeader titleText="H2H Table" />
      <div className="teamImg d-flex flex-row mb-2">
        <img src={`${apiImage}${teamImg.teamImage}`} alt="" />
        <span>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
      {!data && (
        <SpinnerInfinity
          size={130}
          thickness={151}
          speed={70}
          color="rgba(252, 252, 252, 1)"
          secondaryColor="rgba(108, 20, 180, 1)"
          enabled={!data ? true : false}
          // enabled={true}
        />
      )}
      {data && (
        <div className="col-lg-4 col-12" id="cardTop">
          <ul className="statsList">
            <li
              className="statsHeroPerHour d-flex w-100 "
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <div className="h2hInfo d-flex w-100 justify-content-between">
                <div className="statsInfo">
                  <div className="pos">1.</div>
                  <a href="#/" id="heroName">
                    {hero ? hero._id.name : ""}
                  </a>
                  <div className="heroDate ps-1">
                    Average Points:
                    <span className="ms-2 avgP">
                      {hero ? hero.avgPoints.toFixed(2) : ""}
                    </span>
                  </div>
                  <div className="heroDate ps-1">
                    Games Played:
                    <span className="ms-2 avgP">
                      {hero ? hero.numOfGames : ""}
                    </span>
                  </div>
                  <div className="heroDate ps-1">
                    Winning:
                    <span className="ms-2 avgP">
                      {hero ? hero.successPercentage : ""}%
                    </span>
                  </div>
                  <div id="amount" className="">
                    Total Points:
                    <span className="ms-2">{hero ? hero.totalPoints : ""}</span>
                  </div>
                </div>
                <div className="heroImage ">
                  <img
                    src={hero ? `${apiImage}${hero._id.image}` : ""}
                    alt="hero"
                  />
                </div>
              </div>
            </li>
            <li id="h2hLi">
              <div className="h2hDetailsRow  d-flex ">
                <p>Rank</p>
                <p>Image</p>
                <p>Player</p>
                <p>Avg Points</p>
                <p>Games played</p>
                <p>Winning</p>
                <p>Points</p>
              </div>
            </li>
            <React.Fragment>
              {data.map((player) => (
                <li className="statsRow d-flex" key={player._id.name}>
                  <div className="rowPosTop" id="rowPosTop">
                    {rank++}.
                  </div>
                  <div className="rowImageH2h">
                    <img
                      src={`${apiImage}${player._id.image}`}
                      alt="player list row"
                    />
                  </div>
                  <div className="rowNameH2h">{player._id.name}</div>
                  <div className="rowH2hAvg">{player.avgPoints.toFixed(2)}</div>
                  <div className="rowH2hG">{player.numOfGames}</div>
                  <div className="rowSuccessTop">
                    {player.successPercentage}%
                  </div>
                  <div className="rowPointsTop">{player.totalPoints}</div>
                </li>
              ))}
            </React.Fragment>
          </ul>
        </div>
      )}
      <H2hGameCard team={teamId} />
    </div>
  );
};

export default H2hTable;
