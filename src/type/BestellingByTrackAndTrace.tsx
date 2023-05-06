import { BestellingStatus } from "../enums/BestellingStatusEnum";
import Transportdienst from "./Transportdienst";
import Notification from "./Notifications";

export default interface BestellingByTrackAndTrace {
  bestellingId: number;
  status: BestellingStatus;
  datumGeplaatst: Date;
  leveradresPostcode: string;
  trackAndTraceCode: string;
  transportdienst: Transportdienst;
  notification: Notification;

}