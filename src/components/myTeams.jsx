import React from "react";
import PageHeader from "./common/pageHeader";

const MyTeam = () => {
  return (
    <div className="container mt-5">
      <PageHeader titleText="My Teams Page" />
      <div className="row">
        <div className="col-12 teams">
          <p>Here you can create a new team or join an existing team</p>
          <p>Your teams in the list below...</p>

          <div className="team-buttons">
            <button type="button" class="btn btn-primary btn-lg">
              Open a new team
            </button>
            <button type="button" class="btn btn-primary btn-lg">
              Join a team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
