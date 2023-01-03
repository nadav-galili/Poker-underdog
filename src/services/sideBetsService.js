import http from "./httpService";
import { apiUrl } from "../config.json";

export function createSideBet(sideBet) {
  return http.post(`${apiUrl}/sideBets`, sideBet);
}

export default {
  createSideBet,
};
