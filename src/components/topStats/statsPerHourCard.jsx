import React, { useEffect, useState } from "react";
import gameService, { statsPerHour } from "../../services/gameService";
import teamService from "../../services/teamService";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";
import PageHeader from "../common/pageHeader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

const StatsPerHourCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [teamImg, setTeamImg] = useState("");
  const [dataChartDetails, setdataChartDetails] = useState({});
  const [barChartDetails, setbarChartDetails] = useState({});
  const [statsHour, setStatsHour] = useState([]);
  const teamId = props.match.params.teamId;
  const cardName = props.match.params.cardName;

  useEffect(() => {
    const getStats = async () => {
      let table = await gameService.statsPerHour(teamId);
      table = table.data;
      setStatsHour(table);
      let myHero = table.shift();
      setHero(myHero);
      console.log("s", hero);

      let teamPic = await teamService.getTeam(teamId);
      setTeamImg(teamPic.data);
      // console.log(teamImg);
      // console.log('1',table);
    };

    getStats();
  }, [teamId]);

  // useEffect(() => {
  //   const getTable = async () => {
  //     let table = await gameService.cardsData(teamId, cardName);
  //     table = table.data;

  //     let accu = [];
  //     const barChart = {
  //       labels: [],
  //       datasets: [
  //         {
  //           label: `${headerTitle} By Player`,
  //           data: [],
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.5)",
  //             "rgba(54, 162, 235, 0.5)",
  //             "rgba(255, 206, 86, 0.5)",
  //             "rgba(75, 192, 192, 0.5)",
  //             "rgba(153, 102, 255, 0.5)",
  //             "rgba(255, 159, 64, 0.5)",
  //             "rgba(39, 186, 46, 0.5)",
  //             "rgba(8, 20, 107, 0.5)",
  //             "rgba(8, 20, 107, 0.5)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //             "rgba(39, 186, 46,1)",
  //             "rgba(8, 20, 107, 1)",
  //             "rgba(8, 20, 107, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     };
  //     try {
  //       await table.forEach((player) => {
  //         barChart.labels.push(player._id.name);
  //         barChart.datasets[0].data.push(player.cardTitle);
  //       });
  //       setbarChartDetails(barChart);
  //     } catch {
  //       console.log("err1");
  //     }

  //     const dataChart = {
  //       labels: [],
  //       datasets: [
  //         {
  //           data: [],
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.5)",
  //             "rgba(54, 162, 235, 0.5)",
  //             "rgba(255, 206, 86, 0.5)",
  //             "rgba(75, 192, 192, 0.5)",
  //             "rgba(153, 102, 255, 0.5)",
  //             "rgba(255, 159, 64, 0.5)",
  //             "rgba(39, 186, 46, 0.5)",
  //             "rgba(8, 20, 107, 0.5)",
  //             "rgba(8, 20, 107, 0.5)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //             "rgba(39, 186, 46,1)",
  //             "rgba(8, 20, 107, 1)",
  //             "rgba(8, 20, 107, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     };
  //     try {
  //       await table.forEach((player) => {
  //         dataChart.labels.push(player._id.name);
  //         accu.push(player.cardTitle);
  //       });
  //       let sum = accu.reduce((partial_sum, a) => partial_sum + a, 0);
  //       let percentageSum = [];
  //       accu.forEach((percent) => {
  //         percentageSum.push(`${((percent / sum) * 100).toFixed(2)}`);
  //       });
  //       dataChart.datasets[0].data = percentageSum;
  //       setdataChartDetails(dataChart);
  //     } catch {
  //       console.log("err1");
  //     }

  //     }
  //     setData(table);
  //   };

  //   getTable();
  // }, [setData, teamId, cardName, headerTitle]);

  let rank = 2;
  // ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="container pb-2">
      <PageHeader titleText="Stats Per Hour" />
      <div className="teamImg d-flex flex-row mb-2">
        <img src={`${apiImage}${teamImg.teamImage}`} alt="team" />
        <span>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
      {statsHour.length === 0 && (
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
      {statsHour.length > 0 && hero._id && (
        <div className="col-lg-4 col-12" id="cardTop">
          <ol className="statsList">
            <li
              className="statsHeroPerHour d-flex w-100"
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                })`,
              }}
            >
              <div className="statsInfo flex-fill">
                <div className="pos">1.</div>
                <Link to={`/players-stats/${hero._id.player_id}`} id="heroName">
                  {statsHour.length > 0 ? hero._id.name : ""}
                </Link>
                <div id="amount" className="flex-fill">
                  <div className="heroPerHour">Hours Played:</div>
                  <div className="heroPerHour ">{hero.hoursPlayed}</div>
                </div>
                <div id="amount" className="flex-fill">
                  <p className="heroPerHour m-0">Profit Per Hour:</p>
                  <p className="heroPerHour m-0">
                    {" "}
                    {statsHour.length > 0 ? hero.profitPerHour : ""}
                  </p>
                </div>
                <div id="amount" className="flex-fill">
                  <p className="heroPerHour m-0">Cashing Per Hour:</p>
                  <p className="heroPerHour m-0">
                    {" "}
                    {statsHour.length > 0 ? hero.cashingPerHour : ""}
                  </p>
                </div>
              </div>
              <div className="heroImagePerHour">
                <Link to={`/players-stats/${hero._id.player_id}`} id="heroName">
                  <img
                    src={
                      statsHour.length > 0 ? `${apiImage}${hero._id.image}` : ""
                    }
                    alt=""
                  />
                </Link>
              </div>
            </li>

            <li className="statsHeaderPerHour d-flex w-100 justify-content-between">
              <div>Rank</div>
              <div>Image</div>
              <div>Player</div>
              <div>Hours Played</div>
              <div>Profit Per Hour</div>
              <div>Cashing Per Hour</div>
            </li>
            {statsHour.map((player) => (
              <li className="statsRow">
                <div className="rowPosPerHour">{rank++}.</div>
                <Link
                  className="rowImagePerHour"
                  to={`/players-stats/${player._id.player_id}`}
                >
                  <img
                    src={
                      statsHour.length > 0
                        ? `${apiImage}${player._id.image}`
                        : ""
                    }
                    alt=""
                  />
                </Link>
                <div className="rowNamePerHour">
                  {statsHour.length > 0 ? player._id.name : ""}
                </div>
                <div className="rowHours">
                  {statsHour.length > 0 ? player.hoursPlayed : ""}
                </div>
                <div
                  className={
                    player.profitPerHour > 0
                      ? "rowProfitPerHour text-success"
                      : "rowProfitPerHour text-danger"
                  }
                >
                  {statsHour.length > 0 ? player.profitPerHour : ""}
                </div>
                <div className="rowProfitPerHour">
                  {statsHour.length > 0 ? player.cashingPerHour : ""}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default StatsPerHourCard;
