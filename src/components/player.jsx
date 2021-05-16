import React from "react";

const Player = ({ player }) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img
          className="p-2"
          width="100"
          src={player.image}
          alt={player.image}
        />
        <div className="card-body">
          <h5 className="card-title">{player}</h5>
        </div>
      </div>
    </div>
  );
};

export default Player;
