import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import { Redirect, Link } from "react-router-dom";

class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      //let details = await userService.getCurrentUser();

      window.location = "/";

      // setTimeout(() => {
      //   this.props.history.replace(`/#/my-stats/${details._id}`);
      // }, 5000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container-fluid">
        <PageHeader titleText="Sign-In to Poker Underdog" />
        <div className="row">
          <div className="col-12">
            <p>You can sign-in here with your account!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign-In")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
