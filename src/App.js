import React, { useEffect, useState } from "react";
import "../src/css/main.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import CreateTeam from "./components/createTeam";
import { Switch, Route, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoutes";
import MyTeams from "./components/myTeams";
import EditTeam from "./components/editTeam";
import SelectPlayers from "./components/selectPlayers";
import JoinTeam from "./components/joinTeam";
import Game from "./components/game";
import LastGame from "./components/lastGame";
import MainTable from "./components/mainTable";
import Demo from "./components/demo";
import About from "./components/about";
import MyStats from "./components/personalStats/myStats";

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      const me = await userService.getCurrentUser();
      setUser(me);
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const me = await userService.getUserDetails();
  //     setUser(me);
  //   };
  //   fetchUser();
  // }, []);

  const [user, setUser] = useState({});
  const style = {
    minHeight: 900,
    //backgroundImage: `url(${process.env.PUBLIC_URL + "background1.jpg"})`,
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <header>
        <Navbar user={user} />
      </header>
      <main style={style} className="main">
        <HashRouter>
          <Switch>
            <ProtectedRoute
              path="/my-stats/:id"
              component={MyStats}
              user={user}
            />
            <ProtectedRoute
              path="/my-teams/edit/:teamId"
              component={EditTeam}
            />
            <ProtectedRoute path="/my-teams" component={MyTeams} />
            <ProtectedRoute
              path="/create-team"
              user={user}
              component={CreateTeam}
            />
            <ProtectedRoute
              path="/new-game/:teamId"
              component={SelectPlayers}
            />
            <ProtectedRoute
              path="/join-team"
              component={JoinTeam}
              user={user}
            />

            <ProtectedRoute path="/game" component={Game} />

            <ProtectedRoute path="/last-game/:teamId" component={LastGame} />
            <ProtectedRoute path="/main-table/:teamId" component={MainTable} />

            <Route path="/demo" component={Demo} />
            <Route path="/about" component={About} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} user={user} />
            <Route exact path="/" component={Home} user={user} />
          </Switch>
        </HashRouter>
      </main>

      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default App;
