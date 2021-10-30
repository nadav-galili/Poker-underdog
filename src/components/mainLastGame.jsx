import React, { useEffect, useState } from "react";
import gameService from "../services/gameService";
import PageHeader from "../components/common/pageHeader";
import { apiImage } from "../config.json";
import { SpinnerInfinity } from "spinners-react";

const MainLastgame = ({ teamId }) => {
  const [data, setData] = useState([]);
  const [lastGame, setLastGame] = useState([]);
  useEffect(() => {
    const getLastGame = async () => {
      let game = await gameService.lastGame(teamId);
      game = game.data[0];
      let last = game.players.sort((a, b) => b.profit - a.profit);
      setData(last);
      setLastGame(game);
    };

    getLastGame();
  }, [teamId]);

  let Rank = 1;
  return (
    <div className="container-fluid">
      <PageHeader titleText="Last Game" />

      {!data && (
        <div className="spinner pt-2">
          <SpinnerInfinity
            size={130}
            thickness={151}
            speed={70}
            color="rgba(252, 252, 252, 1)"
            secondaryColor="rgba(108, 20, 180, 1)"
            enabled={!data ? true : false}
          />
        </div>
      )}
      {data && (
        <div className="col-lg-3 col-10 pb-3" id="card-top">
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
              <div className="stats d-flex w-100 justify-content-between" id="lGame">
                  <p>Player</p>
                  <p>Name</p>
                  <p>Cashing</p>
                  <p>Profit</p>
                </div>
            </li>
            <React.Fragment>
              {data.map((player) => (
                <li className="statsRow" key={player.id}>
                  <div className="rowPos">{Rank++}</div>
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
        </div>
      )}
    </div>
  );
};

export default MainLastgame;
