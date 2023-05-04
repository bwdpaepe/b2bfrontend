import Bedrijf from "./Bedrijf";
import Categorie from "./Categorie";

export default interface Product {
  productId: number;
  eenheidsprijs: number;
  naam: string;
  bedrijf: Bedrijf;
  pictureFilename: string;
  voorraad: number;
  omschrijving: string;
  levertermijn: number;
  categorie: Categorie;
}
