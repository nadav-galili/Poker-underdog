import React, { useEffect, useState } from "react";
import PageHeader from "../common/pageHeader";
import MasterPlayer from "./MasterPlayer";
import userService from "../../services/userService";
import teamService from "../../services/teamService";
import ChoosePlayer from "./choosePlayer";
import SelectedPlayer from "./selectedPlayer";

const NewSideBet = (props) => {
  const [user, setUser] = useState({});
  const [team, setTeam] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [sideBetTeamId, setSideBetTeamId] = useState();

  const selectPlayer = (player) => {
    delete player.password;
    delete player.email;
    setSelectedPlayer(player);
  };

  useEffect(() => {
    const getSideBets = async () => {
      const me = await userService.getUserDetails();
      setUser(me.data);
      const teamId = props.match.params.teamId;
      setSideBetTeamId(teamId);
      let teamForSideBet = await teamService.getTeamForSideBets(
        teamId,
        me.data._id
      );
      teamForSideBet = teamForSideBet.data[0].players;
      setTeam(teamForSideBet);
    };

    getSideBets();
  }, []);

  return (
    <div className="container">
      <PageHeader titleText="New Side Bet" />
      <MasterPlayer user={user} />
      {!selectedPlayer && (
        <div className="playersContainer d-flex flex-row row mx-3">
          <p className="text-center text-primary">
            Choose a player to offer a side-bet
          </p>
          {team.length > 0 &&
            team.map((player) => (
              <ChoosePlayer
                player={player}
                key={player._id}
                selectPlayer={selectPlayer}
                teamId={sideBetTeamId}
              />
            ))}
        </div>
      )}
      {selectedPlayer && (
        <SelectedPlayer player={selectedPlayer} teamId={sideBetTeamId} />
      )}
    </div>
  );
};

export default NewSideBet;
