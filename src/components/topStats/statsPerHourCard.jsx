import React, { useEffect, useState } from "react";
import gameService, { statsPerHour } from "../../services/gameService";
import teamService from "../../services/teamService";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";
import PageHeader from "../common/pageHeader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";

const StatsPerHour = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const [teamImg, setTeamImg] = useState("");
  const [dataChartDetails, setdataChartDetails] = useState({});
  const [barChartDetails, setbarChartDetails] = useState({});
  const teamId = props.match.params.teamId;
  const cardName = props.match.params.cardName;

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

  //     let myHero = table.shift();

  //     let teamPic = await teamService.getTeam(teamId);
  //     setTeamImg(teamPic.data);

  //     switch (cardName) {
  //       case "avgProfit":
  //         setHeaderTitle("Average Profit");
  //         break;
  //       case "numOfGames":
  //         setHeaderTitle("Total Games");
  //         break;
  //       case "avgCashing":
  //         setHeaderTitle("Average  Cashing");
  //         break;
  //       case "gamesWithProfit":
  //         setHeaderTitle("Games W/ Profit");
  //         break;
  //       default:
  //         setHeaderTitle("Total Profit");
  //     }
  //     setHero(myHero);
  //     setData(table);
  //   };

  //   getTable();
  // }, [setData, teamId, cardName, headerTitle]);
  // let rank = 2;
  // ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <p className="text-white">work</p>
  //   <div className="container pb-4">
  //     <PageHeader titleText={headerTitle} />
  //     <div className="teamImg d-flex flex-row mb-2">
  //       <img src={`${apiImage}${teamImg.teamImage}`} alt="" />
  //       <span>{new Date().toLocaleDateString("en-GB")}</span>
  //     </div>
  //     {data.length === 0 && (
  //       <div className="spinner pt-2">
  //         <SpinnerInfinity
  //           size={130}
  //           thickness={151}
  //           speed={70}
  //           color="rgba(252, 252, 252, 1)"
  //           secondaryColor="rgba(108, 20, 180, 1)"
  //           enabled={data.length === 0 ? true : false}
  //         />
  //       </div>
  //     )}

  //     {data.length > 0 && (
  //       <div className="col-lg-3 col-12" id="cardTop">
  //         <ol className="statsList">
  //           <li
  //             className="statsHero d-flex w-100"
  //             style={{
  //               backgroundImage: `url(${
  //                 process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
  //               })`,
  //             }}
  //           >
  //             <div className="statsInfo flex-fill">
  //               <div className="pos">1.</div>
  //               <Link to={`/players-stats/${hero._id.player_id}`} id="heroName">
  //                 {data.length > 0 ? hero._id.name : ""}
  //               </Link>
  //               <div id="amount" className="flex-fill">
  //                 {data.length > 0 ? hero.cardTitle : ""}
  //               </div>
  //             </div>
  //             <div className="heroImage">
  //               <Link to={`/players-stats/${hero._id.player_id}`} id="heroName">
  //                 <img
  //                   src={data.length > 0 ? `${apiImage}${hero._id.image}` : ""}
  //                   alt=""
  //                 />
  //               </Link>
  //             </div>
  //           </li>
  //           <React.Fragment>
  //             {data.map((player) => (
  //               <li className="statsRow" key={player._id.name}>
  //                 <div className="rowPos">{rank++}.</div>
  //                 <Link className="rowImage" to={`/players-stats/${player._id.player_id}`}>
  //                     <img
  //                       src={
  //                         data.length > 0
  //                           ? `${apiImage}${player._id.image}`
  //                           : ""
  //                       }
  //                       alt="player list row"
  //                     />
  //                 </Link>
  //                 <div className="rowName">
  //                   {data.length > 0 ? player._id.name : ""}
  //                 </div>
  //                 <div
  //                   className={
  //                     player.cardTitle > 0
  //                       ? "rowProfit text-success"
  //                       : "rowProfit text-danger"
  //                   }
  //                 >
  //                   {data.length > 0 ? player.cardTitle : ""}
  //                 </div>
  //               </li>
  //             ))}
  //           </React.Fragment>
  //         </ol>
  //         {headerTitle !== "Average Profit" && headerTitle !== "Total Profit" && (
  //           <React.Fragment>
  //             <h4 className="text-white justify-content-center d-flex">
  //               {headerTitle} In %
  //             </h4>
  //             <Doughnut data={dataChartDetails} className="mb-3 pb-3" />
  //           </React.Fragment>
  //         )}
  //         <Bar data={barChartDetails} className="mb-3" />
  //       </div>
  //     )}
  //   </div>
  );
};

export default statsPerHour;
