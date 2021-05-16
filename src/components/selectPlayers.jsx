import React, { useState, useEffect } from "react";
import PageHeader from "./common/pageHeader";
import teamService from "../services/teamService";
import Player from "./player";

const SelectPlayers = (props) => {
  const [data, setData] = useState([props.match.params.teamId]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await teamService.getTeam(data);
      setData(players.data);
    };
    fetchPlayers();
  }, []);

  return (
    <div className="container">
      <PageHeader titleText="Select players for current game" />
      <h2>{data.name}</h2>
      <h3>Team Number:{data.teamNumber}</h3>
      <img src={data.teamImage} alt={data.name} width="200" height="200"></img>
      <div className="row">
        {data.players &&
          data.players.map((player) => <Player player={player} key={player} />)}
      </div>
    </div>
  );
};

export default SelectPlayers;
