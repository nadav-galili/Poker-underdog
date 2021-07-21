import React, { useState, useEffect } from "react";
import PageHeader from "./common/pageHeader";
import teamService from "../services/teamService";
import Player from "./player";
import { Link } from "react-router-dom";

const SelectPlayers = (props) => {
  const [data, setData] = useState([props.match.params.teamId]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await teamService.getTeam(data);
      setData(players.data);
    };
    fetchPlayers();
  }, [data]);

  useEffect(() => {
    localStorage.setItem("playersInGame", JSON.stringify(selected));
    localStorage.setItem("data", JSON.stringify(data));
  });

  function selectPlayers(playerId, name, image) {
    const player = {
      id: playerId,
      name: name,
      image: image,
      cashing: 0,
      cashInHand: 0,
      profit: 0,
    };
    selected.find((e) => player.id === e.id)
      ? setSelected(selected.filter((item) => item.id !== player.id))
      : setSelected([...selected, player]);
  }

  return (
    <div className="container-fluid">
      <h1>
        <u>Start A New Game Here</u>
      </h1>
      <h2 className="teamName">{data.name}</h2>
      <h3>Team Number:{data.teamNumber}</h3>
      <img src={data.teamImage} alt={data.name} width="200" height="200"></img>
      <PageHeader titleText="Select players for current game" />
      <div className="playersInGame"></div>
      <div className="row container">
        {data.players &&
          data.players.map((player) => (
            <Player
              teamName={data.name}
              selected={selected}
              player={player}
              key={player._id}
              selectPlayers={() => {
                selectPlayers(player._id, player.name, player.userImage);
              }}
            />
          ))}
      </div>
      {selected.length > 1 && (
        <Link
          to={{
            pathname: "/game",

            data: { data },
          }}
          className="btn btn-primary btn-lg m-3"
        >
          Continue to game
        </Link>
      )}
      {selected.length <= 1 && (
        <p className="selectP">*Please select at least 2 players</p>
      )}
    </div>
  );
};

export default SelectPlayers;
