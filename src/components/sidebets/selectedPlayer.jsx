import React, { useState } from "react";
import { apiImage } from "../../config.json";

const SelectedPlayer = (player) => {
  const choosen = player.player;
  const [sideBetSum, setSideBetSum] = useState("");
  console.log(
    "🚀 ~ file: selectedPlayer.jsx:7 ~ SelectedPlayer ~ sideBetSum",
    typeof sideBetSum
  );

  console.log("ee", player);

  const getSideBetSum = (e) => {
    console.log(typeof e.target.value);
    console.log("vv", e.target.value);
    setSideBetSum(parseInt(e.target.value));
  };

  return (
    <div className="container ">
      <p className="text-center text-primary">Make A Side Bet With player</p>
      <div className="d-flex justify-content-center choosenPlayer mt-3">
        <img src={`${apiImage}${choosen.image}`} alt="" />
      </div>
      <p className="selectedSideBet text-center">{choosen.nickName}</p>
      <div className="sideBetSum d-flex justify-content-center m-2">
        <p className="text-primary pe-2">Sum:</p>
        <input
          type="number"
          className="w-25"
          value={sideBetSum}
          placeholder="Enter sum"
          onChange={(e) => getSideBetSum(e)}
        />
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-danger">Cancel</button>
        <button className="btn btn-primary ">Make A Bet</button>
      </div>
    </div>
  );
};

export default SelectedPlayer;
