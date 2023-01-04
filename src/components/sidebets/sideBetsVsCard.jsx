import React, { useEffect, useState } from "react";
import { apiImage } from "../../config.json";
import sideBetsService from "../../services/sideBetsService";

const SideBetsVsCard = ({ sideBets }) => {
  const [sideBetDetails, setSideBetDetails] = useState([]);
  useEffect(() => {
    const getSideBetsExtraData = async () => {
      const extraDetails = await sideBetsService.getExtraDetais(
        sideBets.teamId,
        sideBets.masterPlayer._id,
        sideBets.slavePlayer._id,
        sideBets.startDate,
        sideBets.endDate
      );
      setSideBetDetails(extraDetails.data);
    };
    getSideBetsExtraData();
  }, []);

  console.log(
    "🚀 ~ file: sideBetsVsCard.jsx:7 ~ SideBetsVsCard ~ sideBetDetails",
    sideBetDetails
  );
  return (
    <>
      {sideBetDetails.length > 0 && (
        <div
          className="vsImage d-flex justify-content-between align-items-center"
          style={{
            backgroundImage: `url(${apiImage}images/vs.jpg)`,
          }}
        >
          <div className="sideBets1 w-50">
            <div className="sideBetsPlayer1 d-flex align-items-center justify-content-center">
              <img
                src={`${apiImage}${sideBetDetails[0]._id.playerImage}`}
                alt="masterPlayer"
              />
            </div>
            <p className="sidebetName">
              <b>
                <u>{sideBetDetails[0]._id.playerName}</u>
              </b>
            </p>
            <p className="text-primary m-0">
              <u>Profit</u>
            </p>
            <p className="text-white m-0">{sideBetDetails[0].totalProfit}</p>
            <p className="text-primary m-0">
              <u>Total Games</u>
            </p>
            <p className="text-white  m-0">{sideBetDetails[0].totalGames}</p>
            <p className="text-primary m-0">
              <u>Average Profit</u>
            </p>
            <p className="text-white  m-0">{sideBetDetails[0].avgProfit}</p>
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
      )}
    </>
  );
};

export default SideBetsVsCard;
