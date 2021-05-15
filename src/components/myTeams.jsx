import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import teamService from "../services/teamService";
import Team from "./team";

class MyTeams extends Component {
  state = {
    teams: [],
  };

  async componentDidMount() {
    const { data } = await teamService.getMyTeam();
    if (data.length > 0) this.setState({ teams: data });
  }
  render() {
    const { teams } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="My Teams Page" />
        <div className="row">
          <div className="col-12">
            <p>Your teams in the list below...</p>
          </div>
        </div>
        <div className="row">
          {teams.length > 0 &&
            teams.map((team) => <Team key={team._id} team={team} />)}
        </div>
      </div>
    );
  }
}

export default MyTeams;
