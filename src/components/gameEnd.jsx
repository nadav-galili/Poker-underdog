import React, { useEffect, useState } from "react";
import gameService from "../services/gameService";
import PageHeader from "../components/common/pageHeader";
import H2hGameEnd from "./h2h/h2hGameEnd";
import { apiImage } from "../config.json";
import { SpinnerInfinity } from "spinners-react";
import { Link } from "react-router-dom";

const GameEnd = (props) => {
  const teamId = props.match.params.teamId;
  const [data, setData] = useState([]);
  const [lastGame, setLastGame] = useState([]);
  useEffect(() => {
    const getLastGame = async () => {
      let game = await gameService.lastGame(props.match.params.teamId);
      game = game.data[0];
      game.players.sort((a, b) => b.profit - a.profit);
      setData(game.players);
      setLastGame(game);
    };

    getLastGame();
  }, [setData, props.match.params.teamId]);
  let Rank = 1;

  return (
    <div className="container">
      <PageHeader titleText="Last Game" />

      {data.length === 0 && lastGame._id && (
        <div className="spinner pt-2">
          <SpinnerInfinity
            size={130}
            thickness={151}
            speed={70}
            color="rgba(252, 252, 252, 1)"
            secondaryColor="rgba(108, 20, 180, 1)"
            enabled={data.length === 0 ? true : false}
          />
        </div>
      )}
      {data.length > 0 && (
        <div className="col-lg-4 col-10" id="card-top">
          <ol className="statsList">
            <li
              id="lastGameHero"
              className="statsHero d-flex flex-column"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <p>
                {new Date(lastGame.createdAt).toLocaleDateString("en-GB") +
                  "  " +
                  new Date(lastGame.createdAt).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }) +
                  " - " +
                  new Date(lastGame.updatedAt).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
              </p>
              <div
                className="stats d-flex w-100 justify-content-between"
                id="lGame"
              >
                <p>Player</p>
                <p>Name</p>
                <p>Cashing</p>
                <p>Profit</p>
              </div>
            </li>
            <React.Fragment>
              {data.map((player) => (
                <li className="statsRow" key={player.id}>
                  <div className="rowPosLast">{Rank++}.</div>
                  <div className="rowImage">
                    <img
                      src={data.length > 0 ? `${apiImage}${player.image}` : ""}
                      alt="player list row"
                    />
                  </div>
                  <div className="rowName" id="lGameName">
                    {data.length > 1 ? player.name : ""}
                  </div>
                  <div className="rowCashing">
                    {data.length > 1 ? player.cashing : ""}
                  </div>
                  <div
                    className={
                      player.profit > 0
                        ? "rowProfit text-success"
                        : "rowProfit text-danger"
                    }
                  >
                    {player.profit}
                  </div>
                </li>
              ))}
            </React.Fragment>
          </ol>
          <H2hGameEnd gameId={lastGame._id} header="Head 2 Head" />
          <Link className="btn btn-primary mb-3" to={`/main-table/${teamId}`}>
            Team Tables & Statistics
            <i className="ps-2 fas fa-angle-double-right"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GameEnd;
