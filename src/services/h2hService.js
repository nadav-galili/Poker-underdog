import http from "./httpService";
import { apiUrl } from "../config.json";

export function newH2h(game) {
  return http.post(`${apiUrl}/h2h`, game);
}

export function getByGameId(gameId) {
  return http.get(`${apiUrl}/h2h/${gameId}`);
}

export function updateH2h(gameId) {
  return http.put(`${apiUrl}/h2h/updateh2h/${gameId}`);
}

export function getPointsByPlayer(pId) {
  return http.get(`${apiUrl}/h2h/byPlayer/${pId}`);
}

export function getPointsByTeam(teamId) {
  return http.get(`${apiUrl}/h2h/byTeam/${teamId}`);
}

export function teamAllGames(teamId) {
  return http.get(`${apiUrl}/h2h/teamAllGames/${teamId}`);
}

export function addPlayersH2h(gameId, game) {
  return http.put(`${apiUrl}/h2h/addPlayersH2h/${gameId}`, game);
}
export default {
  newH2h,
  getByGameId,
  updateH2h,
  getPointsByPlayer,
  getPointsByTeam,
  teamAllGames,
  addPlayersH2h,
};
