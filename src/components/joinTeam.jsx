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
    teamNumber: Joi.string().required().min(6).max(60).label("Team Number"),
  };

  doSubmit = async () => {
    const { data } = this.state;

    const d = await teamService.getTeamByNumber(data.teamNumber);
    d.data[0].players.push("f22");
    console.log(d.data[0]);
    console.log("id", d.data[0]._id);
    console.log(d.data[0].players);
    await teamService.editTeam(d.data[0]);
    // if (!data.teamImage) delete data.teamImage;
    // await teamService.createTeam(this.state.data);

    // this.props.history.replace("/my-teams");
  };

  render() {
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
              {this.renderButton("Create Team")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinTeam;
