import http from "./httpService";
import { apiUrl } from "../config.json";

export function lastGame(teamId) {
  return http.get(`${apiUrl}/games/last-game/${teamId}`);
}

export function table(teamId) {
  return http.get(`${apiUrl}/games/table/${teamId}`);
}

export function personal(uId) {
  return http.get(`${apiUrl}/games/personal/${uId}`);
}

export function personalGames(uId) {
  return http.get(`${apiUrl}/games/personalGames/${uId}`);
}

export function monthsData(teamId, month) {
  return http.get(`${apiUrl}/games/byMonths/${month}/${teamId}`);
}

export function statsPerHour(teamId) {
  return http.get(`${apiUrl}/games/statsPerHour/${teamId}`);
}
export function successp(teamId) {
  return http.get(`${apiUrl}/games/success-p/${teamId}`);
}
export function cardsData(teamId, cardName) {
  return http.get(`${apiUrl}/games/${cardName}/${teamId}`);
}

export function profits(teamId) {
  return http.get(`${apiUrl}/games/profits/top-ten/${teamId}`);
}

export function agg_profits(teamId) {
  return http.get(`${apiUrl}/games/agg_profits/top-ten/${teamId}`);
}

export function newGame(game) {
  return http.post(`${apiUrl}/games`, game);
}

export function gameById(gameId) {
  return http.get(`${apiUrl}/games/${gameId}`);
}

export function updateGame(gameId, game) {
  return http.put(`${apiUrl}/games/${gameId}`, game);
}
export function inProgress(teamId) {
  return http.get(`${apiUrl}/games/true/${teamId}`);
}

export function totalCash(teamId) {
  return http.get(`${apiUrl}/games/total/cash/${teamId}`);
}

export function allGamesByTeam(teamId) {
  return http.get(`${apiUrl}/games/teams/byTeamId/${teamId}`);
}

export function totalGames(teamId) {
  return http.get(`${apiUrl}/games/totalGames/${teamId}`);
}

export function updateManager(id, manager) {
  return http.put(`${apiUrl}/games/updateManager/${id}`, manager);
}

export function fetchCashingDetails(gameId) {
  return http.get(`${apiUrl}/games/cashingDetails/${gameId}`);
}

export function previousRank(teamId) {
  return http.get(`${apiUrl}/games/previousRank/${teamId}`);
}

export function monthlyStats(teamId) {
  return http.get(`${apiUrl}/games/monthlyStats/${teamId}`);
}

export function monthlyByPlayer(teamId) {
  return http.get(`${apiUrl}/games/monthlyByPlayer/${teamId}`);
}

export function sideBets(teamId) {
  return http.get(`${apiUrl}/games/sideBets/riko/${teamId}`);
}

//NEW SERVICES
////////////////**************** */

export function getTotalStatsForTeam(
  teamId,
  dates = { startDate: null, endDate: null }
) {
  return http.get(
    `${apiUrl}/games/newMainStats/totalStatsForTeam/${teamId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
  );
}

export function getCardStats(
  teamId,
  stats,
  month = null,
  dates = { startDate: null, endDate: null }
) {
  if (stats === "profitsStats") {
    return http.get(
      `${apiUrl}/games/newMainStats/profitsStats/${teamId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
    );
  }
  if (stats === "topTenProfits") {
    return http.get(
      `${apiUrl}/games/newMainStats/topTenProfits/${teamId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
    );
  }
  if (stats === "head2head") {
    return http.get(
      `${apiUrl}/h2h/newMainStats/head2head/${teamId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
    );
  }

  if (stats === "getHourlyStats") {
    return http.get(
      `${apiUrl}/games/newMainStats/getHourlyStats/${teamId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
    );
  }

  if (stats === "getTopComebacks") {
    return http.get(
      `${apiUrl}/games/newMainStats/getTopComebacks/${teamId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
    );
  }
  if (stats === "getWiningStreak") {
    return http.get(
      `${apiUrl}/games/newMainStats/getWiningStreak/${teamId}?startDate=${dates.startDate}&endDate=${dates.endDate}`
    );
  }
  if (stats === "getThisMonthStats") {
    return http.get(
      `${apiUrl}/games/newMainStats/getThisMonthStats/${teamId}/${month}`
    );
  }
}

export function getStatsByMonth(
  teamId,
  dates = { startDate: null, endDate: null }
) {
  return http.get(
    `${apiUrl}/games/newMainStats/getStatsByMonth/${teamId}?startDate=${dates?.startDate}&endDate=${dates?.endDate}`
  );
}

export function getAllMonthsByMonth(teamId) {
  return http.get(`${apiUrl}/games/newMainStats/getAllMonthsByMonth/${teamId}`);
}

export function getAllGamesByTeam(
  teamId,
  pagination,
  page,
  dates = { startDate: null, endDate: null }
) {
  return http.get(
    `${apiUrl}/games/newMainStats/getAllGamesByTeam/${teamId}?pagination=${pagination}&page=${page}&startDate=${dates.startDate}&endDate=${dates.endDate}`
  );
}

export function GetSeasonYears(teamId) {
  return http.get(`${apiUrl}/games/newMainStats/GetSeasonYear/${teamId}`);
}

export default {
  lastGame,
  table,
  personal,
  monthsData,
  cardsData,
  successp,
  profits,
  newGame,
  gameById,
  updateGame,
  inProgress,
  totalCash,
  personalGames,
  allGamesByTeam,
  totalGames,
  agg_profits,
  statsPerHour,
  updateManager,
  fetchCashingDetails,
  previousRank,
  monthlyStats,
  monthlyByPlayer,
  sideBets,
  getTotalStatsForTeam,
  getCardStats,
  getAllMonthsByMonth,
  getAllGamesByTeam,
  GetSeasonYears,
  getStatsByMonth,
};
