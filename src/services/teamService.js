import http from "./httpService";
import { apiUrl } from "../config.json";

export function createTeam(team) {
  return http.post(`${apiUrl}/teams`, team);
}

function getMyTeam() {
  return http.get(`${apiUrl}/teams/my-teams`);
}
export default {
  createTeam,
  getMyTeam,
};
