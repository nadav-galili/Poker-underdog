import http from "./httpService";
import { apiUrl } from "../config.json";


export function lastGame(teamId) {
  return http.get(`${apiUrl}/games/last-game/${teamId}`);
}

export function table(teamId) {
  return http.get(`${apiUrl}/games/table/${teamId}`);
}

export function personal(uId) {
  return http.get(`${apiUrl}/games/personal/${uId}`);
}

export function monthsData(teamId){
  return http.get(`${apiUrl}/games/byMonths/${teamId}`);
}

export function successp(teamId){
  return http.get(`${apiUrl}/games/success-p/${teamId}`);
}
export function cardsData(teamId, cardName){
  return http.get(`${apiUrl}/games/${cardName}/${teamId}`);
  }

  export function profits(teamId){
    return http.get(`${apiUrl}/games/profits/top-ten/${teamId}`);
  }

export function newGame(game){
  return http.post(`${apiUrl}/games`, game);
}

export function gameById(gameId){
  return http.get(`${apiUrl}/games/${gameId}`)
}

export function updateGame(gameId, game){
  return http.put(`${apiUrl}/games/${gameId}`, game)
}
export function inProgress(teamId){
  return http.get(`${apiUrl}/games/true/${teamId}`);
}

export function totalCash(teamId){
  return http.get(`${apiUrl}/games/total/cash/${teamId}`)
}

export default {
  lastGame,
  table,
  personal,
  monthsData,
  cardsData, 
  successp,
  profits,
  newGame,
  gameById,
  updateGame,
  inProgress,
  totalCash
};
