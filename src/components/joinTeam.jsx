import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import teamService from "../services/teamService";
import userService from "../services/userService";
// import { Redirect } from "react-router-dom";

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

    try {
      const team = await teamService.getTeamByNumber(data.teamNumber);
      let user = await userService.getCurrentUser();
      user = await userService.getUserDetails();
      console.log(user);
      await team.data.players.push(user.data);
      await teamService.editTeam(team.data);
      delete user.data._id;
      await user.data.teams.push(team.data._id);
      await userService.editUserDetails(user.data);
      this.props.history.push("/my-teams");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({
          errors: { teamNumber: "No team was found with this team number" },
        });
      }
    }
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
              <button
                type="button"
                className="btn btn-secondary mt-3 ms-3"
                to="my-teams"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinTeam;
