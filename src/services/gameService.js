import http from "./httpService";
import { apiUrl } from "../config.json";

export function lastGame(teamId) {
  return http.get(`${apiUrl}/games/last-game/${teamId}`);
}

export default {
  lastGame,
};
