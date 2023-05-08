import TotalPrice from "./TotalPrice";
import User from "./User";
import winkelmandProduct from "./WinkelmandProduct";

export default interface Winkelmand {
  winkelmandProducten: winkelmandProduct[];
  totalPrice: TotalPrice[];
}
