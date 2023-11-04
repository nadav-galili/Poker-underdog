import React from "react";
import { apiImage } from "../config.json";

const Player = ({ player, selectPlayers, selected }) => {
  return (
    <div className="col-md-6 col-lg-2 col-3 " id="players_select">
      <div className="card align-items-center playersCard">
        <div className="card-head d-flex justify-content-center">
          <img
            className="m-2 playerImage"
            width="1em"
            height="1em"
            src={`${apiImage}${player.image}`}
            alt=""
          />
        </div>

        <div
          className={
            selected.find((e) => player._id === e.id)
              ? "card-body selected d-flex flex-column p-0 mw-100"
              : "card-body d-flex flex-column p-0 "
          }
        >
          <h5
            className="card-title d-flex m-0 justify-content-center"
            id="selectTitle"
          >
            {player.nickName}
          </h5>
        </div>
        <button
          type="button"
          className="btn btn-primary col-8 d-flex w-100 justify-content-center"
          id="selectButton"
          onClick={selectPlayers}
        >
          +Add/Remove player
        </button>
      </div>
    </div>
  );
};

export default Player;
