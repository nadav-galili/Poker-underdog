import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";

const SuccessCard = (props) => {
  const [data, setData] = useState([]);
  const [hero, setHero] = useState([]);
  const teamId = props.match.params.teamId;

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.successp(teamId);
      table = table.data;
      let myHero = table.shift();

      setHero(myHero);
      setData(table);
    };

    getTable();
  }, [setData, teamId]);

  let rank = 2;

  return (
    <div className="container-fluid">
      <h1>Success %</h1>
      {data.length === 0 && (
        <div className="spinner pt-2">
          <SpinnerInfinity
            size={130}
            thickness={151}
            speed={70}
            color="rgba(252, 252, 252, 1)"
            secondaryColor="rgba(108, 20, 180, 1)"
            enabled={data.length === 0 ? true : false}
          />
        </div>
      )}
      {data.length>0 && (
         <div className="col-lg-3 col-10" id="cardTop">
         <ul className="statsList ">
           <li
             className="statsHero d-flex"
             style={{
               backgroundImage: `url(${
                 process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
               })`,
             }}
           >
             <div className="statsInfo flex-fill">
               <div className="pos">1.</div>
               <a href="#/" id="heroName">
                 {data.length > 0 ? hero._id.name : ""}
               </a>
 
               <div id="amount" className="flex-fill">
                 {data.length > 0 ? hero.successPercentage : ""}
               </div>
             </div>
             <div className="heroImage ">
               <img
                 src={data.length > 0 ? `${apiImage}${hero._id.image}` : ""}
                 alt=""
               />
             </div>
           </li>
           <React.Fragment>
             {data.map((player) => (
               <li className="statsRow d-flex" key={player._id.name}>
                 <div className="rowPos">{rank++}</div>
                 <div className="rowImage">
                   <img
                     src={
                       data.length > 0 ? `${apiImage}${player._id.image}` : ""
                     }
                     alt="playr list row"
                   />
                 </div>
                 <div className="rowName">
                   {data.length > 0 ? player._id.name : ""}
                 </div>
                 <div className="rowProfit">
                   {data.length > 0 ? player.successPercentage : ""}
                 </div>
               </li>
             ))}
           </React.Fragment>
         </ul>
       </div>
      )}
     
    </div>
  );
};

export default SuccessCard;
