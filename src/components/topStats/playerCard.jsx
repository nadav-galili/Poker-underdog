import React from "react";
import { GiCardAceHearts } from "react-icons/gi";
import { VscChevronRight } from "react-icons/vsc";
import { Link } from "react-router-dom";

const PlayerCard = ({ header, data, name, image, cMonth }) => {
  let currentMonth = new Date(cMonth);
  currentMonth = currentMonth.toLocaleString("en-US", { month: "long" });

  return (
    <div className="col-lg-2 col-6 mt-3">
      <div className="card " id="mainStats">
        <h5 className="card-title">{name}</h5>
        <img src={image} className="card-img-top " alt={name} />
        <div className="card-img-overlay"></div>
        <div className="card-body" id="statsCardBody">
          <p className="card-text" id="statsCardText">
            <span>{header}</span>
            <br />
            {cMonth &&(
                <React.Fragment>
            <span id="month" >{cMonth ? currentMonth : ""}</span><br />
            </React.Fragment>
            )
            }
            <span>{data}</span>
            <br />
            <Link className="btn btn-primary btn-sm" type="button">
              See full table
              <GiCardAceHearts />
              <VscChevronRight />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
