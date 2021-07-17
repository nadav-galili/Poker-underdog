import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import { toast } from "react-toastify";

class EditPlayer extends Form {
  state = {
    data: {
      name: "",
      userImage: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(2).max(255).required(),
    userImage: Joi.string().min(11).max(1024).uri().allow(""),
  };
  async componentDidMount() {
    const { data } = await userService.getUserDetails();

    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(player) {
    return {
      _id: player._id,
      name: player.name,
      userImage: player.userImage,
    };
  }

  doSubmit = async () => {
    const { data } = this.state;

    await userService.editUserDetails(data);
    toast("User is updated");
    this.props.history.replace(`/my-stats/${data._id}`);
  };

  handleCancel = () => {
    this.props.history.push("/my-teams");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Edit Player Form" />
        <div className="row">
          <div className="col-12">
            <p>Edit your player details here</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("name", "Player Name")}
              {/* {this.renderInput("players", "Players")} */}
              {this.renderInput("userImage", "Player Image")}
              {this.renderButton("Update Player")}
              <button
                className="btn-lg btn-secondary ms-4 "
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

export default EditPlayer;
