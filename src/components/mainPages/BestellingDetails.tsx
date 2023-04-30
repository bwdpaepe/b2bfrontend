import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react'
import Bestelling from "../../type/Bestelling";
import { bestellingByBestellingId } from "../../service/bestellingen";

export default function BestellingDetails() {
  const { bestellingIdString } = useParams();
  
  const [bestelling, setBestelling] = useState<Bestelling>();

  useEffect(() => {
    async function fetchBestelling() {
      const bestellingData = await bestellingByBestellingId(Number(bestellingIdString));
      setBestelling(bestellingData);
    }
    fetchBestelling();
  }, [bestellingIdString]);

  return(
    <Container maxW="70%" centerContent>
      <Flex direction={"column"}>

      </Flex>
    </Container>
  );
}