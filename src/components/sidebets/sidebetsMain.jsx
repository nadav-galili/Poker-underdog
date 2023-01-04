import React, { useState, useEffect } from "react";
import PageHeader from "../common/pageHeader";
import sideBetsService from "../../services/sideBetsService";
import { Link } from "react-router-dom";
import SideBetsVsCard from "./sideBetsVsCard";

const SidebetsMain = (props) => {
  const [approvedSideBets, setApprovedSideBets] = useState([]);

  const teamId = props.match.params.teamId;
  useEffect(() => {
    const getSideBets = async () => {
      const sideBets = await sideBetsService.getAllApprovedSideBets(teamId);
      setApprovedSideBets(sideBets.data);
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
        {approvedSideBets.length > 0 &&
          approvedSideBets.map((sideBet) => (
            <SideBetsVsCard sideBets={sideBet} key={sideBet._id} />
          ))}
        <p className="credit">
          <a href="https://www.freepik.com/vectors/dual">
            Dual vector created by starline - www.freepik.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SidebetsMain;
