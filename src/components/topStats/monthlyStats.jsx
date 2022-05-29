import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import teamService from "../../services/teamService";
import PageHeader from "../common/pageHeader";
import { Line } from "react-chartjs-2";
import NewMonthCard from "./newMonthCard";
import _ from "lodash";

const MonthlyStats = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [teamImg, setTeamImg] = useState("");
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);
  const [chartDates, setChartDates] = useState([]);
  const [chartProfitsByPlayer, setChartProfitsByPlayer] = useState([]);
  const [profits, setProfits] = useState([]);
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
      setDataByMonth(dataBySeperateMonth);

      let dates = await gameService.monthlyByPlayer(teamId);
      setChartProfitsByPlayer(dates.data);

      let chartDates = [];
      try {
        await dataByMonth.forEach((e) =>
          chartDates.push(
            new Date(e.month).toLocaleString("en-US", { month: "short" })
          )
        );
      } catch {
        console.log("errr");
      }

      let teamPic = await teamService.getTeam(teamId);
      setTeamImg(teamPic.data);

      table = table.filter(
        (month) => month._id.monthPlayed === currentMonthNumber
      );
      let myHero = table.shift();
      setHero(myHero);
      setData(table);

      setChartDates(chartDates);
      console.log("dd", dataByMonth);
      console.log("kk", chartProfitsByPlayer);

      setProfits(chartProfitsByPlayer);
    };

    getTable();
  }, [
    setData,
    teamId,
    currentMonthNumber,
    monthlyStats.length,
    dataByMonth.length,
    chartProfitsByPlayer.length,
  ]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "player profit by month",
      },
    },
  };

  let chartProfits = {};
  chartProfits.labels = chartDates;
  chartProfits.datasets = [];
  profits.forEach((e) => {
    chartProfits.datasets.push({
      label: e[0],
      data: e[2],
      fill: false,
      backgroundColor: "white",
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  });
  console.log("chartProfits", chartProfits);

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
      <div className="line-chart">
        <Line data={chartProfits} options={options} />
      </div>
    </div>
  );
};

export default MonthlyStats;
