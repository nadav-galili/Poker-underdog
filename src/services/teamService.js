import http from "./httpService";
import { apiUrl } from "../config.json";

export function getTeam(teamId) {
  return http.get(`${apiUrl}/teams/${teamId}`);
}

//
export function getTeamByNumber(teamNumber) {
  return http.get(`${apiUrl}/teams/numbers/${teamNumber}`);
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
// export function getTeam() {
//   return http.get(`${apiUrl}/teams/my-teams`);
// }

export function deleteTeam(teamId) {
  return http.delete(`${apiUrl}/teams/${teamId}`);
}

export function removePlayerFromTeam(teamNumber, playerId, teamId) {
  return http.delete(
    `${apiUrl}/teams/removePlayerFromTeam/${teamNumber}/${playerId}`,
    { data: { teamId: teamId } }
  );
}

export function getTeamForSideBets(teamId, userId) {
  return http.get(`${apiUrl}/teams/teamForSideBets/${teamId}/${userId}`);
}

///NEW SERVICES
// ////**************************** */

export function newGetTeam(teamId) {
  return http.get(`${apiUrl}/teams/newGetTeam/${teamId}`);
}

export default {
  createTeam,
  getMyTeam,
  getTeam,
  editTeam,
  deleteTeam,
  getTeamByNumber,
  removePlayerFromTeam,
  getTeamForSideBets,
  newGetTeam,
};
