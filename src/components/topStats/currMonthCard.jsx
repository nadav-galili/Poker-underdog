import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import teamService from "../../services/teamService";
import PageHeader from "../common/pageHeader";
import { Bar } from "react-chartjs-2";

const CurrMonthCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [teamImg, setTeamImg] = useState("");
  const [barChartDetails, setbarChartDetails] = useState({});

  let currentMonth = new Date();
  let currentMonthNumber = currentMonth.getMonth() + 1;
  currentMonth = currentMonth.toLocaleString("en-US", { month: "long" });

  const teamId = props.match.params.teamId;

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.monthsData(teamId);
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

      table = table.filter(
        (month) => month._id.monthPlayed === currentMonthNumber
      );
      let myHero = table.shift();
      setHero(myHero);
      setData(table);
    };

    getTable();
  }, [setData, teamId, currentMonthNumber]);

  let rank = 2;

  return (
    <div className="container pb-3">
      <PageHeader titleText={`${currentMonth} ${new Date().getFullYear()}`} />
      <div className="teamImg d-flex flex-row mb-2">
        <img src={`${apiImage}${teamImg.teamImage}`} alt="" />
        <span>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
      <div className="col-lg-4 col-12" id="cardTop">
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
              <div id="amount" className="flex-fill">
                {data.length > 0 ? hero.totalProfit : ""}
              </div>
            </div>
            <div className="heroImage ">
              <img
                src={data.length > 0 ? `${apiImage}${hero._id.image}` : ""}
                alt="hero"
              />
            </div>
          </li>
          <React.Fragment>
            {data.map((player) => (
              <li className="statsRow d-flex" key={player._id.name}>
                <div className="rowPos">{rank++}.</div>
                <div className="rowImage">
                  <img
                    src={
                      data.length > 0 ? `${apiImage}${player._id.image}` : ""
                    }
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
        {barChartDetails.datasets && (
          <Bar data={barChartDetails} className="mb-3" />
        )}
      </div>
    </div>
  );
};

export default CurrMonthCard;
