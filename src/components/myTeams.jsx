import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import teamService from "../services/teamService";
import Team from "./team";
import { Link } from "react-router-dom";

class MyTeams extends Component {
  state = {
    teams: [],
  };

  async componentDidMount() {
    const { data } = await teamService.getMyTeam();
    if (data.length > 0) this.setState({ teams: data });
  }

  removeTeam = (teamId) => {
    let { teams } = this.state;
    teams = teams.filter((team) => team._id !== teamId);
    teamService.deleteTeam(teamId);
    this.setState({ teams });
  };
  render() {
    const { teams } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="My Teams Page" />
        <div className="row">
          <div className="col-12 ">
            <Link className="btn btn-primary ms-2" to="/create-team">
              +Add A New Team
            </Link>
            <Link className="btn btn-primary ms-2" to="/join-team">
              Join An Existing Team
            </Link>
            <p className="mt-3 team-list">
              {teams.length > 0 && <p>Your teams in the list below:</p>}
            </p>
          </div>
        </div>
        <div className="row">
          {teams.length > 0 &&
            teams.map((team) => (
              <Team
                key={team._id}
                team={team}
                removeTeam={() => this.removeTeam(team._id)}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default MyTeams;
