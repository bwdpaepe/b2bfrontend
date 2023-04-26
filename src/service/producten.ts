import http from "./http";

export async function productenByBedrijfId(id: number) {
  try {
    const response = await http.get(`/products/bedrijfId?bedrijfId=${id}`);
    return response.data;
  } catch (error: any) {
    throw Error("er is iets misgegaan");
  }
}
