import React from "react";
import CardIcon from "./cardIcon";

const TotalPersonal = (stats) => {
  return (
    <div className="row icon-cards">
      {stats.stats && (
        <React.Fragment>
          <CardIcon
            image="poker-cards"
            text="Games Played"
            games={stats.stats.numOfGames}
          />
          <CardIcon
            image="casino"
            text="Total Profit"
            profit={Math.round(stats.stats.totalProfit * 100) / 100}
            itemClass={
              stats.stats.totalProfit > 0 ? "text-primary" : "text-danger"
            }
          />
          <CardIcon
            image="poker-chips"
            text="Avg Cashing"
            avgCashing={Math.round(stats.stats.avgCashing * 100) / 100}
          />
          <CardIcon
            image="poker"
            text="Avg Profit"
            avgProfit={Math.round(stats.stats.avgProfit * 100) / 100}
            itemClass={
              stats.stats.avgProfit > 0 ? "text-primary" : "text-danger"
            }
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default TotalPersonal;
