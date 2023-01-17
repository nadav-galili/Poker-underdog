import React from "react";
import { apiImage } from "../../config.json";
const SingleGame = ({ game }) => {
  return (
    <div className="singleGame">
      <div className="singleGame  my-2" key={game._id}>
        <div className="gameHeaders text-black">
          <p className="text-center">Game Manager:{game.game_manager.name}</p>
          <p className="text-center">{game.date}</p>
          <div className="d-flex justify-content-center">
            <p className="d">{game.startTime} - </p>
            <p>{game.endTime}</p>
          </div>
        </div>
        <div className="gamePlayersDetails bg-white ">
          <div className="singleGameHeader d-flex justify-content-around px-2">
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
              <p className={player.profit > 0 ? "green" : "red"}>
                {player.profit}
              </p>
              <p>{player.cashing}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleGame;
