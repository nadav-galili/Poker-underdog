import React from "react";
import { Link } from "react-router-dom";
import { apiImage } from "../config.json";
import {GiCardKingClubs} from "react-icons/gi"
import {IoMdStats} from "react-icons/io"




const Team = ({ team, removeTeam }) => {
  var captain = team.players.filter((e) => e._id === team.user_id);
 
  return (
   
    <div className=" col-12 col-md-6 col-lg-4 mt-3">
      <div className="card mb-3" >
        <img
          className="p-2"
          src={`${apiImage}${team.teamImage}`}
          alt={team.name}
          width="100"
          height="100"
        />
        <div className="card-body pt-0">
          <h3 className="card-title ">
            <u className="text-primary">{team.name}</u>
          </h3>
          <p className="card-text info">
          <strong><u>Team Number:</u><span className="text-primary">{team.teamNumber}</span></strong> 
            <br />
            <span id="share">
            *Share this number with your friends and let them join your team
            </span>
          </p>
          <p className="mb-2">
            <b>
              <u className="text-dark ">Team Manager:</u>
              <span className="text-primary captain ">{captain[0].nickName}</span>
             
            </b>
          </p>
          <Link className="btn btn-primary " to={`/main-table/${team._id}`}>
            Team Tables & Stats
            <IoMdStats className="ms-2"/>
            <i className="ps-2 fas fa-angle-double-right"></i>
          </Link>
          <div className="card-text ">
            <strong>
              <u>Players:</u>
            </strong>
            <ul className="row ps-0" id="playersList">
              {team.players.map((player) => (
                <li key={player._id} className="col-4 col-lg-4 teams" id="playerAvatar">
                  {player.nickName}
                  <br></br>
                  <img src={`${apiImage}${player.image}`} alt="user" className='mb-2'
                  />
                </li>
              ))}
            </ul>
          </div>
          <Link className="btn mb-2" to={`/new-game/${team._id}`}>
            Start a new game
            <GiCardKingClubs className="ms-2" />
            <i className="ps-2 fas fa-angle-double-right"></i>
          </Link>
          <p className="card-text border-top pt-2">Created At:{new Date(team.createdAt).toLocaleDateString("en-GB")}</p>
          {/* <p className="text-primary">
            <Link to={`/my-teams/edit/${team._id}`}>
              <i className="fas fa-edit me-2 "></i>
              Edit
            </Link>
          </p> */}
          <p className="text-primary">
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
