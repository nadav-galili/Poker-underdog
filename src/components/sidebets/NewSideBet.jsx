import React, { useEffect, useState } from "react";
import PageHeader from "../common/pageHeader";
import { Link } from "react-router-dom";
import MasterPlayer from "./MasterPlayer";
import userService from "../../services/userService";
import teamService from "../../services/teamService";

const NewSideBet = (props) => {
  const [user, setUser] = useState({});

  const teamId = props.match.params.teamId;
  useEffect(() => {
    const getSideBets = async () => {
      const me = await userService.getUserDetails();
      setUser(me.data);
      const teamForSideBet = await teamService.getTeamForSideBets(
        teamId,
        me.data._id
      );
    };

    getSideBets();
  }, []);
  return (
    <div className="container">
      <PageHeader titleText="New Side Bet" />
      <div className="d-flex justify-content-center"></div>
      <MasterPlayer user={user} />
      <p className="text-center text-primary">
        Choose a player to offer a side-bet
      </p>
      {/* ///! display team members */}
    </div>
  );
};

export default NewSideBet;
