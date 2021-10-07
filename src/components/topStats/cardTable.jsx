import React from "react";


const CardTable = () => {
  return (
    <div className="container">
        <h1>League Table</h1>
      <div className="col-lg-6 col-10" id="cardTop">
            <ul className="statsList">
                <li className="statsHero"
                  style={{ 
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/icons/stats-card-bg2.svg'})` 
                  }} >
                    <div className="statsInfo">
                      <div className="pos">1.</div>
                      <a href="#/">Nadav Galili</a>
                    <div id="profit">Profit</div>
                    <div id="amount">1600</div>
                    </div>
                <div className="heroImage">

                  <img src={process.env.PUBLIC_URL+'n3.png'} alt="" />
                </div>
                </li>
                <li className="statsRow">
                </li>
            </ul>
        
        </div>
      </div>
  
  );
};

export default CardTable;
