import authHeader from "./auth-header";
import http from "./http";

export async function bestellingenByAankoper() {
  try {
    const response = await http.get("bestellingen", {
      headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
    });
    if (response.data) {
      return response.data;
    } else {
      throw Error("Kon de bestellingen niet ophalen.");
    }
  } catch (error: any) {
    throw Error("Kon de bestellingen niet ophalen._");
  }
}

export async function postBestellingen(
  leverancierbedrijfId: string,
  doosId: number,
  leveradresStraat: string,
  leveradresNummer: string,
  leveradresPostcode: string,
  leveradresStad: string,
  leveradresLand: string
) {
  try {
    const response = await http.post(
      `bestellingen?leverancierbedrijfId=${leverancierbedrijfId}&doosId=${doosId}&leveradresStraat=${leveradresStraat}&leveradresNummer=
      ${leveradresNummer}&leveradresPostcode=${leveradresPostcode}&leveradresStad=${leveradresStad}&leveradresLand=${leveradresLand}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    throw Error("Kon de bestellingen niet plaatsen.");
  }
}
