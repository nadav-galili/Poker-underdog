import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import teamService from "../../services/teamService";
import scheduleGameService from "../../services/scheduleGameService";
import SchedulaGame from "./ScheduledGame";

const JoinScheduledGame = (props) => {
  ///the params is gameid
  const gameid = props.match.params.teamId;
  const [game, setGame] = useState({});
  console.log("gameid", game);
  const [team, setTeam] = useState({});
  useEffect(() => {
    const fetchGame = async () => {
      const { data: game } = await scheduleGameService.getScheduledGameById(
        gameid
      );
      setGame(game);
    };
    fetchGame();
  }, []);

  return (
    <div className="container">
      {game.teamId && <SchedulaGame teamId={game.teamId} />}
    </div>
  );
};

export default JoinScheduledGame;
