import User from './User';
import { BestellingStatus } from '../enums/BestellingStatusEnum';
import Bedrijf from './Bedrijf';
import Transportdienst from './Transportdienst';
import Doos from './Doos';
import BesteldProducten from './BesteldProducten';

export default interface BestellingDetail{
  bestellingId: number;
  status: BestellingStatus;
  datumGeplaatst: Date;
  leveradresStraat: string;
  leveradresNummer: string;
  leveradresPostcode: string;
  leveradresStad: string;
  leveradresLand: string;
  orderId: string;
  trackAndTraceCode: string;
  klantnaam: string;
  leverancierBedrijf: Bedrijf;
  aankoper: User;
  transportdienst: Transportdienst;
  notification: Notification;
  besteldeProducten: BesteldProducten[];
  doos: Doos;
  totalPrice: number;
}