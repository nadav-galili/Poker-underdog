import http from "./httpService";
import { apiUrl } from "../config.json";

export function newH2h(game){
return http.post(`${apiUrl}/h2h`, game);
}

export function getByGameId(gameId){
    return http.get(`${apiUrl}/h2h/${gameId}`)
}

export default{
    newH2h,
    getByGameId
}