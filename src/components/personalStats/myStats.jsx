import React, { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/userService";
import gameService from "../../services/gameService";
import PageHeader from "../common/pageHeader";
import TotalPersonal from "./totalPersonal";
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
      setStats(myStats.data);
    };
    getMydata();
  }, [setMe, me._id]);

  return (
    <div className="container-fluid">
      <div className="row ">
        <PageHeader titleText="Player Statistics" />
        {me.name && stats && (
          <React.Fragment>
            <div className="me col-12 col-md-8 col-lg-10">
              <img src={me.userImage} alt="user" className="userImage m-4 " />
              <h2 className="ms-4">{me.name.toUpperCase()}</h2>
              <h4 className="ms-4">{me.email}</h4>
            </div>
            <div className="totalP col-12 col-md-8 col-lg-10">
              <TotalPersonal stats={stats[0] ? stats[0] : {}} />
            </div>
            <div className="personalTeams col-12 col-md-8 col-lg-10 mb-5">
              {/* <TeamForPersonal /> */}
              <h2 className="ms-4">
                Last game played at:
                {stats[0] && (
                  <p className="lastGameDate">
                    {new Date(stats[0].lastGame).toLocaleDateString("en-US")}
                  </p>
                )}
                {!stats[0] && (
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
