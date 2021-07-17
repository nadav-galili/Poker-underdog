import React from "react";
import { Link } from "react-router-dom";

//import MainTable from "./mainTable";
// import SelectPlayers from "./selectPlayers";

const Team = ({ team, removeTeam }) => {
  const teamDate = new Date(team.created_at);
  const day = teamDate.getDate();
  const month = teamDate.getMonth() + 1;
  const year = teamDate.getFullYear();
  const formated = `${day}/${month}/${year}`;

  return (
    <div className=" col-10 col-md-6 col-lg-3 mt-3">
      <div className="card mb-3">
        <img
          className="p-2"
          src={team.teamImage}
          alt={team.name}
          width="100"
          height="100"
        />
        <div className="card-body">
          <h3 className="card-title ">
            <u>{team.name}</u>
          </h3>
          <p className="card-text">
            <strong>Team Number:{team.teamNumber}</strong>
            <br />
            *Share this number with your friends and let them join your team
          </p>
          <Link className="btn btn-primary" to={`/main-table/${team._id}`}>
            Team Tables & Statistics
          </Link>
          <div className="card-text ">
            <strong>
              <u>Players:</u>
            </strong>
            <ul className="row">
              {team.players.map((player) => (
                <li key={player._id} className="col-4">
                  {player.name}
                  <br></br>
                  <img src={player.userImage} width="70" alt="user" />
                </li>
              ))}
            </ul>
          </div>
          <Link className="btn mb-2" to={`/new-game/${team._id}`}>
            Start a new game
          </Link>
          <p className="card-text border-top pt-2">Created At:{formated}</p>
          <p>
            <Link to={`/my-teams/edit/${team._id}`}>
              <i className="fas fa-edit me-2 "></i>
              Edit
            </Link>
          </p>
          <p>
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
