import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiImage } from "../config.json";
import { GiCardKingClubs } from "react-icons/gi";
import { IoMdStats } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import gameService from "../services/gameService";

const Team = ({ team, removeTeam, teamId, user }) => {

  const [livePlayers, setLivePlayers] = useState([]);
  const [liveGame, setliveGame] = useState({});
  let captain = team.players.filter((e) => e._id === team.user_id);

  useEffect(() => {
    const getLiveGame = async () => {
      let game = await gameService.inProgress(teamId);
      game = await game.data[0];
      setliveGame(game);
      game ? setLivePlayers(game.players) : setLivePlayers([]);
      if (game && game.isOpen)
        game = game.players.sort((a, b) => b.cashing - a.cashing);
    };

    getLiveGame();
  }, [teamId]);
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
                      <li className="statsRow" key={player.id}>
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
              </div>
            </div>
          )}
          <div className="teamBtns d-flex flex-column w-75 pb-3">
            <Link
              className="btn btn-primary mb-3 "
              data-toggle="tooltip"
              data-placement="top"
              title="Only Team Manger can edit games details"
              to={`/main-table/${team._id}`}
            >
              Team Tables & Stats
              <IoMdStats className="ms-2" />
              <i className="ps-2 fas fa-angle-double-right"></i>
            </Link>
            {captain[0]._id === user._id && (
              <Link
                className="btn btn-secondary py-1 m-0 w-75 "
                to={`/edit-games/${team._id}`}
                teamId={team._id}
              >
                Edit Games
                <AiFillEdit color="white" className="ms-1" />
                <i className="ps-2 fas fa-angle-double-right"></i>
              </Link>
            )}
          </div>

          <div className="card-text ">
            <strong>
              <u>Players:</u>
            </strong>
            <ul className="row ps-0" id="playersList">
              {team.players.map((player) => (
                <li
                  key={player._id}
                  className="col-4 col-lg-4 teams"
                  id="playerAvatar"
                >
                  {player.nickName}
                  <br></br>
                  <img
                    src={`${apiImage}${player.image}`}
                    alt="user"
                    className="mb-2"
                  />
                </li>
              ))}
            </ul>
          </div>
          <Link className="btn mb-2" to={`/new-game/${team._id}`}>
            Start a new game
            <GiCardKingClubs className="ms-2" />
            <i className="ps-2 fas fa-angle-double-right"></i>
          </Link>
          <p className="card-text border-top pt-2">
            Created At:{new Date(team.createdAt).toLocaleDateString("en-GB")}
          </p>
          {/* <p className="text-primary">
            <Link to={`/my-teams/edit/${team._id}`}>
              <i className="fas fa-edit me-2 "></i>
              Edit
            </Link>
          </p> */}
          <p className="text-primary">
            <Link onClick={removeTeam} to="/my-teams">
              <i className="fas fa-trash-alt me-2"></i>
              Delete
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
