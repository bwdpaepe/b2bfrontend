import {useEffect, useState} from  "react";

import { Container } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';

import "../../styling/trackAndTrace.css";
import BestellingByTrackAndTrace from "../../type/BestellingByTrackAndTrace";
import TrackAndTraceFormulier from '../subComponents/TrackAndTraceFormulier';
import TrackAndTraceResultaat from '../subComponents/TrackAndTraceResultaat';

export default function BestellingTrackAndTrace() {
  const [bestelling, setBestelling] = useState<BestellingByTrackAndTrace>();

  useEffect(() => {
    setBestelling(undefined); 
  }, []);

  const handleBackToForm = () => {
      window.location.reload(); // reload the page to set the state to undefined
    
  };

  if (bestelling === undefined) {
  return(
    <Container maxW="70%" centerContent>
      <Heading>Track & trace gegevens</Heading>
      <TrackAndTraceFormulier setBestelling={setBestelling} />
    </Container>
    
  );
  }
  else {
    return(
      <Container maxW="70%" centerContent>
        <Text onClick={handleBackToForm}>Terug naar formulier</Text>
        <Heading>Track & trace gegevens van aankoop {bestelling.orderId}</Heading>
        <TrackAndTraceResultaat bestelling={bestelling}/>
      </Container>
    );
  }
}