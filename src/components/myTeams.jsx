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
          <div className="col-12">
            <p className="my-2">
              <Link className="btn btn-primary ms-2" to="/create-team">
                +Add Team
              </Link>
            </p>
            {teams.length > 0 && <p>Your teams in the list below</p>}
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
