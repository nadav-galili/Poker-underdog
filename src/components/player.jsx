import React from "react";
import {apiImage} from "../config.json"

const Player = ({ player, selectPlayers, selected }) => {
  return (
    <div className="col-md-6 col-lg-2 col-6 mt-3">
      <div className="card align-items-center">
        <div className="card-head ">
        <img
          className="m-2 playerImage"
          width="100"
          height="100"
          src={`${apiImage}${player.image}`}
          alt=""
        />
        </div>
        
        <div
          className={
            selected.find((e) => player._id === e.id)
              ? "card-body selected d-flex flex-column"
              : "card-body d-flex flex-column "
          }
        >
          <h5 className="card-title d-flex" id="selectTitle">{player.nickName}</h5>
          <button
            type="button"
            className="btn btn-primary "
            onClick={selectPlayers}
          >
            +Add/Remove player
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
