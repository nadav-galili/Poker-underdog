import React from "react";

const Team = ({ team }) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img className="p-2" src={team.teamImage} alt={team.name} width="100" />
        <div className="card-body">
          <h5 className="card-title">{team.name}</h5>
          <p className="card-text">lorem</p>
          <p className="card-text border-top pt-2">ipsum</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
