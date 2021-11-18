import React, { useState, useEffect } from "react";
import h2hService from "../../services/h2hService";
import _ from "lodash";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";

const H2hGameCard = ({ team }) => {
  const [games, setGames] = useState();
  const [gamesData, setGamesData]=useState()
  useEffect(() => {
    const lastH2h = async () => {
      try {
        let aGames = await h2hService.teamAllGames(team);
        setGamesData(aGames.data)
        let allGames = aGames.data.map((d) => _.flattenDeep(d.players));
        setGames(allGames);
      } catch (error) {
        // console.log("error1");
      }
    };
    lastH2h();
  }, [team]);
  // let Rank = 1;
  let created=0
  return (
    <div>
      {!games &&(
      <SpinnerInfinity
        size={130}
        thickness={151}
        speed={70}
        color="rgba(252, 252, 252, 1)"
        secondaryColor="rgba(108, 20, 180, 1)"
        enabled={true}
      />)}
      <div className="contain">
        <PageHeader titleText="All Games" />

        {games &&
          games.map((g) => (
            <div className="col-12 col-lg-3 pb-4" id="card-top" key={games.createdAt}>
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
       
                   <span>{new Date(gamesData[created++].createdAt).toLocaleDateString("en-GB")}</span>
                  <div
                    className="stats d-flex w-100 justify-content-between"
                    id="lGame"
                  > 
                    <p className="ms-5">Player</p>
                    <p className="me-3">Points</p>
                  </div>
                </li>
              
                {g.sort((a, b) => b.points - a.points).map((game) => {
                 
                  return (
                    <li className="statsRow w-100 justify-content-between" key={game.name+Date.now()}>
                    <div className="rowPos"></div>
                    <div className="rowImage">
                      <img
                        src={`${apiImage}${game.image}`}
                        alt="player list row"
                      />
                    </div>
                    <div className="rowName" id="lGameName">
                      {game.name}
                    </div>
                    <div className="rowProfit">{game.points}</div>
                  </li>
                  )
               
})}
              </ol>
            </div>
          ))}
      </div>
    </div>
  );
};

export default H2hGameCard;
