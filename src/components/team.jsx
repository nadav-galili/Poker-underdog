import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiImage } from "../config.json";
import { GiCardKingClubs } from "react-icons/gi";
import { IoMdStats } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import gameService from "../services/gameService";
import teamService from "../services/teamService";
import Avatar from "@material-ui/core/Avatar";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CashingDetails from "./games/cashingDetails";

const Team = ({ team, removeTeam, teamid, user, teamNumber }) => {
  const [livePlayers, setLivePlayers] = useState([]);
  const [liveGame, setliveGame] = useState({});
  const [buttons, setButtons] = useState(false);
  let captain = team.players.filter((e) => e._id === team.user_id);

  useEffect(() => {
    const getLiveGame = async () => {
      let game = await gameService.inProgress(teamid);
      game = await game.data[0];
      setliveGame(game);
      game ? setLivePlayers(game.players) : setLivePlayers([]);
      if (game && (game.isOpen || game.isOpen == null))
        game = game.players.sort((a, b) => b.cashing - a.cashing);
    };

    getLiveGame();
  }, []);

  const displayRemoveButtons = () => {
    setButtons(!buttons);
  };

  const removePlayerFromTeam = async (teamNumber, playerId, teamId) => {
    Swal.fire({
      title: "Are you sure you want to remove this player from team?",
      text: "you wont be able to cancel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await teamService.removePlayerFromTeam(teamNumber, playerId, teamid);
        window.location.reload();
        toast.success("Player removed from team:)", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  return (
    <div className=" col-12 col-md-6 col-lg-4 mt-3">
      <div className="card mb-3">
        <img
          className="p-2"
          src={`${apiImage}${team.teamImage}`}
          alt={team.name}
          width="100"
          height="100"
        />
        <div className="card-body pt-0">
          <h3 className="card-title ">
            <u className="text-primary">{team.name}</u>
          </h3>
          <p className="card-text info">
            <strong>
              <u>Team Number:</u>
              <span className="text-primary">{team.teamNumber}</span>
            </strong>
            <br />
            <span id="share">
              *Share this number with your friends and let them join your team
            </span>
          </p>
          <p className="mb-2">
            <b>
              <u className="text-dark ">Team Manager:</u>
              <span className="text-primary captain ">
                {captain[0].nickName}
              </span>
            </b>
          </p>
          {liveGame && (
            <div className="liveGames ">
              <Link
                className=""
                data-toggle="tooltip"
                data-placement="top"
                title="Only Team Manger can edit games details"
                to={`/games/${liveGame._id}`}
                takecontrol="yes"
              >
                Take Control Of Game
                <i className="ps-2 fas fa-angle-double-right"></i>
              </Link>
              <br></br>
              <span className="display-6 ">
                <u>Live Game</u>
              </span>
              <div className="col-12 border border-primary my-2" id="card-top">
                <ol className="statsList m-0">
                  <li
                    id="lastGameHero"
                    className="statsHero d-flex flex-column h-50"
                    style={{
                      backgroundImage: `url(${
                        process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                      })`,
                    }}
                  >
                    <p>Game No. {liveGame._id}</p>
                    <p>
                      {`${new Date(liveGame.createdAt).toLocaleDateString(
                        "en-GB",
                        { hour: "2-digit", minute: "2-digit", hour12: false }
                      )}`}
                    </p>
                    <div
                      className="stats d-flex w-75 justify-content-between"
                      id="lGame"
                    >
                      <p>Player</p>
                      <p>Name</p>
                      <p>Cashing</p>
                    </div>
                  </li>
                  {livePlayers &&
                    livePlayers.length > 1 &&
                    livePlayers.map((player) => (
                      <li className="statsRow" key={player.id} id="liveGameRow">
                        <div className="rowImage ms-5">
                          <img
                            src={
                              livePlayers.length > 0
                                ? `${apiImage}${player.image}`
                                : ""
                            }
                            alt="player list row"
                          />
                        </div>
                        <div className="rowName ms-4" id="lGameName">
                          {livePlayers.length > 1 ? player.name : ""}
                        </div>
                        <div className="rowCashing">
                          {livePlayers.length > 1 ? player.cashing : ""}
                        </div>
                      </li>
                    ))}
                </ol>
                {liveGame._id && (
                  <CashingDetails gameId={liveGame._id} updated={liveGame} />
                )}
              </div>
            </div>
          )}
          <div className="teamBtns d-flex flex-column w-75 ">
            <Link
              className="button-72 p-2"
              data-toggle="tooltip"
              data-placement="top"
              to={`/main-table/${team._id}`}
            >
              Team Tables & Stats
              <IoMdStats className="ms-2" />
              <i className="ps-2 fas fa-angle-double-right"></i>
            </Link>
            {captain[0]._id === user._id && (
              <div className="d-flex flex-column">
                {/* <Link
                  className="button-75 mt-2 "
                  to={`/edit-games/${team._id}`}
                  teamId={team._id}
                  title="Only Team Manger can edit games details"
                >
                  Edit Games
                  <AiFillEdit color="white" className="ms-1" />
                  <i className="ps-2 fas fa-angle-double-right"></i>
                </Link> */}
                <button
                  type="button"
                  className="btn btn-outline-danger mt-2 w-75"
                  onClick={() => displayRemoveButtons()}
                >
                  <AiFillEdit color="red" className="ms-1" />
                  Remove Players From Team
                </button>
              </div>
            )}
          </div>

          <div className="card-text ">
            <strong>
              <u>Players:</u>
            </strong>
            <ul className="row  ps-0" id="playersList">
              {team.players.map((player) => (
                <li
                  key={player._id}
                  className="col-3 col-lg-3 teams "
                  id="playerAvatar"
                >
                  <p id="playerPersonalInfo">{player.nickName}</p>

                  <Avatar
                    src={`${apiImage}${player.image}`}
                    alt={player.name}
                  />

                  {captain[0]._id === user._id &&
                    buttons &&
                    player._id !== captain[0]._id && (
                      <p
                        className="text-danger  text-wrap mb-2"
                        onClick={() =>
                          removePlayerFromTeam(teamNumber, player._id, teamid)
                        }
                      >
                        <i className="fas fa-trash-alt "></i>
                        remove player from team
                      </p>
                    )}
                </li>
              ))}
            </ul>
          </div>
          {!liveGame && (
            <Link className="mb-2 button-71" to={`/new-game/${team._id}`}>
              Start a new game
              <GiCardKingClubs className="ms-2" />
              <i className="ps-2 fas fa-angle-double-right"></i>
            </Link>
          )}

          <p className="card-text border-top pt-2">
            Created At:{new Date(team.createdAt).toLocaleDateString("en-GB")}
          </p>
          <p className="text-primary">
            <Link onClick={removeTeam} to="/my-teams" className="text-danger">
              <i className="fas fa-trash-alt me-2"></i>
              Delete Team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
