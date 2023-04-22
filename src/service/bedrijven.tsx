import http from "./http";

export async function getAllBedrijven() {
  try {
    const response = await http.get(`/bedrijf/all`);
    return response.data;
  } catch (error: any) {
    throw Error("er is iets misgegaan");
  }
}
