import User from "./User";
import { BestellingStatus } from "../enums/BestellingStatusEnum";
import Bedrijf from "./Bedrijf";
import Doos from "./Doos";

export default interface IBestelling {
  bestellingId: number;
  aankoper: User;
  status: BestellingStatus;
  datumGeplaatst: Date;
  orderId: string;
  trackAndTraceCode: string;
  leveradresStraat: string;
  leveradresNummer: string;
  leveradresPostcode: string;
  leveradresStad: string;
  leveradresLand: string;
  leverancierBedrijf: Bedrijf;
  doos: Doos;
  details: JSX.Element;
  wijzigen: JSX.Element;
  email: string;
}
