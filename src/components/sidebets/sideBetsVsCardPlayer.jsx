import React from "react";
import { apiImage } from "../../config.json";

const SideBetsVsCardPlayer = ({ sideBetDetail }) => {
  return (
    <div className="sideBets1 w-50" key={sideBetDetail._id.playerId}>
      <p className={sideBetDetail.leader ? "sideBetLeader" : "sideBetLoser"}>
        {sideBetDetail.leader ? "Leader" : ""}
      </p>
      <div className="sideBetsPlayer1 d-flex align-items-center justify-content-center">
        <img
          src={`${apiImage}${sideBetDetail._id.playerImage}`}
          alt="masterPlayer"
        />
      </div>
      <p className="text-primary">
        <b>
          <u>{sideBetDetail._id.playerName}</u>
        </b>
      </p>
      <p className="sidebetTitles">
        <u>Profit</u>
      </p>
      <p className="text-white m-0 sideBetsVsStats">
        {sideBetDetail.totalProfit}
      </p>
      <p className="sidebetTitles">
        <u>Total Games</u>
      </p>
      <p className="text-white  m-0 sideBetsVsStats">
        {sideBetDetail.totalGames}
      </p>
      <p className="sidebetTitles">
        <u>Average Profit</u>
      </p>
      <p className="text-white  m-0 sideBetsVsStats">
        {sideBetDetail.avgProfit}
      </p>
    </div>
  );
};

export default SideBetsVsCardPlayer;
