import React from "react";
import { apiImage } from "../../config.json";
import { Link } from "react-router-dom";

const PlayersImages = ({ player }) => {
  return (
    <Link to={`/players-stats/${player._id}`}>
      <img
        src={`${apiImage}${player.image}`}
        alt="player image"
        className="rounded-circle"
      />
      <p className="text-center playerName">{player.nickName}</p>
    </Link>
  );
};

export default PlayersImages;
