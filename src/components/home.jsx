import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";
const Home = (props) => {
  return (
    <section>
      <div className="container pt-3">
        <PageHeader titleText="Poker-Underdog" />
        <div className="row">
          <div className="col">
            <p className="mt-4">
              Poker Underdog is an interactive platform for poker groups playing
              together home games.
            </p>
            <p className="mt-4">
              In this app you can keep scores for your games and display
              statistics for the whole group or individual stats.
            </p>
            <p className="mt-4">
              You can open or join as many groups as you like and stay updated
              on each group individually and all these features are FREE!
            </p>

            <p>
              Join us now and <br />
              <Link to="/signup">Create A New Account For Free</Link>
            </p>
            <p>Already registerd?</p>
            <p>
              <Link to="/my-teams">
                Pick a team and start a new game...ALL IN!
              </Link>
            </p>
          </div>
          <div className="col">
            <img
              src="https://neconnected.co.uk/wp-content/uploads/2021/03/vcs_should_invest_like_poker_player-bf365a82-1280x640.jpg"
              alt=""
              style={{ height: 250, width: 250 }}
            />
            <img
              src="https://www.telegraph.co.uk/content/dam/betting/Better-Collective/8-Classic-xlarge.jpg"
              alt=""
              style={{ height: 250, width: 300 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
