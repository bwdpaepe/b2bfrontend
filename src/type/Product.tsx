import Bedrijf from "./Bedrijf";

export default interface Product {
  productId: number;
  eenheidsprijs: number;
  naam: string;
  bedrijf: Bedrijf;
  pictureFilename: string;
  voorraad: number;
  omschrijving: string;
}
