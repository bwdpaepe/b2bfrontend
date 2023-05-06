import { Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import { BestellingStatus } from '../../enums/BestellingStatusEnum';
import TrackAndTraceCard from "./TrackAndTraceCard";
import BestellingByTrackAndTrace from "../../type/BestellingByTrackAndTrace";

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isInteger(+k)) as K[];
}

export default function TrackAndTraceResultaat(props: {bestelling: BestellingByTrackAndTrace | undefined}){
  const { bestelling } = props;
  return(
    <Flex direction={"column"}>
      <Flex direction={"row"}>
        {enumKeys(BestellingStatus)
               .map((status: string) => {
          return(<TrackAndTraceCard status={status} bestellingStatus={bestelling?.status}></TrackAndTraceCard>)
          })
        }
      </Flex>
      <Flex direction={"row"}>
        <Text mr="20"
      mb="2"
      mt="2">Uw bestelling ligt in het afhaalpunt en kan afgehaald worden</Text>
        <Text mr="20"
      mb="2"
      mt="2">{bestelling ? bestelling.status : 'GEPLAATST'}</Text>
        <Text mr="20"
      mb="2"
      mt="2">{bestelling?.notification.creationDate}</Text>
      </Flex>
      <Flex direction={"row"}>
        <Text mr="20"
      mb="2"
      mt="2">Uw bestelling wordt geleverd door Transportdienst {bestelling?.transportdienst.naam}</Text>
        <Text mr="20"
      mb="2"
      mt="2">Verwachte leverdatum</Text>
        <Text mr="20"
      mb="2"
      mt="2"></Text>
      </Flex>
    </Flex>
  );
}