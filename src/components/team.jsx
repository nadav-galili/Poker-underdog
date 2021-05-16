import React from "react";
import { Link } from "react-router-dom";
import SelectPlayers from "./selectPlayers";

const Team = ({ team, removeTeam }) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img
          className="p-2"
          src={team.teamImage}
          alt={team.name}
          width="100"
          height="100"
        />
        <div className="card-body">
          <h5 className="card-title">{team.name}</h5>
          <p className="card-text">Team Number:{team.teamNumber}</p>
          <p className="card-text">
            Players:
            {team.players.map((players) => {
              return players.name + ",";
            })}
          </p>
          <Link className="btn btn-info" to={`/new-game/${team._id}`}>
            Start a new game
          </Link>
          <p className="card-text border-top pt-2">
            Created At:{team.created_at}
          </p>
          <p>
            <Link to={`/my-teams/edit/${team._id}`}>
              <i className="fas fa-edit ms-1"></i>
              Edit
            </Link>
          </p>
          <p>
            <Link className="ml-2" onClick={removeTeam} to="/my-teams">
              <i className="fas fa-trash-alt me-1 "></i>
              Delete
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
