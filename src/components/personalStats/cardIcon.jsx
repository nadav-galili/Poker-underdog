import React from "react";

const CardIcon = ({ image, text }) => {
  return (
    <div className="card mx-auto mt-5 mb-3">
      <img
        src={process.env.PUBLIC_URL + `/icons/${image}.png`}
        className="card-img-top"
        alt="icon"
      />
      <div className="card-body">
        <h2 className="card-text mt-3">{text}</h2>
        <h4>100.67</h4>
      </div>
    </div>
  );
};

export default CardIcon;
