import User from "./User";
import { BestellingStatus } from "../enums/BestellingStatusEnum";

export default interface IBestelling {
  bestellingId: number;
  aankoper: User;
  status: BestellingStatus;
  datumGeplaatst: Date;
  orderId: string;
  trackAndTraceCode: string;
  details: JSX.Element;
  wijzigen: JSX.Element;
  email: string;
}
