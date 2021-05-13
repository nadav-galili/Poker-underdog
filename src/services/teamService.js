import http from "./httpService";
import { apiUrl } from "../config.json";

export function createTeam(team) {
  return http.post(`${apiUrl}/teams`, team);
}

export default {
  createTeam,
};
