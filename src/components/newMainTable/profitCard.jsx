import React, { useState, useEffect } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";

const ProfitCard = ({ teamId }) => {
  const [profitsStats, setProfitsStats] = useState({});

  useEffect(() => {
    async function getProfitsStats() {
      const { data: profitsStats } = await gameService.getNewProfitsStats(
        teamId
      );
      setProfitsStats(profitsStats);
      console.log("profitsStats", profitsStats);
    }
    getProfitsStats();
  }, []);
  return (
    <div className="profitsContainer p-0">
      <p className="pt-3 ps-3 bg-white totalProfitNewCard">Total Profit</p>
      <div className="col-12 profitCard">
        <div className="leaderContainer d-flex justify-content-between">
          <div className="leaderImage m-3">
            <img src={`${apiImage}${profitsStats[0]._id.image}`} alt="leader" />
          </div>
          <div className="leaderDetail pe-4">
            <p>1.</p>
            <p className="leaderName">{profitsStats[0]._id.name}</p>
            <p className="leaderProfit">
              Profit: <span>{profitsStats[0].totalProfit}</span>
            </p>
            <p className="">Total Games: {profitsStats[0].totalGames}</p>
            <p className="">Games In Plus:{profitsStats[0].gamesWithPlus}</p>
            <p className="">Avg Profit: {profitsStats[0].avgProfit}</p>
          </div>
        </div>
      </div>
      <ol start="2" className="bg-white m-0">
        <li>player 2</li>
        <li> player 3</li>
      </ol>
      <p className="bg-white">View Full Table</p>
    </div>
  );
};

export default ProfitCard;
