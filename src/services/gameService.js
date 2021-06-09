import http from "./httpService";
import { apiUrl } from "../config.json";

export function lastGame(teamId) {
  return http.get(`${apiUrl}/games/last-game/${teamId}`);
}

export function table(teamId) {
  return http.get(`${apiUrl}/games/table/${teamId}`);
}

export default {
  lastGame,
  table,
};
