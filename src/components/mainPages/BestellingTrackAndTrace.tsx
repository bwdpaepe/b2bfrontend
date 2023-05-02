import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from '@chakra-ui/react';
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import Bestelling from "../../type/Bestelling";
import { bestellingTrackAndTraceByBestellingId } from "../../service/bestellingen";
import { BestellingStatus } from "../../enums/BestellingStatusEnum";
import StatusCard from "../subComponents/StatusCard";

export default function BestellingTrackAndTrace() {
  const { bestellingIdString } = useParams();
  const [bestelling, setBestelling] = useState<Bestelling>();
  useEffect(() => {
    async function fetchBestelling() {
      const bestellingData = await bestellingTrackAndTraceByBestellingId(Number(bestellingIdString));
      setBestelling(bestellingData);
      console.log(bestellingData);
    }
    fetchBestelling();
  }, [bestellingIdString]);
  if (!bestelling) {
    return <Text>No products found.</Text>;
  }
  return(
    <Container maxW="70%" centerContent>
      <SimpleGrid
      templateColumns={{
        base: "repeat(5, minmax(0, 1fr))",
      }}
      gap={6}
      p={3}
    >
      {Object.keys(BestellingStatus).map((status) => {
        return (<StatusCard
        key={status}
        bestelling={bestelling}
      />);
      })};
    </SimpleGrid>
    </Container>
  );
}