import http from "./httpService";
import { apiUrl } from "../config.json";

export function getTeam(teamId) {
  return http.get(`${apiUrl}/teams/${teamId}`);
}

export function editTeam(team) {
  const teamId = team._id;
  delete team._id;
  return http.put(`${apiUrl}/teams/${teamId}`, team);
}

export function createTeam(team) {
  return http.post(`${apiUrl}/teams`, team);
}

export function getMyTeam() {
  return http.get(`${apiUrl}/teams/my-teams`);
}

export function deleteTeam(teamId) {
  return http.delete(`${apiUrl}/teams/${teamId}`);
}

export default {
  createTeam,
  getMyTeam,
  getTeam,
  editTeam,
  deleteTeam,
};
