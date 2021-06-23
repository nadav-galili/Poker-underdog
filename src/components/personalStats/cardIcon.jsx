import React from "react";

const CardIcon = ({ image, text }) => {
  return (
    <div class="card m-5">
      <img
        src={process.env.PUBLIC_URL + `/icons/${image}.png`}
        className="card-img-top"
        alt="icon"
      />
      <div className="card-body">
        <h2 className="card-text mt-3">{text}</h2>
      </div>
    </div>
  );
};

export default CardIcon;
