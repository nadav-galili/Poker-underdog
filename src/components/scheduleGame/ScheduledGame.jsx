import React, { useState, useEffect } from "react";

import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import teamService from "../../services/teamService";
import userService from "../../services/userService";
import scheduleGameService from "../../services/scheduleGameService";

const SchedulaGame = (props) => {
  const teamId = props.match.params.teamId;
  console.log("teamId", teamId);
  const [team, setTeam] = useState({});
  const [game, setGame] = useState({}); // [
  console.log("dd", team);
  useEffect(() => {
    const getTeam = async () => {
      const { data: team } = await teamService.newGetTeam(teamId);
      setTeam(team);
    };
    getTeam();

    const getLatestScheduleGame = async () => {
      const { data: scheduleGame } =
        await scheduleGameService.getLatestScheduleGame(teamId);
      console.log("scheduleGame", scheduleGame);
      setGame(scheduleGame);
    };
    getLatestScheduleGame();
  }, []);

  return (
    //put team image here
    <div className="container pb-3">
      <PageHeader titleText="Scheduled Games" />
      <div className="row">
        <div className="col-12 col-lg-6">
          {game.length > 0 && (
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h3 class="card-title goldFont justify-content-center">
                  Date: {new Date(game[0].gameDate).toLocaleDateString()}
                </h3>
                <h5 className="text-center">
                  Host:
                  <div className="hostDetails text-primary d-flex flex-column justify-content-center">
                    <Avatar
                      alt={game[0]?.host?.nickName}
                      src={`${apiImage}${game[0]?.host?.image}`}
                      className="mx-auto"
                    />
                    {game[0]?.host?.nickName}
                  </div>
                </h5>
              </div>
              <p class="card-text text-success">
                <b>Players approved:</b>
              </p>
              <ul class="list-group list-group-flush">
                {game[0]?.guests?.map((guest) => {
                  if (guest.guestAnswer === "Yes") {
                    return (
                      <li class="list-group-item d-flex align-items-center">
                        <Avatar
                          alt={guest.nickName}
                          src={`${apiImage}${guest.image}`}
                        />
                        {guest.nickName}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <p class="card-text text-danger">
                <b>Players declined:</b>
              </p>
              <ul class="list-group list-group-flush">
                {game[0]?.guests?.map((guest) => {
                  if (guest.guestAnswer === "Yes") {
                    return (
                      <li class="list-group-item d-flex align-items-center">
                        <Avatar
                          alt={guest.nickName}
                          src={`${apiImage}${guest.image}`}
                        />
                        {guest.nickName}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <div class="card-body">
                <a href="#" class="card-link">
                  Card link
                </a>
                <a href="#" class="card-link">
                  Another link
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulaGame;
