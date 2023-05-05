import TotalPrice from "./TotalPrice";
import User from "./User";
import winkelmandProduct from "./WinkelmandProduct";

export default interface Winkelmand {
  winkelmandProduct: winkelmandProduct[];
  totalPrice: TotalPrice[];
}
