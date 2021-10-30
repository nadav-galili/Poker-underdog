import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import PageHeader from "../common/pageHeader";
import { SpinnerInfinity } from "spinners-react";
import { apiImage } from "../../config.json";

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
    let game={...data}
    game.gameId = props.match.params.gameId;
    delete game._id;
    delete game.__v;
    setData(game)
    gameService.updateGame(game.gameId, game).then((res) => {
      // setData(res.data);
    });
  };

  const undoCashing = (playerId) => {
    let player = data.players.find((e) => playerId === e.id);
    player.cashing -= 50;
    player.numOfCashing -= 1;
    let game={...data}
    game.gameId = props.match.params.gameId;
    delete game._id;
    delete game.__v;
    setData(game)
    gameService.updateGame(game.gameId, game);
  };

  const handleChange = (playerId, e) => {
    let play={...data}
    let player = play.players.find((e) => playerId === e.id);
    player.cashInHand = e.target.value;
    player.profit = player.cashInHand - player.cashing;
    let game = play;
    setData(game);
  };

  const updateGame = () => {
    let game={...data}
    game.gameId = props.match.params.gameId;
    delete game._id;
    game.isOpen=false
    game.players.sort((a,b)=>b.profit-a.profit)
    console.log(game);
    let gameRank=1;
    game.players.map(p=>(
      p.gameRank=gameRank++
    ));
    setData(game)
    gameService.updateGame(game.gameId, game).then((res) => {
      setData(res.data);
    });
    props.history.push(`/last-game/${data.team_id}`);
  };
  return (
    <div className="container-fluid">
      <PageHeader titleText="Game No." />
      <p className="text-danger">{data._id}</p>
      <p className="text-primary">Started At: {new Date(data.createdAt).toLocaleDateString("en-GB") +
          " " +
          new Date(data.createdAt).toLocaleString("en-US", {hour: "2-digit", minute: "2-digit", hour12: false})
        }</p>
    
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
            id="gameLi"
              className="statsHero d-flex"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <div className="gameHeaders d-flex">
              <div className="Cashing">Cashing</div>
              <div className="Hand">Cash In Hand</div>
              <div className="Profit">Profit</div>
              </div>
              
           
            </li>
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
            <li className="statsRow w-100">
              <p className="ms-5 text-primary">Total</p>
            <div className="ms-3 me-5">{data.players.reduce((a,b)=>{
              return a+b.cashing
            },0)}</div>
           
            <div className="totalPlayersProfit ms-5">{data.players.reduce((a,b)=>{
              return a+b.profit
            },0)}</div>
            </li>
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
