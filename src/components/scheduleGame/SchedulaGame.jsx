import React, { useState, useEffect } from "react";

import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import teamService from "../../services/teamService";
import userService from "../../services/userService";
import scheduleGameService from "../../services/scheduleGameService";

const SchedulaGame = (props) => {
  return (
    //put team image here
    <div className="container pb-3">
      <PageHeader titleText="Schedule Game" />
    </div>
  );
};

export default SchedulaGame;
