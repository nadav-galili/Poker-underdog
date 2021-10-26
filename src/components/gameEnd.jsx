import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gameService from "../services/gameService";
import PageHeader from "../components/common/pageHeader";
import { apiImage } from "../config.json";
import { SpinnerInfinity } from "spinners-react";

const GameEnd = (props) => {
  const [hero, setHero] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const teamId = props.match.params.teamId;
  const cardName = props.match.params.cardName;

  const [data, setData] = useState([]);
  const [lastGame, setLastGame] = useState([]);
  useEffect(() => {
    const getLastGame = async () => {
      let game = await gameService.lastGame(props.match.params.teamId);
      console.log(game, "gg");
      game = game.data[0];
      setData(game.players);
      setLastGame(game);
    };

    getLastGame();
  }, [setData, props.match.params.teamId]);

  return (
    <div className="container-fluid">
      <PageHeader titleText="Last Game" />
      {/* <p className="text-primary">
        {new Date(lastGame.createdAt).toLocaleDateString("en-GB") +
          "  " +
          new Date(lastGame.createdAt).getHours() +
          ":" +
          new Date(lastGame.createdAt).getMinutes() +
          "-" +
          new Date(lastGame.updatedAt).getHours() +
          ":" +
          new Date(lastGame.updatedAt).getMinutes()}
      </p> */}
      {data.length === 0 && (
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
        <div className="col-lg-3 col-10" id="card-top">
          <ol className="statsList">
            <li
            id="lastGameHero"
              className="statsHero d-flex"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <p>
                {new Date(lastGame.createdAt).toLocaleDateString("en-GB") +
                  "  " +
                  new Date(lastGame.createdAt).getHours() +
                  ":" +
                  new Date(lastGame.createdAt).getMinutes() +
                  "-" +
                  new Date(lastGame.updatedAt).getHours() +
                  ":" +
                  new Date(lastGame.updatedAt).getMinutes()}
              </p>

            
            </li>
            <React.Fragment>
              {data.map((player) => (
                <li className="statsRow" key={player.id}>
                  <div className="rowPos">2</div>
                  <div className="rowImage">
                    <img
                      src={data.length > 0 ? `${apiImage}${player.image}` : ""}
                      alt="player list row"
                    />
                  </div>
                  <div className="rowName">
                    {data.length > 1 ? player.name : ""}
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

export default GameEnd;
