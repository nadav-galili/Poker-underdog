import React from "react";
import { Link } from "react-router-dom";

const Team = ({ team }) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img className="p-2" src={team.teamImage} alt={team.name} width="100" />
        <div className="card-body">
          <h5 className="card-title">{team.name}</h5>
          <p className="card-text">Team Number:{team.teamNumber}</p>
          <p className="card-text border-top pt-2">
            Created At:{team.created_at}
          </p>
          <Link to={`/my-teams/edit/${team._id}`}>Edit</Link> |
          <Link className="ml-2" to={`/my-teams/delete/${team._id}`}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Team;
