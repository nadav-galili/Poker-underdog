import React from "react";
import { apiImage } from "../../config.json";

const SideBetsVsCard = ({ sideBets }) => {
  console.log(
    "🚀 ~ file: sideBetsVsCard.jsx:5 ~ SideBetsVsCard ~ sideBets",
    sideBets
  );

  return (
    <div
      className="vsImage d-flex justify-content-between align-items-center"
      style={{
        backgroundImage: `url(${apiImage}images/vs.jpg)`,
      }}
    >
      <div className="sideBets1 w-50">
        <div className="sideBetsPlayer1 d-flex align-items-center justify-content-center">
          <img
            src={`${apiImage}${sideBets.masterPlayer.image}`}
            alt="masterPlayer"
          />
        </div>
        <p className="sidebetName">
          <b>
            <u>{sideBets.masterPlayer.nickName}</u>
          </b>
        </p>
        <p className="text-primary m-0">
          <u>Profit</u>
        </p>
        {/* <p className="text-white m-0">{data[1] ? data[1].profit : 0}</p> */}
        <p className="text-primary m-0">
          <u>Total Games</u>
        </p>
        {/* <p className="text-white  m-0">{data[1] ? data[1].numOfGames : 0}</p> */}
        <p className="text-primary m-0">
          <u>Average Profit</u>
        </p>
        <p className="text-white  m-0">
          {/* {data[1] ? data[1].avgProfit.toFixed(2) : 0} */}
        </p>
      </div>
      <div className="sideBets2 w-50  ">
        <div className="sideBetsPlayer2 d-flex align-items-center justify-content-center">
          <img
            src={`${apiImage}${sideBets.slavePlayer.image}
    `}
            alt=""
          />
        </div>
        <p className="sidebetName">
          <b>
            <u>{sideBets.slavePlayer.nickName}</u>
          </b>
        </p>
        <p className="text-primary m-0">
          <u>Profit</u>
        </p>
        {/* <p className="text-white m-0">{data[0].profit}</p> */}
        <p className="text-primary m-0">
          <u>Total Games</u>
        </p>
        {/* <p className="text-white  m-0">{data[0].numOfGames}</p> */}
        <p className="text-primary m-0">
          <u>Average Profit</u>
        </p>
        <p className="text-white  m-0">
          {/* {data[0].avgProfit ? data[0].avgProfit.toFixed(2) : ""} */}
        </p>
      </div>
    </div>
  );
};

export default SideBetsVsCard;
