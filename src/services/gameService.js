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

// export function cardsData(teamId, cardName){
// return http.get(`${apiUrl}/games/${cardName}/${teamId});
// }

export default {
  lastGame,
  table,
  personal,
  monthsData,
};
