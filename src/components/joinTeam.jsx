import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import teamService from "../services/teamService";
import userService from "../services/userService";
import { Link } from "react-router-dom";

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
    return (
      <div className="container">
        <PageHeader titleText="Join an existing team" />
        <div className="row">
          <div className="col-12" id="joinText">
            <p>
              <strong>Please enter team number</strong> <br />
              *Ask team members for the number
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-8">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="PUT">
              {this.renderInput("teamNumber", "Team Number")}
              <div className="d-flex justify-content-between">
                {this.renderButton("Join Team")}
                <Link
                  type="button"
                  className="btn btn-secondary joinB"
                  to="/my-teams"
                >
                  Not right now
                </Link>
              </div>
            </form>
            <p className="mt-2 join">*To join a demo team, enter:976991</p>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinTeam;
