import {useEffect, useState} from  "react";

import { Container } from '@chakra-ui/react';

import "../../styling/trackAndTrace.css";
import BestellingByTrackAndTrace from "../../type/BestellingByTrackAndTrace";
import TrackAndTraceFormulier from '../subComponents/TrackAndTraceFormulier';
import TrackAndTraceResultaat from '../subComponents/TrackAndTraceResultaat';

export default function BestellingTrackAndTrace() {
  const [bestelling, setBestelling] = useState<BestellingByTrackAndTrace>();

  useEffect(() => {
    setBestelling(undefined); // set the fetched producten in state 
  }, []);

  if (bestelling === undefined) {
  return(
    <Container maxW="70%" centerContent>
      <TrackAndTraceFormulier setBestelling={setBestelling} />
    </Container>
    
  );
  }
  else {
    return(
      <Container maxW="70%" centerContent>
        <TrackAndTraceResultaat bestelling={bestelling}/>
      </Container>
    );
  }
}