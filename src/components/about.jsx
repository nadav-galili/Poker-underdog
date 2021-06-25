import React from "react";
import PageHeader from "./common/pageHeader";

const About = () => {
  return (
    <div className="container">
      <div className="row">
        <PageHeader titleText="About" />
        <h4 className="mt-4">
          My name is Nadav Galili, I developed Poker-Underground after several
          years of playing Poker with my friends.
        </h4>
        <h4 className="mt-4">
          One of the pleasures of the game is to keep track of your game
          results.
          <br /> <br />
          That’s how I came up with the idea for this app...
        </h4>
        <h4 className="mt-4">
          No more writing game results on papers or EXCEL sheets, all you need
          is in this app!
        </h4>
        <h4 className="mt-4">
          Further features are yet to come soon.. Enjoy & ALL IN!!!!
        </h4>
        <h3>
          <br />
          Get in touch:
          <a href="mailto:nadavg1000@gmail.com">nadavg1000@gmail.com</a>
        </h3>
      </div>
    </div>
  );
};

export default About;
