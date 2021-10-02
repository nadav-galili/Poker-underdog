import React from 'react';
import { GiCardAceHearts } from "react-icons/gi";
import { VscChevronRight } from "react-icons/vsc";
import { Link } from "react-router-dom";

const PlayerCard = ({header, data, name, profitImage}) => {
    return ( 
        <div className="col-lg-4 col-6 mt-3">
        <div className="card" id="mainStats">
          <img
            // src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.6435-9/41808168_10156559226923903_7069984621298974720_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=7qjX1mGCrWEAX9Wt0Do&_nc_ht=scontent.ftlv5-1.fna&oh=3f3cc82610bac2456dd62b66f29cdc70&oe=617A9E00"
            src={profitImage}
            className="card-img-top"
            alt="..."
          />
            <div className="card-img-overlay">
    <h5 className="card-title">{name}</h5>
    </div>
          <div className="card-body" id="statsCardBody">
            <p className="card-text" id="statsCardText">
              <span>{header}</span><br />
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
}
 
export default PlayerCard;