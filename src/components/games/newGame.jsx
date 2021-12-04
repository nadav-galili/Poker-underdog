import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import h2hService from "../../services/h2hService";
import PageHeader from "../common/pageHeader";
import { SpinnerInfinity } from "spinners-react";
import { apiImage } from "../../config.json";
import H2hGame from "../h2h/h2hGame";
import Swal from "sweetalert2";

const NewGame = (props) => {
  const [data, setData] = useState({});
  const [alert, setAlert] = useState("visually-hidden");
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const players = async () => {
      let playersInGame = await gameService.gameById(props.match.params.gameId);
      setData(playersInGame.data);
    };

    players();
  }, [props.match.params.gameId]);

  const addCashing = (playerId) => {
    Swal.fire({
      title: "sure you want to cash in?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        let player = data.players.find((e) => playerId === e.id);
        player.cashing += 50;
        player.numOfCashing += 1;
        let game = { ...data };
        game.gameId = props.match.params.gameId;
        delete game._id;
        delete game.__v;
        setData(game);
        gameService.updateGame(game.gameId, game).then((res) => {});
        const chips = new Audio(process.env.PUBLIC_URL + `sounds/chips.mp3`);
        chips.play();
        setAlert("");
        setPlayerName(player.name);
        Swal.fire(`Added cashing to ${player.name}`);
      }
    });
  };

  const undoCashing = (playerId) => {
    let player = data.players.find((e) => playerId === e.id);
    if (player.cashing > 0) {
      player.cashing -= 50;
      player.numOfCashing -= 1;
      let game = { ...data };
      game.gameId = props.match.params.gameId;
      delete game._id;
      delete game.__v;
      setData(game);
      const cancel = new Audio(process.env.PUBLIC_URL + `sounds/cancel.mp3`);
      cancel.play();
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
    Swal.fire({
      title: "sure you want to end game?",
      text: "you won't be able to cancel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
  };
  console.log(data,"44");
  return (
    <div className="container ">
      <PageHeader titleText="Game No." />
      <p className="text-danger">{data._id}</p>
      <p className="text-primary">
        Started At:{" "}
        {`${new Date(data.createdAt).toLocaleDateString("en-GB")}
        ${new Date(data.createdAt).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}`}
      </p>
      <div
        className={`alert alert-success ${alert} fade show w-75 py-1`}
        role="alert"
      >
        {playerName} cashed in{" "}
        {`${new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}`}
      </div>
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
