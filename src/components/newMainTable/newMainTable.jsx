import React, { useState, useEffect } from "react";
import _ from "lodash";
import ClockSpinner from "./clockSpinner";
import teamService from "../../services/teamService";
import gameServices from "../../services/gameService";
import { apiImage } from "../../config.json";

import AllGamesList from "./allGamesList";
import BigCard from "./bigCard";
import PageHeader from "../common/pageHeader";
import PlayersImages from "./playersImages";
import SmallCard from "./smallCard";
import SideBetsCard from "./sideBetsCard";
import TotalStatsForTeam from "./totalStatsForTeam";
import SeasonPick from "./seasonPick";

const NewMainTable = (props) => {
    const teamId = props.match.params.teamId;
    const [team, setTeam] = useState({});
    const [totalStats, setTotalStats] = useState({});
    const [seasonDates, setSeasonDates] = useState({});

    useEffect(() => {
        async function getTeam() {
            const { data: team } = await teamService.newGetTeam(teamId);
            setTeam(team);
        }
        getTeam();
        async function getTotalStatsForTeam() {
            const { data: totalStats } = await gameServices.getTotalStatsForTeam(teamId, seasonDates);
            console.log("🚀 ~ seaeson dates", seasonDates);
            setTotalStats(totalStats);
        }
        getTotalStatsForTeam();
    }, [seasonDates]);

    const updateSeasonDates = (startDate, endDate, seasonPick) => {
        startDate = startDate || `${seasonPick}-01-01`;
        const dates = { startDate, endDate };
        console.log("🚀 ~ file: newMainTable.jsx:46 ~ updateSeasonDates ~ dates", dates);
        setSeasonDates(dates);
    };

    return (
        <div className="container pb-3">
            <PageHeader className="mb-0" titleText={new Date().getFullYear() + " Top Stats"} />
            {_.isEmpty(totalStats) && <ClockSpinner />}

            {!_.isEmpty(team) && (
                <div className="teamDetails">
                    <div className="logoContainer d-flex justify-content-center ">
                        <div className="teamLogo">
                            <img src={`${apiImage}${team.teamImage}`} alt="" />
                        </div>
                    </div>
                    <p className="text-center mt-2" id="teamName">
                        {team.name}
                    </p>
                    <div className="playersImages my-2">
                        <div className="row">
                            {team.players.map((player) => (
                                <div
                                    className="col-2 playersImagesRounded d-flex justify-content-center"
                                    key={player._id}
                                >
                                    <PlayersImages player={player} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {!_.isEmpty(totalStats) && (
                <>
                    <TotalStatsForTeam totalStats={totalStats} />
                    <div className="odds text-center">
                        <a href="https://www.cardschat.com/poker/tools/poker-odds-calculator/" target="_blank">
                            Texas Odds Calculator
                        </a>
                    </div>

                    <SeasonPick teamId={teamId} updateSeasonDates={updateSeasonDates} />
                </>
            )}
            {totalStats == "No Games Played In These Dates" && <p className="text-center text-danger">{totalStats}</p>}
            {!_.isEmpty(totalStats) && Array.isArray(totalStats) && (
                <div className="playersCardsNew mt-3 pb-3">
                    <div className="row mx-2">
                        <BigCard
                            teamId={teamId}
                            cardTitle="Total Profit 💸"
                            stats="profitsStats"
                            data={["totalProfit", "totalGames", "gamesWithPlus", "avgProfit", "avgCashing"]}
                            playersData={["Total Profit", "TG", "GIP", "AP", "AC"]}
                            leaderData={["Profit", "Total Games", "Games In Plus", "Average Profit", "Average Cashing"]}
                            headerData={["P", "TG", "GIP", "AP", "AC"]}
                            seasonDates={seasonDates}
                        />
                        <div className="col-6 my-3">
                            <SmallCard
                                teamId={teamId}
                                cardTitle="Top 10 Profits 🔝"
                                stats="topTenProfits"
                                data={["profit", "date", "cashInHand", "cashing"]}
                                playersData={["P:", "D:", "CIN", "C"]}
                                leaderData={["Profit", "Date", "Cash In Hand", "Cashing"]}
                                headerData={["P", "D", "CIH", "C"]}
                                seasonDates={seasonDates}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <SmallCard
                                teamId={teamId}
                                cardTitle="Head To Head 👊"
                                stats="head2head"
                                data={["totalPoints", "totalGames", "avgPoints", "successPercentage"]}
                                playersData={["Points: ", "AP: ", "", ""]}
                                leaderData={["Total Points", "Total Games", "Avg Points", "Success %"]}
                                headerData={["TP", "TG", "AP", "SP %"]}
                                seasonDates={seasonDates}
                            />
                        </div>
                        <BigCard
                            teamId={teamId}
                            cardTitle="Hourly Stats ⏳"
                            stats="getHourlyStats"
                            data={["profitPerHour", "cashingPerHour", "hoursPlayed", "totalGames", "avgHourPerGame"]}
                            playersData={["Profit/H", "CPH", "HP", "TG", "AHPG"]}
                            leaderData={[
                                "Profit Per Hour",
                                "Cashing Per Hour",
                                "Hours Played",
                                "Total Games",
                                "Average Hour Per Game",
                            ]}
                            headerData={["P/H", "CPH", "HP", "TG", "AHPG"]}
                            seasonDates={seasonDates}
                        />
                        <div className="col-6 mt-3">
                            <SmallCard
                                teamId={teamId}
                                cardTitle="Stats By Months 💵"
                                stats="getStatsByMonth"
                                data={["totalProfit", "roundedAvgProfit", "numOfGames", "roundedAvgCashing"]}
                                playersData={["Profit: ", "AP: ", "", ""]}
                                leaderData={["Total Profit", "Avg Profit", "Total Games", "Avg Cashing"]}
                                extraHeader={
                                    !_.isEmpty(seasonDates)
                                        ? new Date(seasonDates.endDate).toLocaleString("default", {
                                              month: "long",
                                          })
                                        : new Date().toLocaleString("default", {
                                              month: "long",
                                          })
                                }
                                seasonDates={seasonDates}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <SmallCard
                                teamId={teamId}
                                cardTitle="Top 10 Comebacks"
                                stats="getTopComebacks"
                                data={["cashing", "profit", "date", "cash In Hand"]}
                                playersData={["Cashing: ", "P: ", "", ""]}
                                leaderData={["Cashing", "Profit", "Date", "Cash In Hand"]}
                                headerData={["C", "P", "D", "CIH"]}
                                seasonDates={seasonDates}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <SideBetsCard teamId={teamId} />
                        </div>
                        <div className="col-6 mt-3">
                            <SmallCard
                                teamId={teamId}
                                cardTitle="Winning Streak 🤫"
                                stats="getWiningStreak"
                                data={["maxWinStreak", "currWinStreak", "successPercentage", "won"]}
                                playersData={["MWS: ", "CWS: ", "", ""]}
                                leaderData={[
                                    "Max Win Streak",
                                    "Current Win Streak",
                                    "% Success",
                                    "Total Games In Plus",
                                ]}
                                headerData={["MWS", "CWS", "%S", "TGIP"]}
                                seasonDates={seasonDates}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <AllGamesList teamId={teamId} seasonDates={seasonDates} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewMainTable;
