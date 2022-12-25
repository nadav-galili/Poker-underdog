import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import h2hService from "../../services/h2hService";
import userService from "../../services/userService";
import PageHeader from "../common/pageHeader";
import { SpinnerInfinity } from "spinners-react";
import { apiImage } from "../../config.json";
import H2hGame from "../h2h/h2hGame";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CashingDetails from "./cashingDetails";
import { Link } from "react-router-dom";

const NewGame = (props) => {
  const [data, setData] = useState({});
  const [id, setId] = useState("");
  const [me, setMe] = useState({});
  const [manager, setManager] = useState("");
  console.log(data, "data");

  useEffect(() => {
    const ac = new AbortController();
    const players = async () => {
      const getGameManager = await userService.getUserDetails();
      me.id = getGameManager.data._id;
      me.name = getGameManager.data.nickName;
      setMe(me);

      try {
        let playersInGame = await gameService.gameById(
          props.match.params.gameId
        );
        setData(playersInGame.data);
        setId(playersInGame.data._id);
        return () => ac.abort(); // Abort both fetches on unmount
      } catch (e) {
        console.log(e, "EE");
      }
    };

    players();
  }, []);

  useEffect(() => {
    const manager = data.game_manager;
    setManager(manager);
  }, [data.game_manager]);

  const addCashing = (playerId, playerName, playerImage) => {
    Swal.fire({
      title: `Add Cashing to ${playerName}?`,
      imageUrl: `${apiImage}${playerImage}`,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Custom image",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#00a9ff",
      denyButtonColor: "#08e046",
      confirmButtonText: "50",
      denyButtonText: `100`,
    }).then((result) => {
      if (result.isConfirmed) {
        let game = { ...data };
        game.gameId = props.match.params.gameId;
        if (game.gameId) {
          game.isOpen = true;
          let player = data.players.find((e) => playerId === e.id);
          player.cashing += 50;
          player.numOfCashing += 1;
          delete game._id;
          delete game.__v;
          let cashingDetails = {
            playerId: player.id,
            playerName: player.name,
            playerCashing: 50,
            time: new Date(),
          };
          if (game.cashing_details) {
            game.cashing_details.push(cashingDetails);
          } else {
            game.cashing_details = [];
            game.cashing_details.push(cashingDetails);
          }
          setData(game);

          gameService.updateGame(game.gameId, game);
          const chips = new Audio(process.env.PUBLIC_URL + `sounds/chips.mp3`);
          chips.play();
          toast.success(`💸 💸Added 50 to ${player.name}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (result.isDenied) {
        let game = { ...data };
        game.gameId = props.match.params.gameId;
        if (game.gameId) {
          game.isOpen = true;
          let player = data.players.find((e) => playerId === e.id);
          player.cashing += 100;
          player.numOfCashing += 2;
          delete game._id;
          delete game.__v;
          let cashingDetails = {
            playerId: player.id,
            playerName: player.name,
            playerCashing: 100,
            time: new Date(),
          };
          if (game.cashing_details) {
            game.cashing_details.push(cashingDetails);
          } else {
            game.cashing_details = [];
            game.cashing_details.push(cashingDetails);
          }
          setData(game);

          gameService.updateGame(game.gameId, game);
          const chips = new Audio(process.env.PUBLIC_URL + `sounds/chips.mp3`);
          chips.play();
          toast.success(`💸 💸Added 100 to ${player.name}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    });
  };

  const undoCashing = (playerId) => {
    let player = data.players.find((e) => playerId === e.id);
    if (player.cashing > 0) {
      let game = { ...data };
      game.gameId = props.match.params.gameId;
      delete game._id;
      delete game.__v;
      //remove the player's cashing from cashing details
      const indexOfLastPlayerCashing = game.cashing_details
        .map((el) => el.playerId)
        .lastIndexOf(playerId);

      const playersLastCashing =
        game.cashing_details[indexOfLastPlayerCashing].playerCashing;

      game.cashing_details.splice(indexOfLastPlayerCashing, 1);

      player.cashing -= playersLastCashing;
      player.numOfCashing -= 1;
      setData(game);
      const cancel = new Audio(process.env.PUBLIC_URL + `sounds/cancel.mp3`);
      cancel.play();
      gameService.updateGame(game.gameId, game);
    }
  };

  const handleChange = (playerId, e) => {
    let play = { ...data };
    let player = play.players.find((e) => playerId === e.id);
    player.cashedOut = true;

    e.target.value
      ? (player.cashInHand = parseInt(e.target.value))
      : (player.cashInHand = 0);
    player.profit = player.cashInHand - player.cashing;
    let game = play;
    setData(game);
  };

  const cashOutPlayer = (playerId) => {
    let player = data.players.find((e) => playerId === e.id);
    player.finishedGame = true;
    player.cashOutTime = new Date();
    let game = { ...data };
    game.gameId = props.match.params.gameId;
    delete game._id;
    delete game.__v;
    delete game.playerCashedOut;
    gameService.updateGame(game.gameId, game);
    game.playerCashedOut = true;
    setData(game);

    /// ! add cashing details
  };

  const editCashing = (playerId) => {
    let player = data.players.find((e) => {
      return playerId === e.id;
    });
    player.finishedGame = false;
    player.edit = true;
    let game = { ...data };
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
        delete game.playerCashedOut;
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

  const takeControl = async () => {
    Swal.fire({
      title: "Take control of game?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setManager(me);
        if (manager)
          toast.success(`🤟 ${me.name} is now manager`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
    });
    await gameService.updateManager(id, me);
  };

  if (!id) {
    return <div className="text-primary">No Games</div>;
  } else {
    return (
      <div className="container">
        <PageHeader titleText="Game No." />
        <p className="text-danger">{id}</p>
        <p className="text-primary">
          Started At:{" "}
          {`${new Date(data.createdAt).toLocaleDateString("en-GB")}
        ${new Date(data.createdAt).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}`}
        </p>
        <p className="m-0 mb-1 p-0 text-primary">
          Game Manager:<span>{manager ? manager.name : ""}</span>
        </p>
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

        {data.players && manager.id === me.id && (
          <div className="col-lg-8 col-12" id="newGameTop">
            <Link
              className="button-72 mb-2 px-"
              to={`/new-game/${data.team_id}`}
            >
              Add/Remove Players
            </Link>
            <div
              className="alert alert-primary alert-dismissible "
              role="alert"
            >
              <span
                type="button"
                className="close"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true" className="text-black">
                  &times;
                </span>
              </span>
              <strong>New Updates 21/12/22:</strong>
              <span className="text-primary">
                <ol>
                  <li>added option to cash in 100 or 50</li>
                  <li>
                    added option to cash out single player while game is on
                  </li>
                </ol>
              </span>
            </div>
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
                  <div className="add1">Add Cash</div>
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
                    <div className="rowPlayer newGame">
                      <img src={`${apiImage}${player.image}`} alt="player" />
                      <p className="playerNameOnGame m-0 text-primary">
                        {player.name}
                      </p>
                    </div>
                    {!player.finishedGame ? (
                      <i
                        className="fas fa-money-bill-wave"
                        onClick={() =>
                          addCashing(player.id, player.name, player.image)
                        }
                      >
                        $$$
                      </i>
                    ) : (
                      <p className="text-danger playerProfit">Out</p>
                    )}

                    <div className="rowCash">{player.cashing}</div>
                    <div className="rowCashInHand">
                      {player.finishedGame ? (
                        <p className="text-primary m-0 text-center">
                          {player.cashInHand}
                        </p>
                      ) : (
                        <input
                          type="number"
                          className="cashInHand"
                          onChange={(e) => handleChange(player.id, e)}
                          value={
                            player.cashInHand
                              ? player.cashInHand
                              : !player.cashInHand && player.cashedOut
                              ? 0
                              : ""
                          }
                        />
                      )}
                    </div>
                    <div className="playerProfit ">
                      {player.profit ? player.profit : 0}
                    </div>
                    {player.cashedOut && !player.finishedGame && (
                      <i
                        className="fa-solid fa-floppy-disk text-primary"
                        onClick={(e) => cashOutPlayer(player.id)}
                      >
                        Save
                      </i>
                    )}
                    {!player.cashedOut && !player.finishedGame && (
                      <i
                        className="fas fa-minus-circle"
                        onClick={() => undoCashing(player.id)}
                      >
                        Cancel
                      </i>
                    )}
                    {player.cashedOut && player.finishedGame && (
                      <i
                        className="fa-solid fa-pen-to-square text-success"
                        onClick={() => editCashing(player.id)}
                      >
                        Edit
                      </i>
                    )}
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
                <div className="rowCashInHand text-center">
                  {" "}
                  {data.players.reduce((a, b) => {
                    return a + b.cashInHand;
                  }, 0)}
                </div>
                <div className="playerProfit text-primary">
                  {data.players.reduce((a, b) => {
                    return a + b.profit;
                  }, 0)}
                </div>
                <div className="fas fa-minus-circle text-white">Cancel</div>
              </li>
              {data.playerCashedOut && (
                <li className="statsRows w-100 d-flex justify-content-evenly">
                  <div className="cashedOutPlayers">
                    After Cashed Out Players
                  </div>
                  <div className="rowCash text-primary">
                    {data.players.reduce((a, b) => {
                      return a + b.cashing - b.cashInHand;
                    }, 0)}
                  </div>
                  <div className="rowCashInHand"></div>
                  <div className="playerProfit text-primary"></div>
                  <div className="fas fa-minus-circle text-white">Cancel</div>
                </li>
              )}

              <div className="buttonsGame d-flex justify-content-between">
                <div
                  className="btn btn-primary update m-2"
                  onClick={() => {
                    updateGame();
                  }}
                >
                  Update Game
                </div>
                <div className="btn btn-danger update m-2">Reset Game</div>
              </div>
            </ol>
          </div>
        )}
        {data.players && manager.id !== me.id && (
          <button
            className="button-72"
            onClick={() => {
              takeControl();
            }}
          >
            Take control of game
          </button>
        )}

        <H2hGame gameId={data._id} className="mb-2" />
        <CashingDetails gameId={id} updated={data} />
      </div>
    );
  }
};

export default NewGame;
