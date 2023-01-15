import React, { useState, useEffect } from "react";
import gameService from "../../services/gameService";
import { apiImage } from "../../config.json";

const AllGamesList = ({ teamId }) => {
  const [allGames, setAllGames] = useState([]);
  useEffect(() => {
    async function getAllGames() {
      const { data: allGames } = await gameService.getAllGamesByTeam(teamId);
      console.log(
        "🚀 ~ file: allGamesList.jsx:10 ~ getAllGames ~ allGames",
        allGames
      );
      setAllGames(allGames);
    }
    getAllGames();
  }, []);
  return (
    <div className="container">
      <h2 className="allGamesTitle text-center">All Games</h2>
      {allGames.length > 0 &&
        allGames.map((game) => (
          <div className="singleGame  my-2" key={game._id}>
            <div className="gameHeaders text-black">
              <p className="text-center">
                Game Manager:{game.game_manager.name}
              </p>
              <p className="text-center">{game.date}</p>
              <div className="d-flex justify-content-center">
                <p className="d">{game.startTime} - </p>
                <p>{game.endTime}</p>
              </div>
            </div>
            <div className="gamePlayersDetails bg-white ">
              <div className="singleGameHeader d-flex justify-content-around">
                <p>Rank</p>
                <p>Image</p>
                <p>Player</p>
                <p>Profit</p>
                <p>Cashing</p>
              </div>
              {game.players.map((player) => (
                <div
                  key={player.id}
                  className="singleGameDetails d-flex justify-content-around text-center"
                >
                  <p>{player.gameRank}</p>
                  <div className="listPlayerStats my-1">
                    <img src={`${apiImage}${player.image}`} alt="" />
                  </div>
                  <p>{player.name}</p>
                  <p>{player.profit}</p>
                  <p>{player.cashing}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllGamesList;
