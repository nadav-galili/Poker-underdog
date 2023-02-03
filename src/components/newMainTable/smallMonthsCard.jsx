import React, { useState, useEffect } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const SmallMonthsCard = ({ teamId, seasonDates }) => {
    const [monthsStats, setMonthsStats] = useState([]);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const d = new Date();
    const monthIndex = d.getMonth();
    const monthName = monthNames[monthIndex];
    // console.log("🚀 ~ file: smallMonthsCard.jsx:24 ~ SmallMonthsCard ~ teamId", seasonDates);
    useEffect(() => {
        async function getCardStats() {
            const { data: allGamesByMonth } = await gameService.getStatsByMonth(teamId, seasonDates);
            // console.log("🚀 ~ file: smallMonthsCard.jsx:24 ~ getCardStats ~ cardStats", allGamesByMonth);
            setMonthsStats(allGamesByMonth);
        }
        getCardStats();
    }, [seasonDates]);

    return (
        <>
            {monthsStats.length > 0 && (
                <div className="smallCardContainer">
                    <p className="text-center pt-2  newSmallCard">Stats By Months 💵</p>
                    <div className="col-12 profitCard">
                        <div className="Small">
                            <div className="leaderImageSmall mx-auto">
                                <img
                                    src={`${apiImage}${monthsStats[0].players[0].image}`}
                                    alt="leader"
                                    className="mt-1"
                                />
                            </div>

                            <div className="extraHeaderSmall text-center">
                                <span>{monthName}</span>
                            </div>

                            <div className="leaderDetailSmall d-flex  flex-column text-center mt-1">
                                <p className="leaderName">1.{monthsStats[0].players[0].name}</p>
                                <p className="leaderProfit">
                                    Total Profit: <span>{monthsStats[0].players[0].totalProfit}</span>
                                </p>
                                <p className="">Avg Profit: {monthsStats[0].players[0].roundedAvgProfit}</p>
                                <p className="">Total Games:{monthsStats[0].players[0].totalGames}</p>
                                <p className="">Avg Cashing: {monthsStats[0].players[0].roundedAvgCashing}</p>
                            </div>
                        </div>
                    </div>
                    <ol start="2" className="bg-white m-0 p-0  secondPlayerSmall">
                        <li className="d-flex flex-row py-1">
                            2.
                            <div className="secondPlayerImage ">
                                <img src={`${apiImage}${monthsStats[0].players[1].image}`} alt="" />
                            </div>
                            <span className="mx-1">{monthsStats[0].players[1].name}- </span>
                            Profit
                            <span className="mx-1 playersNewProfit">{monthsStats[0].players[1].totalProfit}</span>{" "}
                            <p className="smallCardLastDetail">
                                {" "}
                                AP
                                {monthsStats[0].players[1].roundedAvgProfit}
                            </p>
                        </li>
                        <li className="d-flex flex-row py-1">
                            3.
                            <div className="secondPlayerImage ">
                                <img src={`${apiImage}${monthsStats[0].players[2].image}`} alt="" />
                            </div>
                            <span className="mx-1">{monthsStats[0].players[2].name}- </span>
                            Profit
                            <span className="mx-1 playersNewProfit">{monthsStats[0].players[2].totalProfit}</span>{" "}
                            <p className="smallCardLastDetail">
                                {" "}
                                AP
                                {monthsStats[0].players[2].roundedAvgProfit}
                            </p>
                        </li>
                    </ol>
                    <p className="bg-white fullTable">
                        <Link className="linkToNewCard" to={`/newMainTable/newByMonths/${teamId}`}>
                            View Full Table <AiOutlineArrowRight />
                        </Link>
                    </p>
                </div>
            )}
        </>
    );
};

export default SmallMonthsCard;
