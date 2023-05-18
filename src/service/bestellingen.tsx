import { AxiosError } from "axios";
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
    const response = await http.post("/bestellingen", null, {
      params: {
        leverancierbedrijfId: leverancierbedrijfId,
        doosId: doosId,
        leveradresStraat: leveradresStraat,
        leveradresNummer: leveradresNummer,
        leveradresPostcode: leveradresPostcode,
        leveradresStad: leveradresStad,
        leveradresLand: leveradresLand,
      },
      headers: authHeader(),
    });
    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    throw Error("Kon de bestellingen niet plaatsen.");
  }
}
export async function bestellingByBestellingId(bestellingId: number) {
  try {
    const response = await http.get(`bestellingen/${bestellingId}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
    });
    if (response.data) {
      return response.data;
    } else {
      throw Error("Kon de bestelling niet ophalen.");
    }
  } catch (error: any) {
    throw Error("Kon de bestelling niet ophalen._");
  }
}

export async function bestellingByTrackAndTrace(ttc: string, verify: string) {
  try {
    const response = await http.get(
      `bestellingen/track-and-trace?ttc=${ttc}&verify=${verify}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw Error("Kon de bestelling niet ophalen.");
    }
  } catch (error: any) {
    throw Error("Kon de bestelling niet ophalen._");
  }
}

export async function verificatieByTrackAndTrace(ttc: string) {
  try {
    const response = await http.get(`bestellingen/verificatie?ttc=${ttc}`);
    if (response.data) {
      return response.data;
    } else {
      throw Error("Kon formaat verificatiecode niet ophalen.");
    }
  } catch (error: any) {
    throw Error("Kon formaat verificatiecode niet ophalen._");
  }
}

export async function updateBestelling(
  leveradresStraat: string,
  leveradresNummer: string,
  leveradresPostcode: string,
  leveradresStad: string,
  leveradresLand: string,
  doosId: number,
  bestellingId: number
) {
  try {
    const response = await http.put(
      `bestellingen/update/${bestellingId}`,
      null,
      {
        params: {
          leveradresStraat: leveradresStraat,
          leveradresNummer: leveradresNummer,
          leveradresPostcode: leveradresPostcode,
          leveradresStad: leveradresStad,
          leveradresLand: leveradresLand,
          doosId: doosId,
        },
        headers: authHeader(),
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response.data.error) {
      throw Error(error.response.data.error);
    }
    throw Error(error);
  }
}
