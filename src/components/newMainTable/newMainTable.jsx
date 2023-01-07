import React, { useState, useEffect } from "react";
import _ from "lodash";
import teamService from "../../services/teamService";
import { apiImage } from "../../config.json";
// import gameService from "../services/gameService";
// import userService from "../services/userService";
// import sideBetsService from "../services/sideBetsService";

import PageHeader from "../common/pageHeader";

const NewMainTable = (props) => {
  const teamId = props.match.params.teamId;
  const [team, setTeam] = useState({});

  useEffect(() => {
    async function getTeam() {
      const { data: team } = await teamService.newGetTeam(teamId);
      console.log(team);
      setTeam(team);
    }
    getTeam();
  }, []);

  return (
    <div className="container">
      <PageHeader
        className="mb-0"
        titleText={new Date().getFullYear() + " Top Stats"}
      />
      {!_.isEmpty(team) && (
        <div className="logoContainer d-flex justify-content-center">
          <div className="teamLogo">
            <img src={`${apiImage}${team.teamImage}`} alt="" />
            <span>sdsd</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMainTable;
