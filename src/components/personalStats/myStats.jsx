import React, { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/userService";
import PageHeader from "../common/pageHeader";
import TotalPersonal from "./totalPersonal";
import TeamForPersonal from "./teamForPersonal";

const MyStats = (props) => {
  const [me, setMe] = useState({});

  useEffect(() => {
    const getMydata = async () => {
      let myData = await userService.getUserDetails();
      delete myData.data.password;
      setMe(myData.data);
    };
    getMydata();
  }, [setMe]);

  return (
    <div className="container-fluid">
      <div className="row ">
        <PageHeader titleText="Player Statistics" />
        {/* <img
          src={process.env.PUBLIC_URL + "/icons/statistic.png"}
          alt="stats icon"
          className="aboutIcon"
        /> */}

        {me.name && (
          <React.Fragment>
            <div className="me col-12 col-md-8 col-lg-10">
              <img src={me.userImage} alt="user" className="userImage m-4" />
              <h2 className="ms-4">{me.name.toUpperCase()}</h2>
              <h4 className="ms-4">{me.email}</h4>
            </div>
            <div className="totalP col-12 col-md-8 col-lg-10">
              <TotalPersonal />
            </div>
            <div className="personalTeams col-12 col-md-8 col-lg-10">
              <TeamForPersonal />
            </div>
          </React.Fragment>
        )}
        {!me.name && <p className="noStats">No games played yet </p>}
      </div>
    </div>
  );
};

export default MyStats;
