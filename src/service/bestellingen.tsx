import http from "./http"

export async function bestellingenByAankoper(){
  try {
    const response = await http.get("bestellingen", {headers: {Authorization: "Bearer " + localStorage.getItem("Token")}});
    if(response.data) {
      return response.data;
    }
    else {
      throw Error("Kon de bestellingen niet ophalen.");
    }
  } catch (error: any) {
    throw Error("Kon de bestellingen niet ophalen._");
  }
}

export async function bestellingByBestellingId(bestellingId: number){
  try {
    const response = await http.get(`bestellingen/${bestellingId}`, {headers: {Authorization: "Bearer " + localStorage.getItem("Token")}});
    if(response.data) {
      return response.data;
    }
    else {
      throw Error("Kon de bestelling niet ophalen.");
    }
  } catch (error: any) {
    throw Error("Kon de bestelling niet ophalen._");
  }
}

export async function bestellingTrackAndTraceByBestellingId(bestellingId: number){
  try {
    const response = await http.get(`bestellingen/${bestellingId}/track-and-trace`, {headers: {Authorization: "Bearer " + localStorage.getItem("Token")}});
    if(response.data) {
      return response.data;
    }
    else {
      throw Error("Kon de bestelling niet ophalen.");
    }
  } catch (error: any) {
    throw Error("Kon de bestelling niet ophalen._");
  }
}