import BesteldProductenProduct from "./BesteldProductenProduct";

export default interface BesteldProducten {
  id: number;
  aantal: number;
  eenheidsprijs: number;
  naam: string;
  product: BesteldProductenProduct;
  subtotal: number;
}
