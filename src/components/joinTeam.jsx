import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import teamService from "../services/teamService";
import userService from "../services/userService";
import { Redirect, Link } from "react-router-dom";

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
      //get user details from token
      let user = await userService.getCurrentUser();
      //get full user details
      user = await userService.getUserDetails();
      //add the team id to the user in db
      user.data.teams.push(team.data._id);
      console.log(user.data);
      await userService.editUserDetails(user.data);

      delete user.data.password;
      //add the user details to team in db
      await team.data.players.push(user.data);
      await teamService.editTeam(team.data);
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
              <Link
                type="button"
                className="btn btn-secondary mt-3 ms-3"
                to="/my-teams"
              >
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinTeam;
