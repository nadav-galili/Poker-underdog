import React, { Component } from "react";
import { apiImage } from "../../config.json";
import { Link } from "react-router-dom";

const PlayersImages = ({ player }) => {
  return (
    <Link to={`/players-stats/${player._id}`}>
      <img src={`${apiImage}${player.image}`} alt="player image" />
    </Link>
  );
};

export default PlayersImages;
