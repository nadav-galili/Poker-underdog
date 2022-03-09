import React, { useState, useEffect } from "react";
import PageHeader from "../common/pageHeader";
import h2hService from "../../services/h2hService";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";

const H2hGame = ({ gameId }) => {
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState({});

  useEffect(() => {
    const h2h = async () => {
      try {
        let playersInGame = await h2hService.getByGameId(gameId);
        playersInGame = await playersInGame.data[0].players;
        setPlayers(playersInGame);
      } catch (error) {
        console.log("error");
      }
    };
    h2h();
  }, []);

  useEffect(() => {
    const game = async () => {
      try {
        let gameForH2h = await gameService.gameById(gameId);
        setGame(gameForH2h.data);
      } catch (error) {
        console.log("Error");
      }
    };
    game();
  }, []);

  return (
    <div className="pb-1">
      <PageHeader titleText="Head 2 Head" />
      <div className="col-lg-8 col-12" id="cardTop">
        <ol className="statsList ">
          <li
            id="gameLi"
            className="statsHero d-flex"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
              })`,
            }}
          >
            <div className="gameH2h d-flex w-100 justify-content-evenly">
              <div className="player1">Player 1</div>
              <div className="player2">Player 2</div>
            </div>
          </li>
          {players.length > 0 &&
            players.map((p) => (
              <div
                className="statsRow w-100 justify-content-evenly"
                key={p[0].id}
              >
                <div className="rowPlayer newGame">
                  <img src={`${apiImage}${p[0].image}`} alt="" />
                </div>
                <p className="d-flex align-items-center">
                  <strong>Vs</strong>
                </p>
                <div className="rowPlayer newGame">
                  <img src={`${apiImage}${p[1].image}`} alt="" />
                </div>
              </div>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default H2hGame;
