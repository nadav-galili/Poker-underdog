import React from "react";
import { GiCardAceHearts } from "react-icons/gi";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { apiImage } from "../../config.json";

const CurrMonth = ({ header, name, team, month }) => {
  const year = new Date().getFullYear();
  const date = new Date(month.month);

  let currentMonth = date.toLocaleString("en-US", { month: "long" });
  let players = month.players;
  const compare = (a, b) => {
    if (a.totalProfit < b.totalProfit) return 1;
    if (a.totalProfit > b.totalProfit) return -1;
    return 0;
  };
  players.sort(compare);
  return (
    <div className="cardDiv month">
      <div
        className="card "
        id="mainStats"
        style={{
          backgroundImage: `url(${apiImage + "images/diamond-sunset.svg"})`,
        }}
      >
        <h5 className="card-title text-white">{players[0]._id.name}</h5>
        <div className="img-card">
          <img
            src={
              players[0]._id.image
                ? `${apiImage}${players[0]._id.image}`
                : "https://images.unsplash.com/photo-1626775238053-4315516eedc9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBva2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
            className="card-img-top "
            alt={name}
          />
        </div>
        <div className="card-img-overlay"></div>
        <div className="card-body p-0" id="statsCardBody">
          <div className="card-text" id="statsCardText">
            <span>{header}</span>
            <br />
            <div className="d-flex justify-content-around">
              <span id="month">{currentMonth ? currentMonth : ""}</span>
              <span>{players ? players[0].totalProfit : 0}</span>
            </div>
          </div>
        </div>
      </div>
      <Link
        className="text-white btn btn-primary"
        id="cardFooter"
        to={`/tables/monthlyStats/${year}/${currentMonth}/${team._id}`}
      >
        See full table
        <GiCardAceHearts />
        <AiOutlineDoubleRight />
      </Link>
    </div>
  );
};

export default CurrMonth;
