import React from "react";
import {apiImage} from "../config.json"

const Player = ({ player, selectPlayers, selected }) => {
  return (
    <div className="col-md-6 col-lg-3 col-6 mt-3">
      <div className="card">
        <img
          className="m-2 playerImage"
          width="100"
          height="100"
          src={`${apiImage}${player.image}`}
          alt=""
        />
        <div
          className={
            selected.find((e) => player._id === e.id)
              ? "card-body selected"
              : "card-body"
          }
        >
          <h5 className="card-title">{player.nickName}</h5>
          <button
            type="button"
            className="btn btn-primary align-self-center"
            onClick={selectPlayers}
          >
            +Add/Remove player to game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
