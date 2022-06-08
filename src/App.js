import React, { useEffect, useState } from "react";
import "../src/css/main.css";
import Footer from "./components/footer";
import Home from "./components/home";
import SideNavbar from "./components/sideNavbar";
import Signin from "./components/signin";
import Logout from "./components/logout";
import EditUser from "./components/forms/editUser";
import { Switch, Route, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoutes";
import MyTeams from "./components/myTeams";
import EditPlayer from "./components/editPlayer";
import EditTeam from "./components/editTeam";
import SelectPlayers from "./components/selectPlayers";
import JoinTeam from "./components/joinTeam";
import MainTable from "./components/mainTable";
import Demo from "./components/demo";
import About from "./components/about";
import MyStats from "./components/personalStats/myStats";
import CardTable from "./components/topStats/cardTable";
import SuccessCard from "./components/topStats/successCard";
import CurrMonthCard from "./components/topStats/currMonthCard";
import ProfitsCard from "./components/topStats/profitsCard";
import SignUp from "./components/forms/signUp";
import NewGame from "./components/games/newGame";
import GameEnd from "./components/gameEnd";
import H2hTable from "./components/h2h/h2hTable";
import TeamSignUp from "./components/forms/teamSignUp";
import EditGames from "./components/games/editGames";
import PlayerStats from "./components/personalStats/playerStats";
import StatsPerHourCard from "./components/topStats/statsPerHourCard";
import MonthlyStats from "./components/topStats/monthlyStats";
import sidebetsMain from "./components/sidebets/sidebetsMain";
import Test from "./components/notification/test";
import { Notifications } from "react-push-notification";

import ReactGA from "react-ga";

ReactGA.initialize("G-MPD41JDBPV");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const [user, setUser] = useState({});
  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const me = await userService.getCurrentUser();
      setUser(me);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const me = await userService.getUserDetails();
      setDetails(me.data);
    };
    fetchUser();
  }, []);

  // console.log(details);
  const style = {
    minHeight: 780,
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <Notifications />

      <header>
        <SideNavbar
          user={user}
          details={details}
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
        />
      </header>
      <main style={style} className="main">
        <HashRouter user={user}>
          <Switch>
            <ProtectedRoute path="/my-stats/edit/:id" component={EditPlayer} />
            <ProtectedRoute
              path="/my-stats/edit_player/:id"
              component={EditUser}
              user={user}
            />
            <ProtectedRoute
              path="/my-stats/:id"
              component={MyStats}
              user={user}
            />

            <ProtectedRoute
              path="/my-teams/edit/:teamId"
              component={EditTeam}
            />
            <ProtectedRoute
              path="/my-teams"
              component={MyTeams}
              user={user}
              d={details}
            />
            <ProtectedRoute
              path="/create-team"
              user={user}
              component={TeamSignUp}
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
            <ProtectedRoute path="/edit-games/:teamId" component={EditGames} />

            <ProtectedRoute path="/games/:gameId" component={NewGame} />
            <ProtectedRoute path="/last-game/:teamId" component={GameEnd} />
            <ProtectedRoute path="/tables/h2h/:teamId" component={H2hTable} />
            <ProtectedRoute path="/main-table/:teamId" component={MainTable} />
            <ProtectedRoute
              path="/tables/success/:teamId"
              component={SuccessCard}
            />
            <ProtectedRoute
              path="/tables/monthlyStats/:year/:currentMonth/:teamId"
              component={CurrMonthCard}
            />
            <ProtectedRoute
              path="/tables/monthlyStats/:teamId"
              component={MonthlyStats}
            />
            <ProtectedRoute
              path="/tables/profits/top-ten/:teamId"
              component={ProfitsCard}
            />
            <ProtectedRoute
              path="/tables/:cardName/:teamId"
              component={CardTable}
            />
            <ProtectedRoute path="/players-stats/:id" component={PlayerStats} />
            <ProtectedRoute
              path="/stats-per-hour/:teamId"
              component={StatsPerHourCard}
            />
            <ProtectedRoute
              path="/side-bets/:teamId"
              component={sidebetsMain}
            />
            <Route path="/test" component={Test} />

            <Route path="/demo" component={Demo} />
            <Route path="/about" component={About} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={SignUp} user={user} />
            {/* <Route path="/sign-up" component={SignUp} user={user} /> */}

            <Route exact path="/" component={Home} user={user} d={details} />
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
