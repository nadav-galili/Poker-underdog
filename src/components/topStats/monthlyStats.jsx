import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import teamService from "../../services/teamService";
import PageHeader from "../common/pageHeader";
import { Bar } from "react-chartjs-2";
import NewMonthCard from "./newMonthCard";
import _ from "lodash";

const MonthlyStats = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [teamImg, setTeamImg] = useState("");
  const [barChartDetails, setbarChartDetails] = useState({});
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);
  let currentMonth = new Date();
  let currentMonthNumber = currentMonth.getMonth() + 1;
  currentMonth = currentMonth.toLocaleString("en-US", { month: "long" });

  const teamId = props.match.params.teamId;

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.monthsData(teamId);
      table = table.data;
      const monthlyStatsGroup = await gameService.monthlyStats(
        props.match.params.teamId
      );
      setMonthlyStats(monthlyStatsGroup.data);

      let dataBySeperateMonth = _.chain(monthlyStats)
        //https://stackoverflow.com/questions/23600897/using-lodash-groupby-how-to-add-your-own-keys-for-grouped-output
        // Group the elements of Array based on `monthPlayed` property
        .groupBy("_id.monthPlayed")
        // `key` is group's name (monthPlayed), `value` is the array of objects
        .map((value, key) => ({ month: key, players: value }))
        .value();
      console.log("dataBySeperateMonth", dataBySeperateMonth);
      setDataByMonth(dataBySeperateMonth);
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
  }, [setData, teamId, currentMonthNumber, monthlyStats.length]);

  return (
    <div className="container pb-3">
      <PageHeader titleText="Total Profit By Months" />
      <div className="teamImg d-flex flex-row mb-2">
        <img src={`${apiImage}${teamImg.teamImage}`} alt="" />
        <span>{new Date().toLocaleDateString("en-GB")}</span>
      </div>
      <div className="byMonth text-primary row ">
        {dataByMonth.length > 0 &&
          dataByMonth.map((month) => (
            <div className="col-6">
              <NewMonthCard month={month} team={teamImg} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MonthlyStats;
