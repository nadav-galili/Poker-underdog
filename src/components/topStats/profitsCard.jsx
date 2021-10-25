import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import { SpinnerInfinity} from "spinners-react";


const SuccessCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);

  const teamId = props.match.params.teamId;
  console.log("F", data);
  console.log("hhhh", hero);
  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.profits(teamId);
      table = table.data;
      const handleDates = (list, prop) => {
        return list.map((item) => {
          const obj = Object.assign({}, item);
          obj[prop] = new Date(obj[prop]).toLocaleDateString();
          return obj;
        });
      };
      table = handleDates(table, "created_at");
      let myHero = table.shift();
      setHero(myHero);
      setData(table);
    };

    getTable();
  }, [setData, teamId]);

  let rank = 2;
  return (
    <div className="container-fluid">
      <h1>Top 10 Profits </h1>
      {data.length===0 && (
        <div className="spinner pt-2">
     <SpinnerInfinity size={130} thickness={151}
     speed={70} color="rgba(252, 252, 252, 1)"
      secondaryColor="rgba(108, 20, 180, 1)"
       enabled={data.length===0? true : false}
      />
        </div>
      )}
      {data.length>0 &&(
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
                {data.length > 0 ? hero.players.name : ""}
              </a>
              <div className="heroDate">
                {data.length > 0 ? hero.created_at : ""}
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
                key={player.created_at + player.players.profit}
              >
                <div className="rowPos">{rank++}.</div>
                <div className="rowImage">
                  <img
                    src={
                      data.length > 0
                        ? `${apiImage}${player.players.image}`
                        : ""
                    }
                    alt="player list row"
                  />
                </div>
                <div className="rowName">
                  {data.length > 0 ? player.players.name : ""}
                </div>
                <div className="rowDate">
                  {data.length > 0 ? player.created_at : ""}
                </div>
                <div className="rowProfit">
                  {data.length > 0 ? player.players.profit : ""}
                </div>
              </li>
            ))}
          </React.Fragment>
        </ul>
      </div>
      )}
    </div>
  );
};

export default SuccessCard;
