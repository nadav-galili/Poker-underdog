import React from "react";
import { GiCardAceHearts } from "react-icons/gi";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { apiImage } from "../../config.json";
import { AiFillDollarCircle } from "react-icons/ai";

const SideBetsCard = ({ teamId }) => {
  return (
    <div className="cardDiv">
      <div
        className="card"
        id="mainStats"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/icons/diamond.svg"
          })`,
        }}
      >
        <h5 className="card-title ">Poker @ Vasili</h5>
        <div className="img-card">
          <img
            src={`${apiImage}images/vsCard.jpg`}
            className="card-img-top "
            alt="cards"
          />
        </div>

        <div className="card-body" id="statsCardBody">
          <p className="card-text" id="statsCardText">
            <span>$Side-Bets$</span>
            <br />
            <span>
              <AiFillDollarCircle />
            </span>
            <br />
          </p>
        </div>
      </div>
      <Link
        className="text-white btn btn-primary"
        id="cardFooter"
        to={`/side-bets/${teamId}`}
      >
        See full table
        <GiCardAceHearts />
        <AiOutlineDoubleRight />
      </Link>
    </div>
  );
};

export default SideBetsCard;
