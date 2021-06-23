import React from "react";
import CardIcon from "./cardIcon";

const TotalPersonal = () => {
  return (
    <div className="row">
      <CardIcon image="poker-cards" text="Games Played" />
      <CardIcon image="casino" text="Total Profit" />
      <CardIcon image="poker-chips" text="Total Cashing" />
      <CardIcon image="poker" text="Avg Profit" />
    </div>
  );
};

export default TotalPersonal;
