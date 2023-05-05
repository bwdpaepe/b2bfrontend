import http from "./http";
import authHeader from "./auth-header";
import Winkelmand from "../type/Winkelmand";

export async function getWinkelmand() {
  try {
    const response = await http.get<Winkelmand>(`/winkelmand/`, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    throw new Error("er is iets misgegaan");
  }
}
