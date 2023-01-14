import React, { useState, useEffect } from "react";
import ClockSpinner from "../clockSpinner";
import gameService from "../../../services/gameService";
import { apiImage } from "../../../config.json";
import PageHeader from "../../common/pageHeader";

const NewStatsCard = (props) => {
  const [cardData, setCardData] = useState([]);
  const [cardHeader, setCardHeader] = useState("");
  const [leaderData, setLeaderData] = useState([]);
  const [data, setData] = useState([]);
  const [headerDetails, setHeaderDetails] = useState([]);

  useEffect(() => {
    async function getCardData() {
      const teamId = props.match.params.teamId;
      const query = new URLSearchParams(props.location.search);
      const stats = query.get("stats");
      const cardTitle = query.get("cardTitle");
      let dataParam = query.get("data");
      setData(dataParam.split(","));
      let leaderParam = query.get("leaderData");
      setLeaderData(leaderParam.split(","));
      let headerData = query.get("headerData");
      setHeaderDetails(headerData.split(","));
      let month = query.get("month");
      const { data: cardStats } = await gameService.getCardStats(
        teamId,
        stats,
        month
      );
      setCardData(cardStats);
      setCardHeader(cardTitle);
    }
    getCardData();
  }, []);

  return (
    <div className="statsCardContainer py-3">
      {cardData.length === 0 && (
        <div className="my-5 py-5">
          <ClockSpinner />
        </div>
      )}
      {cardData.length > 0 && (
        <div className="statsDashboard pb-3">
          <div className="ps-3">
            <PageHeader titleText={cardHeader} />
          </div>
          <div className="mx-3 newCardContainer">
            <div className="newLeaderContainer d-flex justify-content-around">
              <div className="leaderImage m-3">
                <img src={`${apiImage}${cardData[0]._id.image}`} alt="leader" />
              </div>
              <div className="leaderDetail pe-4">
                <p>1.</p>
                <p className="leaderName">{cardData[0]._id.name}</p>
                <p className="leaderProfit">
                  {leaderData[0]}: <span>{cardData[0][data[0]]}</span>
                </p>
                <p className="">
                  {leaderData[1]}: {cardData[0][data[1]]}
                </p>
                <p className="">
                  {leaderData[2]}:{cardData[0][data[2]]}
                </p>
                <p className="">
                  {leaderData[3] && (
                    <p className="p-0">
                      {leaderData[3]}:{cardData[0][data[3]]}
                    </p>
                  )}
                </p>
                <p className="">
                  {leaderData[4] && (
                    <p className="p-0">
                      {leaderData[4]}:{cardData[0][data[4]]}
                    </p>
                  )}
                </p>
              </div>
            </div>
            <ul start="2" className="bg-white m-0  p-0 listPlayers">
              <li className="text-primary  d-flex">
                <div className="ms-2 fixedHeader d-flex justify-content-around">
                  <p>Rank</p>
                  <p>Image</p>
                  <p className="headerName">Player</p>
                </div>
                <div className="dynamicStatsCardHeader  d-flex justify-content-between">
                  <p>{headerDetails[0]}</p>
                  <p>{headerDetails[1]}</p>
                  <p>{headerDetails[2]}</p>
                  <p>{headerDetails[3]}</p>
                  <p>{headerDetails[4]}</p>
                </div>
              </li>
              {cardData.slice(1).map((card, index) => (
                <li className="d-flex">
                  <div className="ms-2 fixedPlayerStats d-flex justify-content-around">
                    <p className="rank text-center">{index + 2}.</p>
                    <div className="ms-2 listPlayerStats my-1">
                      <img src={`${apiImage}${card._id.image}`} alt="" />
                    </div>
                    <p className="ms-1 listPlayersName">{card._id.name}</p>
                  </div>
                  <div className="dynamicStatsCard d-flex justify-content-between">
                    <p className="text-bold">{card[data[0]]}</p>
                    <p>{card[data[1]]}</p>
                    <p>{card[data[2]]}</p>
                    <p className="thirdList">{card[data[3]]}</p>
                    <p>{card[data[4]]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewStatsCard;
