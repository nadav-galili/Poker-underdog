import React, { useState, useEffect } from "react";
import PageHeader from "./common/pageHeader";
import teamService from "../services/teamService";
import gameService from "../services/gameService";
import userService from "../services/userService";
import h2hService from "../services/h2hService";
import Player from "./player";
import { apiImage } from "../config.json";

const SelectPlayers = (props) => {
  const [data, setData] = useState([props.match.params.teamId]);
  const [selected, setSelected] = useState([]);
  const [started, setStarted] = useState("");
  const [me, setMe] = useState({});

  useEffect(() => {
    const fetchPlayers = async () => {
      if (data.length > 0) {
        const players = await teamService.getTeam(data);
        const game = await gameService.inProgress(props.match.params.teamId);
        const getGameManager = await userService.getUserDetails();
        me.id = getGameManager.data._id;
        me.name = getGameManager.data.nickName;
        setMe(me);
        if (game.data.length > 0) {
          setSelected(game.data[0].players);
          setStarted(game.data[0]);
        }

        setData(players.data);
      }
    };
    fetchPlayers();
  }, [props.match.params.teamId, data]);

  function selectPlayers(playerId, name, image) {
    const push = new Audio(process.env.PUBLIC_URL + `sounds/push.mp3`);
    push.play();
    const player = {
      id: playerId,
      name: name,
      image: image,
      cashing: 0,
      cashInHand: 0,
      numOfCashing: 0,
      profit: 0,
    };
    selected.find((e) => player.id === e.id)
      ? setSelected(selected.filter((item) => item.id !== player.id))
      : setSelected([...selected, player]);
  }

  async function shuffle() {
    const shuffle = new Audio(process.env.PUBLIC_URL + "sounds/Shuffle.mp3");
    shuffle.play();
    if (!started) {
      let game = {
        isOpen: true,
        players: selected,
        team_name: data.name,
        team_id: data._id,
        game_manager: me,
        cashing_details: [],
      };
      await gameService.newGame(game).then((res) => {
        let newGame = { ...res.data };
        newGame.gameId = newGame._id;
        delete newGame._id;
        h2hService.newH2h(newGame);
        props.history.push(`/games/${res.data._id}`);
      });
    } else {
      let game = {
        players: selected,
        team_name: started.team_name,
        team_id: started.team_id,
        gameId: started._id,
        cashing_details: started.cashing_details,
      };
      await gameService.updateGame(started._id, game).then((res) => {
        res.data.gameId = res.data._id;
        // h2hService.newH2h(res.data);
        h2hService.addPlayersH2h(started._id, game);
        props.history.push(`/games/${res.data._id}`);
      });
    }
  }

  return (
    <div className="container">
      <PageHeader titleText="Start A New Game" />
      <h2 className="teamName">{data.name}</h2>
      <h3>Team Number:{data.teamNumber}</h3>
      <img
        src={`${apiImage}${data.teamImage}`}
        alt={data.name}
        width="120"
        height="120"
      ></img>
      <h3 className="p-2 text-primary">Select players for current game</h3>
      <div className="row container">
        {data.players &&
          data.players.map((player) => (
            <Player
              teamName={data.name}
              selected={selected}
              player={player}
              key={player._id}
              selectPlayers={() => {
                selectPlayers(player._id, player.nickName, player.image);
              }}
            />
          ))}
      </div>
      {selected.length > 1 && (
        <button className="btn btn-primary btn-lg m-3" onClick={shuffle}>
          Continue to game
        </button>
      )}
      {selected.length <= 1 && (
        <p className="selectP">*Please select at least 2 players</p>
      )}
    </div>
  );
};

export default SelectPlayers;
