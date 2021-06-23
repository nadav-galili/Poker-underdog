import React, { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/userService";
import PageHeader from "../common/pageHeader";
import TotalPersonal from "./totalPersonal";

const MyStats = (props) => {
  console.log(props.match.params.id);
  //const uID=props.match.params.id;
  const [me, setMe] = useState({});

  useEffect(() => {
    const getMydata = async () => {
      let myData = await userService.getUserDetails();
      delete myData.data.password;
      setMe(myData.data);
    };
    getMydata();
  }, [setMe]);

  console.log(me);
  return (
    <div className="container">
      <div className="row">
        <PageHeader titleText="Player Statistics" />
        {me.name && (
          <React.Fragment>
            <div className="me">
              <img src={me.userImage} alt="user" className="userImage mt-3" />
              <h2>{me.name.toUpperCase()}</h2>
              <h5>{me.email}</h5>
            </div>
            <div className="totalP">
              <TotalPersonal />
            </div>
          </React.Fragment>
        )}
        {!me.name && <p>no stats yet</p>}
      </div>
    </div>
  );
};

export default MyStats;
