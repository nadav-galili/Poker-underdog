import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";
import _ from "lodash";

const AllGames = ({ teamId }) => {
  const [games, setGames] = useState();
  const [gamesData, setGamesData] = useState();

  useEffect(() => {
    const getGames = async () => {
      const all = await gameService.allGamesByTeam(teamId);
      setGamesData(all.data);
      const allGames = all.data.map((d) => _.flattenDeep(d.players));
      setGames(allGames);
    };

    getGames();
  }, [teamId]);


  let created = 0;

  return (
    <div className="container">
      <PageHeader titleText="All Games" />
     
      {!games && (
        <div className="spinner pt-2">
          <SpinnerInfinity
            size={130}
            thickness={151}
            speed={70}
            color="rgba(252, 252, 252, 1)"
            secondaryColor="rgba(108, 20, 180, 1)"
            enabled={true}
          />
        </div>
      )}
       <div className="row">
       {games &&
        games.map((g) => (
          <div className="col-lg-4 col-12 pb-3" id="card-top">
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
                <p>
                  {new Date(gamesData[created++].createdAt).toLocaleDateString(
                    "en-GB"
                  ) +
                    " " +
                    new Date(gamesData[created - 1].createdAt).toLocaleString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    ) +
                    " - " +
                    new Date(gamesData[created - 1].updatedAt).toLocaleString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}
                </p>
                <div
                  className="stats d-flex w-100 justify-content-between"
                  id="lGame"
                >
                  <p>Player</p>
                  <p>Name</p>
                  <p>Cashing</p>
                  <p>Profit</p>
                </div>
              </li>
              {g
                .sort((a, b) => b.profit - a.profit)
                .map((player) => (
                  <li className="statsRow" key={player.id}>
                    <div className="rowPos">{player.gameRank}</div>
                    <div className="rowImage">
                      <img
                        src={`${apiImage}${player.image}`}
                        alt="player list row"
                      />
                    </div>
                    <div className="rowName" id="lGameName">
                      {player.name}
                    </div>
                    <div className="rowCashingAll">{player.cashing}</div>
                    <div
                      className={
                        player.profit > 0
                          ? "rowProfit text-success"
                          : "rowProfit text-danger"
                      }
                    >
                      {player.profit}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        ))}
          </div>

     
    </div>
  );
};

export default AllGames;
