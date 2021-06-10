import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class Signup extends Form {
  state = {
    data: { email: "", password: "", name: "", userImage: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
    userImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  doSubmit = async () => {
    const { data } = this.state;

    try {
      console.log("$", data);
      if (!data.userImage) delete data.userImage;
      console.log("aff", data);
      await http.post(`${apiUrl}/users`, data);
      toast("A new acoount is opened");
      await userService.login(data.email, data.password);
      window.location = "/create-team";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container">
        <PageHeader titleText="User Registration Form" />
        <div className="row">
          <div className="col-12">
            <p>You can open a new account for free!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "*Email", "email")}
              {this.renderInput("password", "*Password", "password")}
              {this.renderInput("name", "*Name")}
              {this.renderInput(
                "userImage",
                "Image (Optional)-Please enter url for your image"
              )}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
