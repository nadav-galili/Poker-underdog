import React from "react";
import PageHeader from "./common/pageHeader";

const About = () => {
  return (
    <div className="container">
      <div className="row">
        <PageHeader titleText="About Page" />
        <h4>
          Poker-Underground started out after severel years of playing poker
          with friends.
          <br /> One of the fun things about playing with your friends is to
          keep track of your game results.
          <br />
          So i came up with the idea for this app...
          <br />
          No more writing on papers or keeping EXCEL sheets, all you need is
          right here in this app.
          <br />
          Further features are yet to come soon..
          <br />
          Enjoy & ALL IN!!!!
        </h4>

        <h3>
          Get in touch:
          <a href="mailto:nadavg1000@gmail.com">nadavg1000@gmail.com</a>
        </h3>
      </div>
    </div>
  );
};

export default About;
