import React, { useEffect, useState } from "react";
import { apiImage } from "../../config.json";
import sideBetsService from "../../services/sideBetsService";
import SideBetsVsCardPlayer from "./sideBetsVsCardPlayer";

const SideBetsVsCard = ({ sideBets }) => {
  const [sideBetDetails, setSideBetDetails] = useState([]);
  useEffect(() => {
    const getSideBetsExtraData = async () => {
      let extraDetails = await sideBetsService.getExtraDetais(
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

  return (
    <div
      className="vsImage d-flex justify-content-between align-items-center mt-3"
      style={{
        backgroundImage: `url(${apiImage}images/vs.jpg)`,
      }}
    >
      {sideBetDetails.length > 0 &&
        sideBetDetails.map((sideBetDetail) => (
          <SideBetsVsCardPlayer
            sideBetDetail={sideBetDetail}
            key={sideBetDetail.totalProfit}
          />
        ))}
    </div>
  );
};

export default SideBetsVsCard;
