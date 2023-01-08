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
          <p className="text-center pt-2 bg-white newSmallCard">{cardTitle}</p>
          <div className="col-12 profitCard">
            <div className="Small">
              <div className="leaderImageSmall mx-auto">
                <img
                  src={`${apiImage}${cardStats[0]._id.image}`}
                  alt="leader"
                  className="mt-1"
                />
              </div>
              <div className="leaderDetailSmall d-flex  flex-column text-center mt-1">
                <p className="leaderName">1.{cardStats[0]._id.name}</p>
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
          <ol start="2" className="bg-white m-0 p-0  secondPlayerSmall">
            <li className="d-flex flex-row py-1">
              2.
              <div className="secondPlayerImage mx-1">
                <img src={`${apiImage}${cardStats[1]._id.image}`} alt="" />
              </div>
              <span className="mx-1">{cardStats[1]._id.name}- </span>
              {playersData[0]}
              <span className="mx-1 playersNewProfit">
                {cardStats[1][data[0]]}
              </span>{" "}
              <p className="smallCardLastDetail">
                {" "}
                {playersData[1]}
                {cardStats[1][data[1]]}
              </p>
            </li>
            <li className="d-flex flex-row mt-2">
              3.
              <div className="secondPlayerImage mx-1">
                <img src={`${apiImage}${cardStats[2]._id.image}`} alt="" />
              </div>
              <span className="mx-1">{cardStats[2]._id.name}- </span>
              {playersData[0]}
              <span className="mx-1 playersNewProfit">
                {cardStats[2][data[0]]}
              </span>{" "}
              <p className="smallCardLastDetail">
                {playersData[1]}
                {cardStats[2][data[1]]}
              </p>
            </li>
          </ol>
          <p className="bg-white">View Full Table</p>
        </div>
      )}
    </>
  );
};

export default SmallCard;
