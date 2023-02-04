import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import PageHeader from "../common/pageHeader";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import ClockSpinner from "./clockSpinner";

const ByMonthsDashboard = (props) => {
    const teamId = props.match.params.teamId;
    // const [wholeYear, setWholeYear] = useState({});
    const params = new URLSearchParams(window.location.pathname);
    const seasonDates = params.get("seasonDates");
    console.log("🚀 ~ file: byMonthsDashboard.jsx:14 ~ ByMonthsDashboard ~ seasonDates", seasonDates);
    const [monthsStats, setMonthsStats] = useState([]);
    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString("en-US", { month: "long" });
    };

    useEffect(() => {
        async function getAllMonthsStats() {
            const { data: allGamesByMonth } = await gameService.getStatsByMonth(teamId, seasonDates);
            console.log("🚀 ~ file: byMonthsDashboard.jsx:12 ~ getAllMonthsStats ~ allGamesByMonth", allGamesByMonth);
            setMonthsStats(allGamesByMonth);
        }
        getAllMonthsStats();
    }, []);

    return (
        <div className="container pb-5">
            <PageHeader titleText="Stats By Months" />
            {monthsStats.length > 0 && (
                <div className="row">
                    {monthsStats.map((month) => (
                        <div className="col-4">
                            <div className="smallCardContainer">
                                <p className="text-center pt-2 bg-white newSmallCard">{getMonthName(month._id)}</p>
                                <div className="col-12 profitCard">
                                    <div className="Small">
                                        <div className="leaderImageSmall mx-auto">
                                            <img
                                                src={`${apiImage}${month.players[0].image}`}
                                                alt="leader"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="leaderDetailSmall d-flex  flex-column text-center mt-1">
                                            <p className="leaderName">1.{month.players[0].name}</p>
                                            <p className="leaderProfit">
                                                Total Profit: <span>{month.players[0].totalProfit}</span>
                                            </p>
                                            <p className="">Total Games: {month.players[0].totalGames}</p>
                                            <p className="">Avg Cashing: {month.players[0].roundedAvgCashing}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="bg-white fullTable">
                                    <Link
                                        className="linkToNewCard"
                                        to={`/newMainTable/newStatsCard/${teamId}/?month=${
                                            month._id
                                        }&stats=getThisMonthStats&cardTitle=${getMonthName(
                                            month._id
                                        )} Stats&data=totalProfit,totalGames,avgCashing&leaderData=Total Profit, Total Games, Avg Cashing&&headerData=TP,TG,AC`}
                                    >
                                        View Full Table <AiOutlineArrowRight />
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* <PageHeader titleText="Stats By Months" />
            {wholeYear.length === 0 && <ClockSpinner />}
            {wholeYear.length > 0 && wholeYear[0].length > 0 && (
                <div className="row">
                    {wholeYear.map((month) => (
                        <div className="col-4">
                            <div className="smallCardContainer">
                                <p className="text-center pt-2 bg-white newSmallCard">
                                    {new Date(month[0].monthPlayed).toLocaleDateString("en-US", {
                                        month: "long",
                                    })}
                                </p>
                                <div className="col-12 profitCard">
                                    <div className="Smalll">
                                        <div className="leaderImageSmall mx-auto">
                                            <img
                                                src={`${apiImage}${month[0]._id.image}`}
                                                alt="leader"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="leaderDetailSmall d-flex  flex-column text-center mt-1">
                                            <p className="leaderName">1.{month[0]._id.name}</p>
                                            <p className="leaderProfit">
                                                Total Profit: <span>{month[0].totalProfit}</span>
                                            </p>
                                            <p className="">Total Games: {month[0].totalGames}</p>
                                            <p className="">Avg Cashing: {month[0].avgCashing}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="bg-white fullTable">
                                    <Link
                                        className="linkToNewCard"
                                        to={`/newMainTable/newStatsCard/${teamId}/?month=${
                                            month[0].monthPlayed
                                        }&stats=getThisMonthStats&cardTitle=${new Date(
                                            month[0].monthPlayed
                                        ).toLocaleDateString("en-US", {
                                            month: "long",
                                        })} Stats&data=totalProfit,totalGames,avgCashing&leaderData=Total Profit, Total Games, Avg Cashing&&headerData=TP,TG,AC`}
                                    >
                                        View Full Table <AiOutlineArrowRight />
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default ByMonthsDashboard;
