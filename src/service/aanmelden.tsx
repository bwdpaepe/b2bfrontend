import http from "./http";
import Winkelmand from "../type/Winkelmand";
import { addEditProductToWinkelmand } from "../service/winkelmand";
import { showNotification } from "../util/showNotification";

export async function login(email: String, password: String) {
  try {
    const response = await http.post("/auth/login", null, {
      headers: { Authorization: "application/JSON" },
      params: { email, password },
    });
    if (response.data.token) {
      const { bedrijf, ...user } = response.data.user;
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("Bedrijf", JSON.stringify(bedrijf));

      // push items from localstorage to database and delete 'winkelmand' from local storage if it exists
      let winkelmandFromStorage: Winkelmand | string | null =
        localStorage.getItem("winkelmand");
      if (winkelmandFromStorage) {
        console.log(
          "Starting to add products from winkelmand in local storage to database"
        );
        winkelmandFromStorage = JSON.parse(winkelmandFromStorage) as Winkelmand;
        for (const winkelmandProduct of winkelmandFromStorage.winkelmandProducten) {
          try {
            await addEditProductToWinkelmand(
              winkelmandProduct.product.productId,
              winkelmandProduct.aantal
            );
          } catch (error: any) {
            console.error("Error adding product to winkelmand:", error.message);
            showNotification(
              "Je winkelmand kon niet aangevuld worden met " +
                winkelmandProduct.product.naam +
                ". " +
                error.message,
              "warning",
              "OPGELET!"
            );
          }
        }
        localStorage.removeItem("winkelmand");
      }
    } else {
      throw Error("deze combinatie is ongeldig");
    }
  } catch (error: any) {
    throw Error("deze combinatie is ongeldig");
  }
}

export async function sessionClose() {
  await http.post("/session/end", null, {
    headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
  });
}
