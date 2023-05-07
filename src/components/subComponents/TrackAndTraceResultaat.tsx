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
  
  const leverDatum = function(notificatieDatum: Date|undefined){
    if(notificatieDatum !== undefined)
    {
      let result = new Date(notificatieDatum);
      result.setDate(result.getDate() + 3);
      return result.toISOString().split('T')[0];
    }
    else {
      return null;
    }
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
        <Text w="20%">{bestelling?.notification.creationDate}</Text>
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