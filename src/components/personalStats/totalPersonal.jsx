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
            profit={stats.stats.totalProfit}
            itemClass={
              stats.stats.totalProfit > 0 ? "text-primary" : "text-danger"
            }
          />
          <CardIcon
            image="poker-chips"
            text="Avg Cashing"
            avgCashing={stats.stats.avgCashing}
          />
          <CardIcon
            image="poker"
            text="Avg Profit"
            avgProfit={stats.stats.avgProfit}
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
