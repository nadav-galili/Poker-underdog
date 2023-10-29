import React, { useState, useEffect } from "react";
import PageHeader from "./common/pageHeader";
import teamService from "../services/teamService";
import userService from "../services/userService";
import Team from "./team";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { apiImage } from "../config.json";

const MyTeams = () => {
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await teamService.getMyTeam();
      setTeams(data);
      const me = await userService.getCurrentUser();
      setUser(me);
    };
    fetchTeams();
  }, []);

  let removeTeam = (teamid) => {
    let chosenTeam = teams.filter((team) => team._id === teamid);

    if (user._id !== chosenTeam[0].user_id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Only team manager can delete a team",
      });
    } else {
      Swal.fire({
        title: "Are you sure you want to delete this team?",
        text: "you wont be able to cancel",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          let myTeams = teams.filter((team) => team._id !== teamid);
          teamService.deleteTeam(teamid);
          setTeams(myTeams);
          toast("This team was deleted succesfully");
        }
      });
    }
  };
  return (
    <div className="container about">
      <PageHeader titleText="My Teams Page" />

      <div className="myTeamsContainer col-6 my-3">
        <img src={apiImage + "images/teamsPage.png"} alt="teams icon" />
      </div>

      <div className="row">
        <div className=" d-flex justify-content-around">
          <Link className="btn btn-primary" to="/create-team">
            +Add A New Team
          </Link>
          <Link className="btn btn-primary" to="/join-team">
            Join An Existing Team
          </Link>
        </div>
        <p className="text-white teamText mt-2 text-center">
          You can try a test team. enter "Join an existing team" and try out
        </p>
        <p className="mt-3 team-list text-center">
          {teams.length > 0 && <span>Your teams are in the list below:</span>}
        </p>
      </div>
      <div className="row">
        {teams.length > 0 &&
          teams.map((team) => (
            <Team
              key={team._id}
              team={team}
              teamid={team._id}
              user={user}
              teamNumber={team.teamNumber}
              removeTeam={() => removeTeam(team._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default MyTeams;
