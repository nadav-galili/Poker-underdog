import React from "react";

const TotalStatsForTeam = ({ totalStats }) => {
  return (
    <div className="totalStatsForMainTable ">
      <div className="row totalStatsForTeam">
        <div className="col-3 ">
          Total Cash:<br></br>
          {totalStats[0].totalCashing}💵
        </div>
        <div className="col-3">
          Total Hours:<br></br>
          {totalStats[0].totalHoursPlayed}⏳
        </div>
        <div className="col-3">
          Total Games:<br></br>
          {totalStats[0].totalGames}🃏
        </div>
        <div className="col-3">
          Last Game:<br></br>
          {totalStats[0].lastGamePlayed}🏆
        </div>
      </div>
    </div>
  );
};

export default TotalStatsForTeam;
