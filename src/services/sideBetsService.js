import http from "./httpService";
import { apiUrl } from "../config.json";

export function createSideBet(sideBet) {
  return http.post(`${apiUrl}/sideBets`, sideBet);
}

export function getSidebetsForMainTable(teamId) {
  return http.get(`${apiUrl}/sideBets/getsidebetsForMainTable/${teamId}`);
}

export default {
  createSideBet,
  getSidebetsForMainTable,
};
