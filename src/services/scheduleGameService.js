import http from "./httpService";
import { apiUrl } from "../config.json";

export function saveNewScheduledGame(gameData) {
  return http.post(`${apiUrl}/scheduleGames/saveNewScheduledGame`, gameData);
}

export function getLatestScheduleGame(teamId) {
  return http.get(`${apiUrl}/scheduleGames/getLatestScheduleGame/${teamId}`);
}

export function getScheduledGameById(gameId) {
  return http.get(`${apiUrl}/scheduleGames/getScheduledGameById/${gameId}`);
}
export default {
  saveNewScheduledGame,
  getLatestScheduleGame,
  getScheduledGameById,
};