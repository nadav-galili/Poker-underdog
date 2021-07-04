import React from "react";

const CardIcon = ({
  image,
  text,
  games,
  profit,
  avgProfit,
  avgCashing,
  itemClass,
}) => {
  // const data = { image, games, profit, avgProfit, avgCashing };
  // console.log("u", data);

  return (
    <div className="card mx-auto mt-5 ">
      <img
        src={process.env.PUBLIC_URL + `/icons/${image}.png`}
        className="card-img-top"
        alt="icon"
      />
      <div className="card-body">
        <h2 className="card-text mt-3">{text}</h2>
        <h4 className={`card-text text-center myStats  ${itemClass}`}>
          {games || profit || avgProfit || avgCashing}
        </h4>
      </div>
    </div>
  );
};

export default CardIcon;
