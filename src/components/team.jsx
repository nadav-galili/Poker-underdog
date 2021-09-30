import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight } from "react-icons/fa";
import {CgCardHearts } from "react-icons/cg";

const Team = ({ team, removeTeam }) => {
  const teamDate = new Date(team.created_at);
  const day = teamDate.getDate();
  const month = teamDate.getMonth() + 1;
  const year = teamDate.getFullYear();
  const formated = `${day}/${month}/${year}`;

  var captain = team.players.filter((e) => e._id === team.user_id);
 
  return (
    <div className=" col-12 col-md-6 col-lg-6 mt-3">
      <div className="card mb-3" >
        <img
          className="p-2"
          src={team.teamImage}
          alt={team.name}
          width="100"
          height="100"
        />
        <div className="card-body">
          <h3 className="card-title ">
            <u>{team.name}</u>
          </h3>
          <p className="card-text info">
          <strong><u>Team Number:</u><span className="text-primary">{team.teamNumber}</span></strong> 
            <br />
            <p id="share">
            *Share this number with your friends and let them join your team
            </p>
          </p>
          <p>
            <b>
              <u className="text-dark">Team Manager:</u>
              {/* <br /> */}
              <span className="text-primary captain">{captain[0].name}</span>
             
            </b>
          </p>
          <Link className="btn btn-primary btn-lg" to={`/main-table/${team._id}`}>
            Team Tables & Statistics
           <FaArrowRight/>

          </Link>
          <i class="fa-duotone fa-angles-right"></i>
          

          <div className="card-text ">
            <strong>
              <u>Players:</u>
            </strong>
            <ul className="row" id="playersList">
              {team.players.map((player) => (
                <li key={player._id} className="col-6 col-lg-4 teams">
                  {player.name}
                  <br></br>
                  <img
                    src={player.userImage}
                    // width="70"
                    // height="50"
                    alt="user"
                  />
                </li>
              ))}
            </ul>
          </div>
          <Link className="btn mb-2" to={`/new-game/${team._id}`}>
            Start a new game
          </Link>
          <p className="card-text border-top pt-2">Created At:{formated}</p>
          <p>
            <Link to={`/my-teams/edit/${team._id}`}>
              <i className="fas fa-edit me-2 "></i>
              Edit
            </Link>
          </p>
          <p>
            <Link onClick={removeTeam} to="/my-teams">
              <i className="fas fa-trash-alt me-2"></i>
              Delete
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
