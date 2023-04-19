import Bedrijf from "./Bedrijf";

export default interface Product {
  productId: number;
  eenheidsprijs: number;
  naam: string;
  bedrijf: Bedrijf;
  afbeelding: string;
  voorraad: number;
}
