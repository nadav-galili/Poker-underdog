import React, { useState, useEffect } from "react";
import sideBetsService from "../../services/sideBetsService";
import { apiImage } from "../../config.json";
import { AiOutlineArrowRight } from "react-icons/ai";

const SideBetsCard = ({ teamId }) => {
  const [approvedSideBets, setApprovedSideBets] = useState([]);
  useEffect(() => {
    async function getApprovedSideBets() {
      const { data: approvedSideBets } =
        await sideBetsService.getAllApprovedSideBets(teamId);
      setApprovedSideBets(approvedSideBets);
      console.log("approvedSideBets", approvedSideBets);
    }
    getApprovedSideBets();
  }, []);
  return (
    <div className="">
      {approvedSideBets.length > 0 && (
        <div className="sideBetContainer vsContainer">
          <p className="pt-3 ps-3 bg-white totalProfitNewCard ">Side Bets</p>
          <div className=" d-flex justify-content-around">
            <div className="sideBetPlayerOne">
              <div className="leaderImageSmall mx-auto">
                <img
                  src={`${apiImage}${approvedSideBets[0].masterPlayer.image}`}
                  alt="leader"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="sideBetPlayerTwo">
              <div className="leaderImageSmall mx-auto">
                <img
                  src={`${apiImage}${approvedSideBets[0].slavePlayer.image}`}
                  alt="leader"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly">
            <div className="playerOneStats">
              <p>{approvedSideBets[0].masterPlayer.nickName}</p>
            </div>
            <div className="vsDatak text-center">
              <p>VS</p>
              <p>Bet Sum:{approvedSideBets[0].sideBetSum}</p>
              <p>
                Start Date:
                {new Date(approvedSideBets[0].startDate).toLocaleDateString(
                  "en-US"
                )}
              </p>
              <p>
                End Date:
                {new Date(approvedSideBets[0].endDate).toLocaleDateString(
                  "en-US"
                )}
              </p>
            </div>
            <div className="playerTwoStats">
              <p>{approvedSideBets[0].slavePlayer.nickName}</p>
            </div>
          </div>
        </div>
      )}
      <p className="bg-white fullTable">
        View Full Table <AiOutlineArrowRight />
      </p>
    </div>
  );
};

export default SideBetsCard;
