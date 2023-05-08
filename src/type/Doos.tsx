import Bedrijf from "./Bedrijf";

export default interface Doos {
  doosId: number;
  bedrijf: Bedrijf;
  type: string;
  isActief: boolean;
  naam: string;
  prijs: number;
}
