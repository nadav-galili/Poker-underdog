import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ClockSpinner from "../newMainTable/clockSpinner";
import _ from "lodash";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import teamService from "../../services/teamService";
import scheduleGameService from "../../services/scheduleGameService";

const SchedulaGame = (props) => {
  const teamId = props?.match?.params?.teamId || props?.teamId;

  const [team, setTeam] = useState({});
  const [game, setGame] = useState({});
  console.log("🚀 ~ file: ScheduledGame.jsx:18 ~ game:", game);
  const [host, setHost] = useState({});

  useEffect(() => {
    const getTeam = async () => {
      const { data: team } = await teamService.newGetTeam(teamId);
      setTeam(team);
    };
    getTeam();

    const getLatestScheduleGame = async () => {
      const { data: scheduleGame } =
        await scheduleGameService.getLatestScheduleGame(teamId);
      setGame(scheduleGame[0]);
    };
    getLatestScheduleGame();
  }, []);

  const updateHost = async () => {
    const hostId = host._id;
    const updateHost = await scheduleGameService.updateHost(game._id, hostId);
    if (updateHost.status === 200) {
      const saveBtn = document.querySelector(".btn-primary");
      saveBtn.classList.add("d-none");
      toast.success("Host updated successfully");
      setGame(updateHost.data);
    }
  };

  //onchange select option
  const changeHost = (e) => {
    let chosenHost = {};
    const hostId = e.target.value;
    if (hostId === "TBA") {
      chosenHost = { _id: "TBA", nickName: "TBA", image: "TBA" };
    } else {
      chosenHost = team.players.find((player) => player._id === hostId);
    }
    setHost(chosenHost);

    const saveBtn = document.querySelector(".btn-primary");
    saveBtn.classList.remove("d-none");
  };

  return (
    //put team image here
    <div className="container pb-3">
      <PageHeader titleText="Scheduled Games" />
      {_.isEmpty(game) && <ClockSpinner />}
      <div className="row">
        <div className="col-12 col-lg-6">
          {game && (
            <div className="card">
              <div
                className="logoContainer w-25 h-25 d-flex  mx-auto mt-2"
                id="logoContainer"
              >
                <img
                  src={`${apiImage}${team.teamImage}`}
                  className="card-img-top"
                  alt="teamLogo"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title text-primary justify-content-center mt-0">
                  Date: {new Date(game.gameDate).toLocaleDateString()}
                </h3>
                <h4 className="text-center">Host:</h4>
                <div className="hostDetails goldFont d-flex flex-column justify-content-center">
                  <Avatar
                    alt={game?.host?.nickName}
                    src={
                      game?.host?.nickName === "TBA"
                        ? `${apiImage}images/donkey.webp`
                        : `${apiImage}${game?.host?.image}`
                    }
                    className="mx-auto"
                    style={{ width: "4em", height: "4em" }}
                  />
                  {game?.host?.nickName === "TBA" ? (
                    <h5 className="text-center">Decide Later...</h5>
                  ) : (
                    <h5 className="text-center">{game?.host?.nickName}</h5>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  Change host:&nbsp;
                  <select name="host" id="host" onChange={changeHost}>
                    <option value="TBA">Decide later...</option>
                    {team.players &&
                      team.players.map((player) => (
                        <option key={player._id} value={player._id}>
                          {player.nickName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="d-flex justify-content-center mt-2 ">
                  <button
                    className="btn btn-primary d-none"
                    onClick={updateHost}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
              <p className="card-text text-success fw-bolder text-decoration-underline">
                Players approved:
              </p>
              <ul className="list-group list-group-flush">
                {game?.guests?.map((guest) => {
                  if (guest.guestAnswer === "Yes") {
                    return (
                      <li
                        className="list-group-item d-flex align-items-center justify-content-between "
                        key={guest._id}
                      >
                        {" "}
                        <span className="d-flex align-items-center">
                          ✅
                          <Avatar
                            alt={guest.nickName}
                            src={`${apiImage}${guest.image}`}
                            className="ms-2"
                          />
                          {guest.nickName}
                        </span>
                        <span>
                          {new Date(guest.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <p className="card-text text-danger  fw-bolder text-decoration-underline">
                <b>Players declined:</b>
              </p>
              <ul className="list-group list-group-flush">
                {game?.guests?.map((guest) => {
                  if (guest.guestAnswer === "No") {
                    return (
                      <li
                        className="list-group-item d-flex align-items-center justify-content-between "
                        key={guest._id}
                      >
                        <span className="d-flex align-items-center ">
                          ❌
                          <Avatar
                            alt={guest.nickName}
                            src={`${apiImage}${guest.image}`}
                            className="ms-2"
                          />
                          {guest.nickName}
                        </span>
                        <span>
                          {new Date(guest.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Link
        to={`/newMainTable/${team._id}`}
        className="button-77 py-2 my-2 d-block mx-auto text-center text-decoration-none text-white bg-primary col-6 col-md-4 col-lg"
        data-toggle="tooltip"
        data-placement="top"
      >
        Back to team page
      </Link>
    </div>
  );
};

export default SchedulaGame;
