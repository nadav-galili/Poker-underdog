import React,{useEffect, useState} from 'react';
import gameService from "../../services/gameService"

const NewGame = (props) => {
    const [players, setPlayers]=useState([])
    useEffect(() => {
    const players=async ()=>{
        let playersInGame=await gameService.gameById(props.match.params.gameId);
        setPlayers(playersInGame.data)
    }
     
    players()
      
      }, []);
    return (<p className="text-primary">working</p>  );
}
 
export default NewGame;