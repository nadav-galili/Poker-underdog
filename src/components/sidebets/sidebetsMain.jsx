import React, { useState, useEffect } from "react";
import PageHeader from "../common/pageHeader";
import sideBetsService from "../../services/sideBetsService";
import { Link } from "react-router-dom";
import SideBetsVsCard from "./sideBetsVsCard";
import { SpinnerCircular } from "spinners-react";
const SidebetsMain = (props) => {
  const [approvedSideBets, setApprovedSideBets] = useState("No side Bets");
  const [dismissedSideBets, setDismissedSideBets] = useState("No side Bets");

  const teamId = props.match.params.teamId;
  useEffect(() => {
    const getSideBets = async () => {
      const sideBets = await sideBetsService.getAllApprovedSideBets(teamId);
      setApprovedSideBets(sideBets.data);
      const dismissedSideBets = await sideBetsService.getAllDismissedSideBets(
        teamId
      );
      setDismissedSideBets(dismissedSideBets.data);
    };
    getSideBets();
  }, []);

  return (
    <div className="container">
      <PageHeader titleText="Side Bets" />
      <div className="container d-flex justify-content-center">
        <Link to={`/side-bets/new-sidebet/${props.match.params.teamId}`}>
          <div className="btn btn-primary my-3">Create a new side bet</div>
        </Link>
      </div>
      <div className="sideBetCard">
        <p className="text-primary text-center my-2">
          {approvedSideBets == "No side Bets yet" ? approvedSideBets : ""}
        </p>
        <div className="d-flex justify-content-center">
          {approvedSideBets == "No side Bets" && (
            <SpinnerCircular
              size={130}
              thickness={151}
              speed={81}
              color="rgba(108, 20, 180, 1)"
              secondaryColor="rgba(252, 252, 252, 1)"
              enabled={true}
            />
          )}
        </div>

        {Array.isArray(approvedSideBets) &&
          approvedSideBets.map((sideBet) => (
            <>
              <p className="text-center goldText mt-4 ">
                Bet Sum: {sideBet.sideBetSum}💰
              </p>
              <div className="sideBetDates d-flex justify-content-between">
                <p className="text-white">
                  Start Date:{" "}
                  {new Date(sideBet.startDate).toLocaleDateString("en-GB")}
                </p>
                <p className="text-white">
                  End Date:{" "}
                  {new Date(sideBet.endDate).toLocaleDateString("en-GB")}
                </p>
              </div>
              <SideBetsVsCard sideBets={sideBet} key={sideBet._id} />
              <p className="credit">
                <a href="https://www.freepik.com/vectors/dual">
                  Dual vector created by starline - www.freepik.com
                </a>
              </p>
            </>
          ))}
        {Array.isArray(dismissedSideBets) &&
          dismissedSideBets.map((sideBet) => (
            <div className="dismissed p-4">
              <p className="text-primary text-center">Dismissed Bets</p>
              <ul>
                <li className="text-danger">
                  Offered By: {sideBet.masterPlayer.nickName} at:
                  {new Date(sideBet.createdAt).toLocaleDateString("en-GB")}, Sum
                  :{sideBet.sideBetSum}💰<br></br> dismissed by{" "}
                  {sideBet.slavePlayer.nickName} :
                  {new Date(
                    sideBet.slavePlayer.dissmissDate
                  ).toLocaleDateString("en-GB")}
                </li>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SidebetsMain;
