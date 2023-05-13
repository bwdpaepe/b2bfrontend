import http from "./http";
import authHeader from "./auth-header";
import Winkelmand from "../type/Winkelmand";

export async function getWinkelmand() {
  try {
    const response = await http.get<Winkelmand>(`/winkelmand/`, { headers: authHeader() });
    return response.data;
  } catch (error: any) {
    throw new Error("er is iets misgegaan");
  }
}

// PUT .../winkelmand/addProduct/66/10, where 66 is the productId and 10 is the quantity
export async function addEditProductToWinkelmand(productId: number, quantity: number, isUpdate?: boolean) {
  try {
    // If `update` is not provided, it will be false.
    console.log("isUpdate: " + isUpdate);
    const isUpdateBoolean = isUpdate !== undefined ?  isUpdate  : false;
    console.log("isUpdateBoolean: " + isUpdateBoolean);

    const response = await http.put(`/winkelmand/addProduct/${productId}/${quantity}`, null, {
      params: {
        isUpdate: isUpdateBoolean,
      }, 
      headers: authHeader() 
    });
    console.log("Log from winkelmand service: " + response.data);
    return response.data;
  } catch (error: any) {
    console.log("Log from winkelmand service: " + error);
    throw new Error(error.response.data.error);
  }
}
