import React, { useState, useEffect } from "react";
import PageHeader from "../common/pageHeader";

const H2hGame = ({ players }) => {



  return (
    <React.Fragment>
      <PageHeader titleText="Head 2 Head" />

      <div className="col-lg-8 col-10" id="cardTop">
        <ol className="statsList">
          <li
            id="gameLi"
            className="statsHero d-flex"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
              })`,
            }}
          >
            <div className="gameH2h d-flex w-100 justify-content-evenly">
              <div className="player1"></div>
              <div className="player2">Player 2</div>
            </div>
          </li>
          <div className="statsRow w-100 justify-content-evenly">
            <div className="rowPlayer">
              <img src="" alt="" />
            </div>
            <div className="rowPlayer">
              <img src="" alt="" />
            </div>
          </div>
        </ol>
      </div>
    </React.Fragment>
  );
};

export default H2hGame;
