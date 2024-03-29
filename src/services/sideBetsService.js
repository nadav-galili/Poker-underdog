import http from "./httpService";
import { apiUrl } from "../config.json";

export function createSideBet(sideBet) {
  return http.post(`${apiUrl}/sideBets`, sideBet);
}

export function getSidebetsForMainTable(teamId) {
  return http.get(`${apiUrl}/sideBets/getsidebetsForMainTable/${teamId}`);
}

export function gotOfferedSidebet(userId) {
  return http.get(`${apiUrl}/sideBets/gotOfferedSidebet/${userId}`);
}

export function acceptSideBet(sideBetId) {
  return http.put(`${apiUrl}/sideBets/acceptSideBet/${sideBetId}`);
}

export function dismissSideBet(sideBetId) {
  return http.put(`${apiUrl}/sideBets/dismissSideBet/${sideBetId}`);
}

export function getAllApprovedSideBets(teamId) {
  return http.get(`${apiUrl}/sideBets/getAllApprovedSideBets/${teamId}`);
}

export function getExtraDetais(
  teamId,
  sideBetMasterPlayerId,
  sideBetsSlavePlayerId,
  sideBetStartDate,
  sideBetEndDate
) {
  return http.post(`${apiUrl}/sideBets/getExtraDetais/${teamId}`, {
    teamId,
    sideBetMasterPlayerId,
    sideBetsSlavePlayerId,
    sideBetStartDate,
    sideBetEndDate,
  });
}

export function getAllDismissedSideBets(teamId) {
  return http.get(`${apiUrl}/sideBets/getAllDismissedSideBets/${teamId}`);
}

export default {
  createSideBet,
  getSidebetsForMainTable,
  gotOfferedSidebet,
  acceptSideBet,
  dismissSideBet,
  getAllApprovedSideBets,
  getExtraDetais,
  getAllDismissedSideBets,
};
