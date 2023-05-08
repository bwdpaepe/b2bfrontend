import http from "./http";

export async function getAllDozenfromBedrijf(bedrijfId: number) {
  try {
    const response = await http.get(`/dozen/bedrijf/${bedrijfId}`);
    return response.data;
  } catch (error: any) {
    throw Error("er is iets misgegaan");
  }
}
