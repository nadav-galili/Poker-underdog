import React, { useState, useEffect } from "react";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import gameService from "../../services/gameService";
import userService from "../../services/userService";

const SidebetsMain = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSideBets = async () => {
      let sideB = await gameService.sideBets(props.match.params.teamId);
      setData(sideB.data);
      // console.log(sideB.data);
      // let players = await gameService.getSideBets();
      // setUsers(players.data);
    };

    getSideBets();
  }, []);
  return (
    <div className="container">
      <PageHeader titleText="Side Bets" />
      <span>Starting Date: 27/5/2022</span>
      {data.length > 0 && (
        <div
          className="vsImage d-flex justify-content-between align-items-center"
          style={{
            backgroundImage: `url(${apiImage}images/vs.jpg)`,
          }}
        >
          <div className="sideBets1 w-50">
            <div className="sideBetsPlayer1 d-flex align-items-center justify-content-center">
              <img
                src={
                  data[1]
                    ? `${apiImage}${data[1]._id.image}`
                    : `${apiImage}uploads/IMG_20220510_090211-1652423176528.jpg`
                }
                alt=""
              />
            </div>
            <p className="sidebetName">
              <b>
                <u>{data[1] ? data[1]._id.name : "Barvaz"}</u>
              </b>
            </p>
            <p className="text-primary m-0">
              <u>Profit</u>
            </p>
            <p className="text-white m-0">{data[1] ? data[1].profit : 0}</p>
            <p className="text-primary m-0">
              <u>Total Games</u>
            </p>
            <p className="text-white  m-0">
              {data[1] ? data[1].numOfGames : 0}
            </p>
            <p className="text-primary m-0">
              <u>Average Profit</u>
            </p>
            <p className="text-white  m-0">
              {data[1] ? data[1].avgProfit.toFixed(2) : 0}
            </p>
          </div>
          <div className="sideBets2 w-50  ">
            <div className="sideBetsPlayer2 d-flex align-items-center justify-content-center">
              <img
                src={`${apiImage}${data[0]._id.image}
`}
                alt=""
              />
            </div>
            <p className="sidebetName">
              <b>
                <u>{data[0]._id.name}</u>
              </b>
            </p>
            <p className="text-primary m-0">
              <u>Profit</u>
            </p>
            <p className="text-white m-0">{data[0].profit}</p>
            <p className="text-primary m-0">
              <u>Total Games</u>
            </p>
            <p className="text-white  m-0">{data[0].numOfGames}</p>
            <p className="text-primary m-0">
              <u>Average Profit</u>
            </p>
            <p className="text-white  m-0">
              {data[0].avgProfit ? data[0].avgProfit.toFixed(2) : ""}
            </p>
          </div>
        </div>
      )}

      <p className="credit">
        {" "}
        <a href="https://www.freepik.com/vectors/dual">
          Dual vector created by starline - www.freepik.com
        </a>
      </p>
    </div>
  );
};

export default SidebetsMain;
