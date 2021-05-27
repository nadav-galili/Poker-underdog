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
  }, []);

  function selectPlayers(playerId, name, image) {
    const player = {
      id: playerId,
      name: name,
      image: image,
    };
    // console.log(player.id);
    // console.log(typeof selected[0].id);

    selected.find((e) => player.id === e.id)
      ? setSelected(selected.filter((item) => item.id !== player.id))
      : setSelected([...selected, player]);

    // ? setSelected(selected.filter((item) => item !== player.id))
    // :

    // selected.includes(player.id)
    //   ? setSelected(selected.filter((item) => item !== player.id))
    //   : setSelected([...selected, player]);
  }

  return (
    <div className="container">
      <h2>{data.name}</h2>
      <h3>Team Number:{data.teamNumber}</h3>
      <img src={data.teamImage} alt={data.name} width="200" height="200"></img>
      <PageHeader titleText="Select players for current game" />
      <div className="playersInGame"></div>
      <div className="row">
        {data.players &&
          data.players.map((player) => (
            <Player
              selected={selected}
              player={player}
              key={player._id}
              selectPlayers={() => {
                selectPlayers(player._id, player.name, player.userImage);
              }}
            />
          ))}
      </div>
      <Link
        to={{
          pathname: "/game",
          selected: { selected },
        }}
        className="btn btn-primary btn-lg m-3"
      >
        Continue to game
      </Link>
    </div>
  );
};

export default SelectPlayers;
