import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";

import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import teamService from "../../services/teamService";
import userService from "../../services/userService";
import scheduleGameService from "../../services/scheduleGameService";

const SchedulaGame = (props) => {
  const teamId = props?.match?.params?.teamId || props?.teamId;

  const [team, setTeam] = useState({});
  const [game, setGame] = useState({}); // [
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

  const captureScreen = () => {
    html2canvas(document.body).then((canvas) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], "screenshot.png", { type: "image/png" });
        if (navigator.share) {
          navigator
            .share({
              files: [file],
              title: "Check out this screenshot",
              text: "Here is a screenshot I wanted to share with you.",
              link: "https://example.com/screenshot.png",
            })
            .catch((err) => console.error("Error sharing:", err));
        }
      });
    });
  };

  return (
    //put team image here
    <div className="container pb-3">
      <PageHeader titleText="Scheduled Games" />
      <div className="row">
        <div className="col-12 col-lg-6">
          {game.length > 0 && (
            <div className="card">
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h3 className="card-title text-primary justify-content-center">
                  Date: {new Date(game[0].gameDate).toLocaleDateString()}
                </h3>
                <h5 className="text-center">
                  Host:
                  <div className="hostDetails goldFont d-flex flex-column justify-content-center">
                    <Avatar
                      alt={game[0]?.host?.nickName}
                      src={`${apiImage}${game[0]?.host?.image}`}
                      className="mx-auto"
                    />
                    {game[0]?.host?.nickName}
                  </div>
                </h5>
              </div>
              <p className="card-text text-success">
                <b>Players approved:</b>
              </p>
              <ul className="list-group list-group-flush">
                {game[0]?.guests?.map((guest) => {
                  if (guest.guestAnswer === "Yes") {
                    return (
                      <li
                        className="list-group-item d-flex align-items-center"
                        key={guest._id}
                      >
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
              <p className="card-text text-danger">
                <b>Players declined:</b>
              </p>
              <ul className="list-group list-group-flush">
                {game[0]?.guests?.map((guest) => {
                  if (guest.guestAnswer === "No") {
                    return (
                      <li
                        className="list-group-item d-flex align-items-center"
                        key={guest._id}
                      >
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
              <button
                className="btn btn-success"
                onClick={async () => captureScreen()}
              >
                share
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulaGame;
