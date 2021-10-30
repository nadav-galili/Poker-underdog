import React from "react";
import { GiCardAceHearts } from "react-icons/gi";
import { Link } from "react-router-dom";
import { apiImage } from "../../config.json";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Profits = ({ header, data, name, image, team, table }) => {
  return (
    <div className="cardDiv">
      <div className="card " id="mainStats">
        <h5 className="card-title">{name}</h5>
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
        <div className="card-body" id="statsCardBody">
          <p className="card-text" id="statsCardText">
            <span>{header}</span>
            <br />

            <span>{data ? data : 0}</span>
            <br />
          </p>
        </div>
      </div>
      <Link
     className="text-white btn btn-primary"
     id="cardFooter"
        to={`/tables/profits/top-ten/${team}`}
      >
        See full table
        <GiCardAceHearts />
        <AiOutlineDoubleRight/>
      </Link>
    </div>
  );
};

export default Profits;
