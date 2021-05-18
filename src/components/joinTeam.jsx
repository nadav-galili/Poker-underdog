import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import teamService from "../services/teamService";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class JoinTeam extends Form {
  state = {
    data: { teamNumber: "" },
    errors: {},
  };

  schema = {
    teamNumber: Joi.string().required().min(6).max(6).label("Team Number"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    const team = await teamService.getTeamByNumber(data.teamNumber);
    // console.log(team);
    let user = await userService.getCurrentUser();
    user = await userService.getUserDetails();
    // console.log("u", user.data);
    await team.data[0].players.push(user.data);
    console.log("team after:", team);
    await user.data.teams.push(team.data[0]._id);
    console.log("user", user);

    // if (!data.teamImage) delete data.teamImage;
    // await teamService.createTeam(this.state.data);

    // this.props.history.replace("/my-teams");
  };

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="container">
        <PageHeader titleText="Join an existing team" />
        <div className="row">
          <div className="col-12">
            <p>Please enter team number</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="PUT">
              {this.renderInput("teamNumber", "Team Number")}
              {this.renderButton("Join Team")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinTeam;
