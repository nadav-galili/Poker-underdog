import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  handleLogin = async (googleData) => {
    try {
      await userService.loginGoogle(
        googleData.profileObj.email,
        googleData.tokenId
      );

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
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
      <div className="container">
        <PageHeader titleText="Sign-In" />
        <div className="row">
          <div className="col-12">
            <p className="text-primary">
              You can sign-in here with your account!
            </p>
          </div>
        </div>
        <GoogleLogin
          clientId="310842465793-hdu8fm8luvho3qds0ce4chg9c3696d4d.apps.googleusercontent.com"
          onSuccess={this.handleLogin}
        />
        <div className="row">
          <div className="col-lg-3">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign-In")}
            </form>
            <p className="selectP mt-5">
              *you can try a demo account-
              <br />
              Email:test@test.com
              <br />
              Password:123456
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
