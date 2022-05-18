import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import { apiImage } from "../config.json";
const Home = () => {
  return (
    <section>
      <div className="container pt-3">
        <PageHeader titleText="Poker-Underdog" />
        <div className="row home">
          <div className="col-12 col-md-6 homeText" id="homeText">
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
              <Link to="/signup" id="create">
                Create A New Account For Free
              </Link>
            </p>
            <p>Already registerd?</p>
            <p>
              <Link to="/my-teams" id="join">
                Pick a team and start a new game...ALL IN!
              </Link>
            </p>
          </div>
          <div className="col-md-3 col-12" id="homeImg">
            <div className="homeImg1">
              <img src={`${apiImage}images/flying_cards.jpg`} alt="poker" />
            </div>
            <div className="homeImg2">
              <img
                src="https://www.telegraph.co.uk/content/dam/betting/Better-Collective/8-Classic-xlarge.jpg"
                alt="poker-cards"
              />
            </div>
          </div>
        </div>
        {/* <div className="col-md-3 col-12 text-primary ">
        <div className="vh-25 wh-25">
              <img
                src={ process.env.PUBLIC_URL + "/demo/dash3.JPG"}
                alt="poker-cards"
              />
            </div>
            </div> */}
      </div>
    </section>
  );
};

export default Home;
