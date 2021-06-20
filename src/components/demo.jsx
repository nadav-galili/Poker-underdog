import React from "react";
import PageHeader from "./common/pageHeader";

const Demo = () => {
  return (
    <div className="container">
      <div className="row">
        <PageHeader titleText="Demo for the game" />
        <h3>Basic instructions for setting up a game:</h3>
        <ul>
          <li>First sign-up or sign-in to set up a user</li>
          <li>Head over to "My-Teams" located at the top navbar</li>
          <li>
            *If you want to check out a demo team, select "Join an existing
            team" and follow instuctions
          </li>

          {/* <img
            src={process.env.PUBLIC_URL + `demo/myTeams.JPG`}
            alt="demo img"
            className="demo-img"
          /> */}
          {/* <video src={process.env.PUBLIC_URL + "demo/demo1.mp4"}></video> */}
          <video width="400" height="240" controls>
            <source src={process.env.PUBLIC_URL + "demo/demo1.mp4"} />
          </video>
          <li>
            In this page you can:
            <ul>
              <li>Join an existing team</li>
              <li>Start a new team</li>
              <li>Check out your team statistics</li>
              <li>Start a new game</li>
              <li>Edit or delete a team</li>
            </ul>
          </li>
          <li>Table & statistics</li>
          {/* <img
            src={process.env.PUBLIC_URL + `demo/table.JPG`}
            alt="team table"
            className="demo-img"
          /> */}
          <video width="400" height="240" controls>
            <source src={process.env.PUBLIC_URL + "demo/demo2.mp4"} />
          </video>
          <li>Start a new game:</li>
          <ul>
            <li>Select the players that will play in the game</li>
            <li>*Note that you need to select at least 2 players</li>
            <li>*Note that you need to select at least 2 players</li>
          </ul>

          <li>
            Start your game, compete with your amigos for the chance to be poker
            champions
          </li>
          <li>
            Each time a player cashes in, press the $ icon to add another 50$ to
            his cashing
          </li>
          <li>
            At the end of the match , count each players cash and input the
            ammount to the "cash in hand" field.
          </li>

          <li>
            To finish the game press "Update Results" & you will be transferd to
            the leading boards of the latest game
          </li>
          <li>Have fun & ALL IN!!!!!!!!!!!!</li>
        </ul>
      </div>
    </div>
  );
};

export default Demo;
