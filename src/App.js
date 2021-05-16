import React, { Component } from "react";
import "../src/css/main.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import TeamSignup from "./components/teamSignup";
import CreateTeam from "./components/createTeam";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoutes";
import MyTeams from "./components/myTeams";
import editTeam from "./components/editTeam";
import EditTeam from "./components/editTeam";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: 900 }}>
          <Switch>
            <ProtectedRoute
              path="/my-teams/edit/:teamId"
              component={EditTeam}
            />
            <ProtectedRoute path="/my-teams" component={MyTeams} />
            <ProtectedRoute path="/create-team" component={CreateTeam} />
            <Route path="/teamSignup" component={TeamSignup} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
