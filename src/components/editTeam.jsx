import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import teamService from "../services/teamService";
import { toast } from "react-toastify";

class EditTeam extends Form {
  state = {
    data: {
      name: "",
      players: [],
      teamImage: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(2).max(255).required(),
    players: Joi.array().required(),
    teamImage: Joi.string().min(11).max(1024).uri().allow(""),
  };
  async componentDidMount() {
    const teamId = this.props.match.params.teamId;
    const { data } = await teamService.getTeam(teamId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(team) {
    return {
      _id: team._id,
      name: team.name,
      players: team.players,
      teamImage: team.teamImage,
    };
  }

  doSubmit = async () => {
    const { data } = this.state;
    await teamService.editTeam(data);
    toast("Team is updated");
    this.props.history.replace("/my-teams");
  };

  handleCancel = () => {
    this.props.history.push("/my-teams");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Edit Team Form" />
        <div className="row">
          <div className="col-12">
            <p>Fill out team details here</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("name", "Team Name")}
              {/* {this.renderInput("players", "Players")} */}
              {this.renderInput("teamImage", "Team Image")}
              {this.renderButton("Update Team")}
              <button
                className="btn btn-secondary ms-3 "
                onClick={this.handleCancel}
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

export default EditTeam;
