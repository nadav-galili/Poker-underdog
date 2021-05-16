import React from "react";
import { Link } from "react-router-dom";

const Team = ({ team, removeTeam }) => {
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
          <p>
            <Link to={`/my-teams/edit/${team._id}`}>
              <i className="fas fa-edit ms-1"></i>
              Edit
            </Link>{" "}
          </p>
          <p>
            <i className="fas fa-trash-alt me-1 "></i>
            <button
              type="button"
              className="btn btn-danger"
              onClick={removeTeam}
            >
              Delete Team
            </button>
          </p>
          {/* <Link className="ml-2" to={`/my-teams/delete/${team._id}`}>
            <i className="fas fa-trash-alt me-1 "></i>
            Delete
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Team;
