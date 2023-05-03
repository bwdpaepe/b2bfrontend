import http from "./http";

export async function productenByBedrijfId(bedrijfId: number) {
  try {
    const response = await http.get(`/products/bedrijven/${bedrijfId}`);
    return response.data;
  } catch (error: any) {
    throw new Error("er is iets misgegaan");
  }
}

export async function productenByProductId(productId: number) {
  try {
    const response = await http.get(`/products/bedrijven/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("er is iets misgegaan");
  }
}
