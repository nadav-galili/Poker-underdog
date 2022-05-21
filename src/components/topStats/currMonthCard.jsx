import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import teamService from "../../services/teamService";
import PageHeader from "../common/pageHeader";
import { Bar } from "react-chartjs-2";
import _ from "lodash";
import { Link } from "react-router-dom";
import { SpinnerInfinity } from "spinners-react";

const CurrMonthCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [teamImg, setTeamImg] = useState("");
  const [barChartDetails, setbarChartDetails] = useState({});

  let chosenMonth = props.match.params.currentMonth;
  const monthNumber = (mon) => {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  };
  const teamId = props.match.params.teamId;

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.monthsData(
        teamId,
        monthNumber(chosenMonth)
      );
      table = table.data;
      const barChart = {
        labels: [],
        datasets: [
          {
            label: `Profit By Player`,
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(39, 186, 46, 0.5)",
              "rgba(8, 20, 107, 0.5)",
              "rgba(8, 20, 107, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(39, 186, 46,1)",
              "rgba(8, 20, 107, 1)",
              "rgba(8, 20, 107, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      try {
        await table.forEach((player) => {
          barChart.labels.push(player._id.name);
          barChart.datasets[0].data.push(player.totalProfit);
        });

        setbarChartDetails(barChart);
      } catch {
        console.log("err1");
      }

      let teamPic = await teamService.getTeam(teamId);
      setTeamImg(teamPic.data);
      let myHero = table.shift();
      setHero(myHero);
      setData(table);
    };

    getTable();
  }, [setData, teamId]);

  let rank = 2;

  return (
    <div className="container pb-3">
      <PageHeader titleText={`${chosenMonth} Profit`} />
      <div className="teamImg d-flex flex-row mb-2">
        <img src={`${apiImage}${teamImg.teamImage}`} alt="" />
        <span>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
      {data.length === 0 && (
        <div className="spinner pt-2">
          <SpinnerInfinity
            size={130}
            thickness={151}
            speed={70}
            color="rgba(252, 252, 252, 1)"
            secondaryColor="rgba(108, 20, 180, 1)"
            enabled={data.length === 0 ? true : false}
          />
        </div>
      )}
      {data.length > 0 && hero._id && (
        <div className="col-lg-4 col-12" id="cardTop">
          <ol className="statsList ">
            <li
              className="statsHeroPerHour d-flex w-100"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <div className="statsInfo flex-fill" id="perHourHeroSide">
                <div className="pos">1.</div>
                <Link to={`/players-stats/${hero._id.player_id}`} id="heroName">
                  {data.length > 0 ? hero._id.name : ""}
                </Link>
                <div id="amount" className="flex-fill">
                  <div className="heroPerHour">Games Played:</div>
                  <div className="heroPerHour ">{hero.numOfGames}</div>
                </div>
                <div id="amount" className="flex-fill">
                  <p className="heroPerHour m-0">Avg Profit:</p>
                  <p className="heroPerHour m-0">
                    {" "}
                    {data.length > 0 ? hero.avgProfit : ""}
                  </p>
                </div>
                <div id="amount" className="flex-fill">
                  <p className="heroPerHour m-0">Total Profit:</p>
                  <p className="heroPerHour m-0">
                    {" "}
                    {data.length > 0 ? hero.totalProfit : ""}
                  </p>
                </div>
              </div>
              <div className="heroImagePerHour">
                <Link to={`/players-stats/${hero._id.player_id}`} id="heroName">
                  <img
                    src={data.length > 0 ? `${apiImage}${hero._id.image}` : ""}
                    alt=""
                  />
                </Link>
              </div>
            </li>
            <li className="statsHeaderPerHour d-flex w-100 justify-content-between">
              <div>Rank</div>
              <div>Image</div>
              <div>Player</div>
              <div>Games Played</div>
              <div>Avg Profit</div>
              <div>Total Profit</div>
            </li>
            <React.Fragment>
              {data.map((player) => (
                <li className="statsRow d-flex" key={player._id.name}>
                  <div className="rowPos month">{rank++}.</div>
                  <div className="rowImage month">
                    <img
                      src={
                        data.length > 0 ? `${apiImage}${player._id.image}` : ""
                      }
                      alt="player list row"
                    />
                  </div>
                  <div className="rowName month p-0">
                    {data.length > 0 ? player._id.name : ""}
                  </div>
                  <div className="gamePlayed p-0">
                    {data.length > 0 ? player.numOfGames : ""}
                  </div>
                  <div className="gamePlayed p-0">
                    {data.length > 0 ? player.avgProfit.toFixed(2) : ""}
                  </div>
                  <div className="rowProfit month">
                    {data.length > 0 ? player.totalProfit : ""}
                  </div>
                </li>
              ))}
            </React.Fragment>
          </ol>
          {barChartDetails.datasets && (
            <Bar data={barChartDetails} className="mb-3" />
          )}
        </div>
      )}
    </div>
  );
};

export default CurrMonthCard;
