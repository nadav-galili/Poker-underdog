import http from "./httpService";
import { apiUrl } from "../config.json";

export function saveNewScheduledGame(gameData) {
  return http.post(`${apiUrl}/scheduleGames/saveNewScheduledGame`, gameData);
}

export default {
  saveNewScheduledGame,
};
