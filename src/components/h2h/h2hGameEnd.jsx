import React, { useState, useEffect } from "react";
import h2hService from "../../services/h2hService";
import _ from "lodash";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json"

const H2hGameEnd = ({ gameId, header }) => {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const lastH2h = async () => {
      try {
        let last = await h2hService.getByGameId(gameId);
        last = _.flattenDeep(last.data[0].players);
        last.sort((a, b) => b.points - a.points);
        setPlayers(last);
      } catch (error) {
        // console.log("error1");
      }
    };
    lastH2h();
  }, [gameId]);
  let Rank=1;
  return (<div className="">
{players.length>0 && (
     <div className="contain">
     <PageHeader titleText={header} />
     <div className="col-12"  id="card-top">
         <ol className="statsList">
         <li
           id="lastGameHero"
             className="statsHero d-flex flex-column"
             style={{
               backgroundImage: `url(${
                 process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
               })`,
             }}
           >
                <div className="stats d-flex w-100 justify-content-between" id="lGame">
                 <p className="ms-3">Player</p>
                 <p className="me-3">Points</p>
               </div>
           </li>
           <React.Fragment>
               {players.map(player=>(
                   <li className="statsRow" key={player.id}>
                       <div className="rowPos">{Rank++}</div>
                       <div className="rowImage">
                           <img src={`${apiImage}${player.image}`}  alt="player list row"/>
                       </div>
                       <div className="rowName" id="lGameName">
                           {player.name}
                       </div>
                       <div className="rowProfit me-3">
                           {player.points}
                       </div>
                   </li>
               ))}
           </React.Fragment>
         </ol>
     </div>
   </div>
)}
  </div>
  
   
  );
};

export default H2hGameEnd;
