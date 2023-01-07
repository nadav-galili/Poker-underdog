import React from "react";
import { apiImage } from "../../config.json";

const ChoosePlayer = (props) => {
  let player = props.player;
  return (
    <div className="player col-4" onClick={() => props.selectPlayer(player)}>
      <div className="sideBetPlayer text-center mt-3">
        <img src={`${apiImage}${player.image}`} alt="" />
        <p className="m-0">{player.nickName}</p>
      </div>
    </div>
  );
};

export default ChoosePlayer;
