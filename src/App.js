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
import EditPlayer from "./components/editPlayer";
import EditTeam from "./components/editTeam";
import SelectPlayers from "./components/selectPlayers";
import JoinTeam from "./components/joinTeam";
// import Game from "./components/game";
import LastGame from "./components/lastGame";
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
// import {Container, Row, Col, Input, Button} from "reactstrap";
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

  const style = {
    minHeight: 900,
  };
  return (
  
    <React.Fragment>
    
      <ToastContainer />
  
      <header>
        <Navbar user={user} details={details} />
      </header>
      <main style={style} className="main">
        <HashRouter user={user}>
          <Switch>
            <ProtectedRoute
              path="/my-stats/edit/:id"
              component={EditPlayer}
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

            <ProtectedRoute path="/games/:gameId" component={NewGame} />

            <ProtectedRoute path="/last-game/:teamId" component={GameEnd} />
            <ProtectedRoute path="/main-table/:teamId" component={MainTable} />
            <ProtectedRoute path="/tables/success/:teamId" component={SuccessCard} />
            <ProtectedRoute path="/tables/byMonths/:currMonth/:teamId" component={CurrMonthCard} />
            <ProtectedRoute path="/tables/profits/top-ten/:teamId" component={ProfitsCard} />    
            <ProtectedRoute path="/tables/:cardName/:teamId" component={CardTable} />
         


            <Route path="/demo" component={Demo} />
            <Route path="/about" component={About} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={SignUp} user={user} />


            <Route path="/sign-up" component={SignUp} user={user} />

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
