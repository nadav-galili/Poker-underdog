import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import h2hService from "../../services/h2hService";
import PageHeader from "../common/pageHeader";
import { SpinnerInfinity } from "spinners-react";
import { apiImage } from "../../config.json";
import H2hGame from "../h2h/h2hGame";

const NewGame = (props) => {
  const [data, setData] = useState({});

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
    let game = { ...data };
    game.gameId = props.match.params.gameId;
    delete game._id;
    delete game.__v;
    setData(game);
    gameService.updateGame(game.gameId, game).then((res) => {});
  };

  const undoCashing = (playerId) => {
    let player = data.players.find((e) => playerId === e.id);
  if(player.cashing>0){
    player.cashing -= 50;
    player.numOfCashing -= 1;
    let game = { ...data };
    game.gameId = props.match.params.gameId;
    delete game._id;
    delete game.__v;
    setData(game);
    gameService.updateGame(game.gameId, game);
  }
  };

  const handleChange = (playerId, e) => {
    let play = { ...data };
    let player = play.players.find((e) => playerId === e.id);
    player.cashInHand = e.target.value;
    player.profit = player.cashInHand - player.cashing;
    let game = play;
    setData(game);
  };

  const updateGame = () => {
    let game = { ...data };
    game.gameId = props.match.params.gameId;
    delete game._id;
    game.isOpen = false;
    game.players.sort((a, b) => b.profit - a.profit);

    let gameRank = 1;
    game.players.map((p) => (p.gameRank = gameRank++));
    setData(game);
    gameService.updateGame(game.gameId, game).then((res) => {
      h2hService.updateH2h(game.gameId);
      setData(res.data);
    });
    props.history.replace(`/last-game/${data.team_id}`);
  };
  return (
    <div className="container ">
      <PageHeader titleText="Game No." />
      <p className="text-danger">{data._id}</p>
      <p className="text-primary">
        Started At:{" "}
        {new Date(data.createdAt).toLocaleDateString("en-GB") +
          " " +
          new Date(data.createdAt).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
      </p>
      {/* <div class="alert alert-primary alert-dismissible fade show" role="alert">
        player x cashed in
      </div> */}

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
        <div className="col-lg-8 col-12" id="newGameTop">
          <ol className="statsList">
            <li
              id="gameLi"
              className="statsHero d-flex"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <div className="gameHeaders d-flex justify-content-evenly">
                <div className="P1">Player</div>
                <div className="add1">Add 50</div>
                <div className="Cashing1">Cashing</div>
                <div className="Hand1">Cash In Hand</div>
                <div className="Profit1">Profit</div>
                <div className="">Cancel </div>
              </div>
            </li>
            <React.Fragment>
              {data.players.map((player) => (
                <li
                  className="statsRows w-100 d-flex justify-content-evenly"
                  key={player.id}
                >
                  <div className="rowPlayer">
                    <img src={`${apiImage}${player.image}`} alt="player" />
                  </div>
                  <i
                    className="fas fa-money-bill-wave"
                    onClick={() => addCashing(player.id)}
                  >
                    Add 50$
                  </i>

                  <div className="rowCash">{player.cashing}</div>
                  <div className="rowCashInHand">
                    <input
                      type="number"
                      className="cashInHand"
                      onChange={(e) => handleChange(player.id, e)}
                    />
                  </div>
                  <div className="playerProfit ">{player.profit}</div>
                  <i
                    className="fas fa-minus-circle"
                    onClick={() => undoCashing(player.id)}
                  >
                    Cancel
                  </i>
                </li>
              ))}
            </React.Fragment>
            <li className="statsRows w-100 d-flex justify-content-evenly">
              <div className="rowPlayer text-primary"></div>
              <div className="fas fa-money-bill-wave text-primary">Total</div>
              <div className="rowCash text-primary">
                {data.players.reduce((a, b) => {
                  return a + b.cashing;
                }, 0)}
              </div>
            <div className="rowCashInHand"></div>
              <div className="playerProfit text-primary">
                {data.players.reduce((a, b) => {
                  return a + b.profit;
                }, 0)}
              </div>
              <div className="fas fa-minus-circle text-primary">Cancel</div>
            </li>
            <div
        onClick={() => {
          updateGame();
        }}
        className="buttonsGame d-flex justify-content-between"
      >
        <div className="btn btn-primary update m-2">Update Game</div>
        <div className="btn btn-danger update m-2">Reset Game</div>
      </div>
          </ol>
         
        </div>
      )}
    
      <H2hGame gameId={data._id} />
    </div>
  );
};

export default NewGame;
