import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import PageHeader from "../common/pageHeader";
import { SpinnerInfinity } from "spinners-react";
import { apiImage, apiUrl } from "../../config.json";

const NewGame = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const players = async () => {
      let playersInGame = await gameService.gameById(props.match.params.gameId);
      setData(playersInGame.data);
    };

    players();
  }, [props.match.params.gameId]);

  const addCashing = (playerId) => {
    let player = data.players.find((e) => playerId === e.id);
    player.cashing += 50;
    player.numOfCashing += 1;
    data.gameId = props.match.params.gameId;
    gameService.updateGame(data._id, data).then((res) => {
      setData(res.data);
    });
  };

  const undoCashing = (playerId) => {
    let player = data.players.find((e) => playerId === e.id);
    if (player.cashing > 0) player.cashing -= 50;
    if (player.numOfCashing > 0) player.numOfCashing -= 1;
    data.gameId = props.match.params.gameId;

    gameService.updateGame(data._id, data).then((res) => {
      setData(res.data);
    });
  };

  const handleChange = (playerId, e) => {
    let player = data.players.find((e) => playerId === e.id);
    player.cashInHand = e.target.value;
    player.profit = player.cashInHand - player.cashing;
    let game = data;
    setData(game);
  };

  const updateGame = () => {
    data.gameId = props.match.params.gameId;
    delete data._id;
    gameService.updateGame(data.gameId, data).then((res) => {
      setData(res.data);
    });
  };
  return (
    <div className="container-fluid">
      <h1>sssdsd</h1>
      {/* <PageHeader titletext="New Game" /> */}
      {data.length < 1 && (
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

      {data.players && (
        <div className="col-lg-3 col-10" id="cardTop">
          <ol className="statsList">
            <li
              className="statsHero d-flex"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            ></li>
            <React.Fragment>
              {data.players.map((player) => (
                <li className="statsRow" key={player.id}>
                  <div className="rowPlayer">
                    <img src={`${apiImage}${player.image}`} alt="" />
                  </div>
                  <i
                    className="fas fa-money-bill-wave"
                    onClick={() => addCashing(player.id)}
                  >
                    Add 50$
                  </i>
                  <div className="rowCash flex-fill">{player.cashing}</div>
                  <div className="rowCashInHand">
                    <input
                      type="number"
                      className="cashInHand"
                      onChange={(e) => handleChange(player.id, e)}
                    />
                  </div>
                  <div className="playerProfit flex-fill">{player.profit}</div>
                  <i
                    className="fas fa-minus-circle"
                    onClick={() => undoCashing(player.id)}
                  >
                    Cancel
                  </i>
                </li>
              ))}
            </React.Fragment>
          </ol>
        </div>
      )}
      <div
        onClick={() => {
          updateGame();
        }}
        className="buttonsGame d-flex justify-content-between col-lg-3 col-10"
      >
        <div className="btn btn-primary update">Update Game</div>
        <div className="btn btn-danger update">Reset Game</div>
      </div>
    </div>
  );
};

export default NewGame;
