import { Container } from '@chakra-ui/react';


import "../../styling/trackAndTrace.css"
import TrackAndTraceFormulier from '../subComponents/TrackAndTraceFormulier';

export default function BestellingTrackAndTrace() {
  
  // firstName and lastName will have correct type

  return(
    <Container maxW="70%" centerContent>
      <TrackAndTraceFormulier/>
    </Container>
  );
}