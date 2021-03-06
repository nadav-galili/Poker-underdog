import React from "react";
import { GiCardAceHearts } from "react-icons/gi";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { apiImage } from "../../config.json";

const CurrMonth = ({ header, data, name, image, cMonth, team, month }) => {
  const date = new Date();
  let currentMonth = date.toLocaleString("en-US", { month: "long" });

  return (
    <div className="cardDiv">
      <div
        className="card "
        id="mainStats"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/icons/diamond.svg"
          })`,
        }}
      >
        <h5 className="card-title ">{name}</h5>
        <div className="img-card">
          <img
            src={
              image
                ? `${apiImage}${image}`
                : "https://images.unsplash.com/photo-1626775238053-4315516eedc9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBva2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
            className="card-img-top "
            alt={name}
          />
        </div>
        <div className="card-img-overlay"></div>
        <div className="card-body p-0" id="statsCardBody">
          <div className="card-text pt-3" id="statsCardText">
            <span>{header}</span>
            <br />
            <div className="d-flex justify-content-around">
              <span id="month">{currentMonth ? currentMonth : ""}</span>

              <span>{data ? data : 0}</span>
            </div>
          </div>
        </div>
      </div>
      <Link
        className="text-white btn btn-primary"
        id="cardFooter"
        to={`/tables/monthlyStats/${team}`}
      >
        See full table
        <GiCardAceHearts />
        <AiOutlineDoubleRight />
      </Link>
    </div>
  );
};

export default CurrMonth;
