import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiImage } from "../../config.json";

const MasterPlayer = ({ user }) => {
  return (
    <div className="container d-flex justify-content-center">
      <Link to={`/players-stats/${user._id}`}>
        <div
          className="teamShield d-flex justify-content-center flex-column align-items-center"
          style={{
            backgroundImage: `url(${apiImage}images/fifaCard.png)`,
          }}
        >
          <img src={`${apiImage}${user.image}`} alt="" />
          <p className="m-0">{user.nickName}</p>
        </div>
      </Link>
    </div>
  );
};

export default MasterPlayer;
