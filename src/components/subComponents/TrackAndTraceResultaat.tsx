import { Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { BestellingStatus } from '../../enums/BestellingStatusEnum';
import TrackAndTraceCard from "./TrackAndTraceCard";
import BestellingByTrackAndTrace from "../../type/BestellingByTrackAndTrace";
import TRACK_AND_TRACE_DATA from '../../util/TrackAndTraceData';
import enumKeys from '../../util/Util';

export default function TrackAndTraceResultaat(props: {bestelling: BestellingByTrackAndTrace | undefined}){
  const { bestelling } = props;

  const statusIndex = function(status: BestellingStatus | undefined){
    if(status !== undefined){
      return parseInt(BestellingStatus[status]);
    }
    return 0;
  }
  
  const statusMelding = function(statusId: number){
    if(0<=statusId && statusId<=4){
      return TRACK_AND_TRACE_DATA[statusId];
    }
    else return "";
  }
  
  // options for date and time formatting
  const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }; // format: DD/MM/YYYY
  const timeOptions: Intl.DateTimeFormatOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }; // format: HH:MM:SS 24h

  const leverDatum = function(bestellingDatum: Date|undefined){
    if(bestellingDatum === undefined)
    {
      return "N/A";
    }
    let result = new Date(bestellingDatum);
    result.setDate(result.getDate() + bestelling?.levertermijn!); 
    // return result.toISOString().split('T')[0];
    const dateString = result.toLocaleDateString("fr-FR", dateOptions); // format: DD/MM/YYYY
    return dateString;

  };

  const convertDateTime = (isoDateTime: string|undefined): string => {
    // Check if the date and time are defined
    if(isoDateTime === undefined){
      return "";
    }
    const date = new Date(isoDateTime);
    
    // Format the date and time 
    const dateString = date.toLocaleDateString("fr-FR", dateOptions); 
    const timeString = date.toLocaleTimeString("fr-FR", timeOptions); 
  
    return `${dateString} ${timeString}`;
  };


  return(
    <Flex className={"ttc-resultaat"} direction={"column"}>
      <Flex direction={"row"}>
        {enumKeys(BestellingStatus)
               .map((status: string) => {
          return(<TrackAndTraceCard key={status} status={status} bestellingStatus={bestelling?.status}></TrackAndTraceCard>)
          })
        }
      </Flex>
      <Flex mt='20' direction={"row"} justify="space-between" wrap={"wrap"}>
        <Text w="50%">{statusMelding(statusIndex(bestelling?.status))}</Text>
        <Text w="20%">{bestelling ? bestelling.status : 'GEPLAATST'}</Text>
        <Text w="20%">{convertDateTime(bestelling?.notification.creationDate)}</Text>
      </Flex>
      <Divider orientation='horizontal' />
      <Flex mt='20' direction={"row"} justify="space-between" wrap={"wrap"}>
        <Text w="50%">Uw bestelling wordt geleverd door Transportdienst {bestelling?.transportdienst.naam}</Text>
        <Text w="20%">Verwachte leverdatum</Text>
        <Text w="20%">{leverDatum(bestelling?.datumGeplaatst)}</Text>
      </Flex>
    </Flex>
  );
}