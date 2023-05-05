import http from "./http";
import authHeader from "./auth-header";
import Bedrijf from "../type/Bedrijf";

export async function getAllBedrijven() {
  try {
    const response = await http.get(`/bedrijf/all`);
    return response.data;
  } catch (error: any) {
    throw Error("er is iets misgegaan");
  }
}

export async function getBedrijfByBedrijfId(id: number) {
  try {
    const response = await http.get(`/bedrijf/find?bedrijfId=${id}`);
    return response.data;
  } catch (error: any) {
    throw Error("er is iets misgegaan");
  }
}

// getBedrijfProfile
export async function getBedrijfProfile() {
  try {
    const response = await http.get<Bedrijf>(`/profiel/`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error: any) {
    throw Error("Kon het bedrijfsprofiel niet ophalen");
  }
}

export async function getBedrijfCategorie(bedrijfId: number) {
  try {
    const response = await http.get(`/bedrijf/categories/${bedrijfId}`);
    return response.data;
  } catch (error: any) {
    throw Error("Kon de bedrijfscategorieën niet ophalen");
  }
}
