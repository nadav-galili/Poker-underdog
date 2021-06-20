import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import teamService from "../services/teamService";
import userService from "../services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class CreateTeam extends Form {
  state = {
    data: { name: "", players: [], teamImage: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(2).label("Team Name"),
    players: Joi.array().required(),
    teamImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  async componentDidMount() {
    //const { user } = this.props;
    console.log(this.props);
    //if (!user) window.location.reload();
    const { data } = this.state;

    let player = await userService.getUserDetails();
    // if (!player) window.location.reload();
    delete player.data.password;
    data.players.push(player.data);
    this.setState({ data });
  }

  doSubmit = async () => {
    const { data } = this.state;
    if (!data.teamImage) delete data.teamImage;
    await teamService.createTeam(this.state.data);
    toast("A new Team is opened");
    this.props.history.replace("/my-teams");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Team Registration Form" />
        <div className="row">
          <div className="col-12">
            <p>Start a new team</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("name", "Team Name")}
              {this.renderInput("teamImage", "Team Image")}
              {this.renderButton("Create Team")}
              <Link className="btn btn-secondary mt-3 ms-3" to="/my-teams">
                Do it later
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTeam;
