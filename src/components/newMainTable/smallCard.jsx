import React, { useState, useEffect } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";

const SmallCard = ({
  teamId,
  cardTitle,
  stats,
  data,
  playersData,
  leaderData,
}) => {
  const [cardStats, setCardStats] = useState([]);
  useEffect(() => {
    async function getCardStats() {
      const { data: cardStats } = await gameService.getCardStats(teamId, stats);
      setCardStats(cardStats);
      console.log("cardStats11", cardStats);
    }
    getCardStats();
  }, []);
  return (
    <>
      {cardStats.length > 0 && (
        <div className="smallCardContainer">
          <p className="pt-3 ps-3 bg-white newSmallCard">{cardTitle}</p>
          <div className="col-12 profitCard">
            <div className="leaderContainer d-flex justify-content-between">
              <div className="leaderImageSmall m-3">
                <img
                  src={`${apiImage}${cardStats[0]._id.image}`}
                  alt="leader"
                />
              </div>
              <div className="leaderDetailSmall pe-1">
                <p>1.</p>
                <p className="leaderName">{cardStats[0]._id.name}</p>
                <p className="leaderProfit">
                  {leaderData[0]}: <span>{cardStats[0][data[0]]}</span>
                </p>
                <p className="">
                  {leaderData[1]}: {cardStats[0][data[1]]}
                </p>
                <p className="">
                  {leaderData[2]}:{cardStats[0][data[2]]}
                </p>
                <p className="">
                  {leaderData[3]}: {cardStats[0][data[3]]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallCard;
