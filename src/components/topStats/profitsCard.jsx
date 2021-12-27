import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import teamService from "../../services/teamService";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const ProfitsCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [teamImg, setTeamImg] = useState("");
  const [dataChartDetails, setdataChartDetails] = useState({});

  const teamId = props.match.params.teamId;
  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.profits(teamId);
      table = table.data;

      let aggregatedProfits = await gameService.agg_profits(teamId);
      aggregatedProfits = aggregatedProfits.data;

      let accu = [];
      const dataChart = {
        labels: [],
        datasets: [
          {
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
        await aggregatedProfits.forEach((player) => {
          dataChart.labels.push(player._id.name);
          accu.push(player.totalProfit);
        });
        let sum = accu.reduce((partial_sum, a) => partial_sum + a, 0);
        let percentageSum = [];
        accu.forEach((percent) => {
          percentageSum.push(`${((percent / sum) * 100).toFixed(2)}`);
        });
        dataChart.datasets[0].data = percentageSum;
        setdataChartDetails(dataChart);
      } catch (error) {
        console.log(error, "err1");
      }

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
  }, [teamId]);

  let rank = 2;
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="container  pb-4">
      <PageHeader titleText="Top 10 Profits" />
      <div className="teamImg d-flex flex-row mb-2">
        <img src={`${apiImage}${teamImg.teamImage}`} alt="" />
        <span>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
      <div className="col-lg-3 col-12" id="cardTop">
        <ul className="statsList ">
          <li
            className="statsHero d-flex w-100"
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
        <h7 className="text-white justify-content-center d-flex">
          Players Profit In % From Top 10 Profits
        </h7>
        {dataChartDetails.hasOwnProperty('labels')?<Doughnut data={dataChartDetails} className="mb-3 pb-3"/>:""}
      </div>
    </div>
  );
};

export default ProfitsCard;
