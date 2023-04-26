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