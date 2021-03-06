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

export function personalGames(uId) {
  return http.get(`${apiUrl}/games/personalGames/${uId}`);
}

export function monthsData(teamId, month) {
  return http.get(`${apiUrl}/games/byMonths/${month}/${teamId}`);
}

export function statsPerHour(teamId) {
  return http.get(`${apiUrl}/games/statsPerHour/${teamId}`);
}
export function successp(teamId) {
  return http.get(`${apiUrl}/games/success-p/${teamId}`);
}
export function cardsData(teamId, cardName) {
  return http.get(`${apiUrl}/games/${cardName}/${teamId}`);
}

export function profits(teamId) {
  return http.get(`${apiUrl}/games/profits/top-ten/${teamId}`);
}

export function agg_profits(teamId) {
  return http.get(`${apiUrl}/games/agg_profits/top-ten/${teamId}`);
}

export function newGame(game) {
  return http.post(`${apiUrl}/games`, game);
}

export function gameById(gameId) {
  return http.get(`${apiUrl}/games/${gameId}`);
}

export function updateGame(gameId, game) {
  return http.put(`${apiUrl}/games/${gameId}`, game);
}
export function inProgress(teamId) {
  return http.get(`${apiUrl}/games/true/${teamId}`);
}

export function totalCash(teamId) {
  return http.get(`${apiUrl}/games/total/cash/${teamId}`);
}

export function allGamesByTeam(teamId) {
  return http.get(`${apiUrl}/games/teams/byTeamId/${teamId}`);
}

export function totalGames(teamId) {
  return http.get(`${apiUrl}/games/totalGames/${teamId}`);
}

export function updateManager(id, manager) {
  return http.put(`${apiUrl}/games/updateManager/${id}`, manager);
}

export function fetchCashingDetails(gameId) {
  return http.get(`${apiUrl}/games/cashingDetails/${gameId}`);
}

export function previousRank(teamId) {
  return http.get(`${apiUrl}/games/previousRank/${teamId}`);
}

export function monthlyStats(teamId) {
  return http.get(`${apiUrl}/games/monthlyStats/${teamId}`);
}

export function monthlyByPlayer(teamId) {
  return http.get(`${apiUrl}/games/monthlyByPlayer/${teamId}`);
}

export function sideBets(teamId) {
  return http.get(`${apiUrl}/games/sideBets/riko/${teamId}`);
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
  totalCash,
  personalGames,
  allGamesByTeam,
  totalGames,
  agg_profits,
  statsPerHour,
  updateManager,
  fetchCashingDetails,
  previousRank,
  monthlyStats,
  monthlyByPlayer,
  sideBets,
};
