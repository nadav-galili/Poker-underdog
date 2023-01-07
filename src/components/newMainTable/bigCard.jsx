import React, { useState, useEffect } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";

const BigCard = ({ teamId, cardTitle, stats, data, playersData }) => {
  console.log("🚀 ~ file: bigCard.jsx:6 ~ BigCard ~ data", data);

  const [cardStats, setCardStats] = useState([]);
  useEffect(() => {
    async function getCardStats() {
      const { data: cardStats } = await gameService.getCardStats(teamId, stats);
      setCardStats(cardStats);
      console.log("cardStats", cardStats);
    }
    getCardStats();
  }, []);

  return (
    <>
      {cardStats.length > 0 && (
        <div className="profitsContainer p-0">
          <p className="pt-3 ps-3 bg-white totalProfitNewCard">{cardTitle}</p>
          <div className="col-12 profitCard">
            <div className="leaderContainer d-flex justify-content-between">
              <div className="leaderImage m-3">
                <img
                  src={`${apiImage}${cardStats[0]._id.image}`}
                  alt="leader"
                />
              </div>
              <div className="leaderDetail pe-4">
                <p>1.</p>
                <p className="leaderName">{cardStats[0]._id.name}</p>
                <p className="leaderProfit">
                  Profit: <span>{cardStats[0][data[0]]}</span>
                </p>
                <p className="">Total Games: {cardStats[0][data[1]]}</p>
                <p className="">Games In Plus:{cardStats[0][data[2]]}</p>
                <p className="">Avg Profit: {cardStats[0][data[3]]}</p>
              </div>
            </div>
          </div>
          <ol start="2" className="bg-white m-0 secondPlayer">
            <li>
              <span>{cardStats[1]._id.name}</span>-{playersData[0]}:{" "}
              <span>{cardStats[1][data[0]]}</span> {playersData[1]}:
              {cardStats[1][data[1]]} {playersData[2]}:{cardStats[1][data[2]]}{" "}
              {playersData[3]}:{cardStats[1][data[3]]}
            </li>
            <li>
              <span>{cardStats[2]._id.name}</span>-{playersData[0]}:{" "}
              <span>{cardStats[2][data[0]]} </span>
              {playersData[1]}:{cardStats[2][data[1]]} {playersData[2]}:
              {cardStats[2][data[2]]} {playersData[3]}:{cardStats[2][data[3]]}
            </li>
          </ol>
          <p className="bg-white">View Full Table</p>
        </div>
      )}
    </>
  );
};

export default BigCard;
