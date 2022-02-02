import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import teamService from "../../services/teamService";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";
import PageHeader from "../common/pageHeader";
import { Bar } from "react-chartjs-2";

const SuccessCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [teamImg, setTeamImg] = useState("");
  const [barChartDetails, setbarChartDetails] = useState({});
  const teamId = props.match.params.teamId;

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.successp(teamId);
      table = table.data;

      let teamPic = await teamService.getTeam(teamId);
      setTeamImg(teamPic.data);

      const barChart = {
        labels: [],
        datasets: [
          {
            label: `Success %  By Player`,
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
          barChart.datasets[0].data.push(player.successPercentage);
        });
        setbarChartDetails(barChart);
      } catch {
        console.log("err1");
      }

      let myHero = table.shift();

      setHero(myHero);
      setData(table);
    };

    getTable();
  }, [setData, teamId]);

  let rank = 2;

  return (
    <div className="container pb-4">
      <PageHeader titleText="Success %" />
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
      {data.length > 0 && (
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
                  {data.length > 0 ? hero._id.name : ""}
                </a>

                <div id="amount" className="flex-fill">
                  {data.length > 0 ? hero.successPercentage + " %" : ""}
                </div>
              </div>
              <div className="heroImage ">
                <img
                  src={data.length > 0 ? `${apiImage}${hero._id.image}` : ""}
                  alt=""
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
                      alt="playr list row"
                    />
                  </div>
                  <div className="rowName">
                    {data.length > 0 ? player._id.name : ""}
                  </div>
                  <div className="rowProfitSuccess">
                    {data.length > 0 ? player.successPercentage + " %" : ""}
                  </div>
                </li>
              ))}
            </React.Fragment>
          </ul>
          <Bar data={barChartDetails} className="mb-3 pb-3" />
        </div>
      )}
    </div>
  );
};

export default SuccessCard;
