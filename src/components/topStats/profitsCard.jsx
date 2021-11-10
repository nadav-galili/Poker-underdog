import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import teamService from "../../services/teamService";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";

const ProfitsCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [teamImg, setTeamImg] = useState("");

  const teamId = props.match.params.teamId;
  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.profits(teamId);
      table = table.data;

      let teamPic = await teamService.getTeam(teamId);
      setTeamImg(teamPic.data);

      const handleDates = (list, prop) => {
        return list.map((item) => {
          const obj = Object.assign({}, item);
          obj[prop] = new Date(obj[prop]).toLocaleDateString();
          return obj;
        });
      };
      table = handleDates(table, "createdAt");
      let myHero = table.shift();
      setHero(myHero);
      setData(table);
    };

    getTable();
  }, [setData, teamId]);

  let rank = 2;
  return (
    <div className="container">
      <PageHeader titleText="Top 10 Profits"/>
      <div className="teamImg d-flex flex-row mb-2">
      <img src={`${apiImage}${teamImg.teamImage}`} alt="" />
      <span>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
      <div className="col-lg-3 col-12" id="cardTop">
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
                {data.length > 0 ? hero.players.name : ""}
              </a>
              <div className="heroDate ps-1">
                {data.length > 0 ? hero.createdAt : ""}
              </div>
              <div id="amount" className="flex-fill">
                {data.length > 0 ? hero.players.profit : ""}
              </div>
            </div>
            <div className="heroImage ">
              <img
                src={data.length > 0 ? `${apiImage}${hero.players.image}` : ""}
                alt=""
              />
            </div>
          </li>
          <React.Fragment>
            {data.map((player) => (
              <li
                className="statsRow d-flex"
                key={player.createdAt + player.players.profit}
              >
                <div className="rowPosTop">{rank++}.</div>
                <div className="rowImageTop">
                  <img
                    src={
                      data.length > 0
                        ? `${apiImage}${player.players.image}`
                        : ""
                    }
                    alt="player list row"
                  />
                </div>
                <div className="rowNameTop">
                  {data.length > 0 ? player.players.name : ""}
                </div>
                <div className="rowDate">
                  {data.length > 0 ? player.createdAt : ""}
                </div>
                <div className="rowProfitTop">
                  {data.length > 0 ? player.players.profit : ""}
                </div>
              </li>
            ))}
          </React.Fragment>
        </ul>
      </div>
    </div>
  );
};

export default ProfitsCard;
