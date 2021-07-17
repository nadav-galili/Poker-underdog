import React, { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/userService";
import gameService from "../../services/gameService";
import PageHeader from "../common/pageHeader";
import TotalPersonal from "./totalPersonal";
import { Link } from "react-router-dom";
//import TeamForPersonal from "./teamForPersonal";

const MyStats = () => {
  const [me, setMe] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getMydata = async () => {
      let myData = await userService.getUserDetails();
      delete myData.data.password;
      setMe(myData.data);
      let myStats = await gameService.personal(me._id);
      console.log(myStats.data[0]);
      setStats(myStats.data[0]);
    };
    getMydata();
  }, [setMe, me._id]);

  return (
    <div className="container-fluid playerStats">
      <div className="row ">
        <PageHeader titleText="Player Statistics" />
        {me.name && stats && (
          <React.Fragment>
            <div className="me col-10 col-md-8 col-lg-10">
              <img src={me.userImage} alt="user" className="userImage m-4 " />
              <h2 className="ms-4">{me.name.toUpperCase()}</h2>
              <h4 className="ms-4">{me.email}</h4>
              <Link className="ms-4 editUser" to={`/my-stats/edit/${me._id}`}>
                <i className="fas fa-edit ms-1"></i>
                Edit User
              </Link>
            </div>
            <div className="totalP col-10 col-md-8 col-lg-10">
              <TotalPersonal stats={stats ? stats : {}} />
            </div>
            <div className="personalTeams col-10 col-md-8 col-lg-10 mb-5">
              {/* <TeamForPersonal /> */}
              <h2 className="ms-4">
                Last game played at:
                {stats && (
                  <p className="lastGameDate">
                    {new Date(stats.lastGame).toLocaleDateString("en-US")}
                  </p>
                )}
                {!stats && (
                  <p>No games played yet...start a new game & join the fun</p>
                )}
              </h2>
            </div>
          </React.Fragment>
        )}
        {!me.name && <p className="noStats">No games played yet </p>}
      </div>
    </div>
  );
};

export default MyStats;
