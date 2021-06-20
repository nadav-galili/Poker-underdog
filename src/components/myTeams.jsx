import React, { useState, useEffect } from "react";
import PageHeader from "./common/pageHeader";
import teamService from "../services/teamService";
import Team from "./team";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await teamService.getMyTeam();

      if (data.length > 0) setTeams(data);
    };
    fetchTeams();
  }, []);

  let removeTeam = (teamId) => {
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
        let myTeams = teams.filter((team) => team._id !== teamId);
        teamService.deleteTeam(teamId);
        setTeams(myTeams);
        toast("This team was deleted succesfully");
      }
    });
  };
  return (
    <div className="container">
      <PageHeader titleText="My Teams Page" />
      <div className="row">
        <div className="col-12 ">
          <Link className="btn btn-primary ms-2" to="/create-team">
            +Add A New Team
          </Link>
          <Link className="btn btn-primary ms-2" to="/join-team">
            Join An Existing Team
          </Link>
          <div>
            You can try a test team.
            <br /> enter "Join an existing team" and try out
          </div>
          <p className="mt-3 team-list">
            {teams.length > 0 && <span>Your teams are in the list below:</span>}
          </p>
        </div>
      </div>
      <div className="row">
        {teams.length > 0 &&
          teams.map((team) => (
            <Team
              key={team._id}
              team={team}
              removeTeam={() => removeTeam(team._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default MyTeams;
