import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";

const CurrMonthCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  let currentMonth = new Date();
  let currentMonthNumber = currentMonth.getMonth() + 1;
  currentMonth = currentMonth.toLocaleString("en-US", { month: "long" });

  const teamId = props.match.params.teamId;

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.monthsData(teamId);
      table = table.data;
      table = table.filter(
        (month) => month._id.monthPlayed === currentMonthNumber
      );
      let myHero = table.shift();
      setHero(myHero);
      setData(table);
    };

    getTable();
  }, [setData, teamId, currentMonthNumber]);

  let rank=2;

  return (
    <div className="container">
      <h1>{currentMonth} {new Date().getFullYear()}</h1>
      <div className="col-lg-3 col-10" id="cardTop">
        <ul className="statsList ">
          <li
            className="statsHero d-flex"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
              })`,
            }}
          >
            <div className="statsInfo flex-fill">
              <div className="pos">1.</div>
              <a href="#/" id="heroName">
                {data.length > 0 ? hero._id.name : ""}
              </a>
              {/* <div id="profit" className="flex-fill">{cardName}</div> */}
              <div id="amount" className="flex-fill">
                {data.length > 0 ? hero.totalProfit : ""}
              </div>
            </div>
            <div className="heroImage ">
              <img src={data.length > 0 ? `${apiImage}${hero._id.image}` : ""} alt="hero" />
            </div>
          </li>
          <React.Fragment>
            {data.map((player) => (
              <li className="statsRow d-flex" key={player._id.name}>
                <div className="rowPos">{rank++}.</div>
                <div className="rowImage">
                  <img
                    src={data.length > 0 ? `${apiImage}${player._id.image}` : ""}
                    alt="player list row"
                  />
                </div>
                <div className="rowName">
                  {data.length > 0 ? player._id.name : ""}
                </div>
                <div className="rowProfit">
                  {data.length > 0 ? player.totalProfit : ""}
                </div>
              </li>
            ))}
          </React.Fragment>
        </ul>
      </div>
    </div>
  );
};

export default CurrMonthCard;
