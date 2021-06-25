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
    <div className="container">
      <div className="row ">
        <PageHeader titleText="Player Statistics" />
        {me.name && (
          <React.Fragment>
            <div className="me">
              <img src={me.userImage} alt="user" className="userImage m-4" />
              <h2 className="ms-4">{me.name.toUpperCase()}</h2>
              <h4 className="ms-4">{me.email}</h4>
            </div>
            <div className="totalP">
              <TotalPersonal />
            </div>
            <div className="personalTeams">
              <TeamForPersonal />
            </div>
          </React.Fragment>
        )}
        {!me.name && <p>no stats yet</p>}
      </div>
    </div>
  );
};

export default MyStats;
