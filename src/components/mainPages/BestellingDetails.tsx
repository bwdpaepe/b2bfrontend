import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Box, Text} from "@chakra-ui/react";
import { Button } from '@chakra-ui/react';
import { useNavigate } from "react-router";

import BestellingDetail from "../../type/BestellingDetail";
import BesteldProductCard from "../subComponents/BesteldProductCard";
import { bestellingByBestellingId } from "../../service/bestellingen";
import { BestellingStatus } from "../../enums/BestellingStatusEnum";

import "../../styling/bestellingen.css"
import BesteldProducten from "../../type/BesteldProducten";

export default function BestellingDetails() {
  const { bestellingIdString } = useParams();
  const [bestelling, setBestelling] = useState<BestellingDetail>();

  const navigate = useNavigate();
    function handleNavigate(pathname: string) {
      navigate(pathname);
    }
    
    useEffect(() => {
    async function fetchBestelling() {
      const bestellingData = await bestellingByBestellingId(Number(bestellingIdString));
      if(bestellingData) {
        setBestelling(bestellingData);
        console.log(bestellingData);
      }
      else {
        throw Error (`kon bestelling met id ${bestellingIdString} niet ophalen`);
      }
    }
    fetchBestelling();
  }, [bestellingIdString]);

  return(
    <Container maxW="70%" centerContent>
      <Flex direction={"column"}>
        <Box id="WinkelmandCardHolder">
          <>
          {bestelling?.besteldeProducten.map((entry) => (
              <BesteldProductCard
                naam={entry.naam}
                eenheidsprijs={entry.eenheidsprijs}
                aantal={entry.aantal}
                beschrijving={entry.omschrijving}
              ></BesteldProductCard>
            ))}
          </>
        </Box>
        <Flex direction={"row"}>
          <Flex direction={"column"}>
          <Text>
            Order Id
          </Text>
          <Text>
            {bestelling?.orderId}
          </Text>
          <Text>
            Besteld op
          </Text>
          <Text>
            {bestelling?.datumGeplaatst.toString()}
          </Text>
          <Text>
            Aankoopstatus
          </Text>
          <Text>
            {BestellingStatus[bestelling ? bestelling.status : 0]}
          </Text>
          </Flex>  
          <Spacer />
          <Flex direction={"column"}>
          <Text>
            Leveradres
          </Text>
          <Text>
            Straat
          </Text>
          <Text>
            Postcode en stad
          </Text>
          <Text>
            Land
          </Text>
          <Text>
            Track en trace code
          </Text>
          <Button colorScheme='white' onClick={() => handleNavigate(`/bestellingen/${bestelling ? bestelling.bestellingId : 0}/track-and-trace`)}>
            {bestelling?.trackAndTraceCode}
          </Button>
          </Flex>  
          <Spacer />
          <Flex direction={"column"}>
          <Text>
            Verpakking
          </Text>
          <Text>
            Doos
          </Text>
          <Text>
            Leverancier
          </Text>
          <Text>
            Leverancier
          </Text>
          <Text>
            Kostenoverzicht
          </Text>
          <Text>
            Kostenoverzicht
          </Text>
          </Flex>  
        </Flex>
      </Flex>
    </Container>
  );
}