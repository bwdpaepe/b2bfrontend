import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Box, Text} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react';
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
        <Box id="BesteldProductCardHolder">
          {bestelling?.besteldeProducten === null ? (
            <Text>Geen producten in deze bestelling</Text>
          ) : (
            bestelling?.besteldeProducten.map((entry) => (
              <BesteldProductCard
                naam={entry.naam}
                eenheidsprijs={entry.eenheidsprijs}
                bedrijfsId={bestelling.leverancierBedrijf.bedrijfId}
                aantal={entry.aantal}
                omschrijving={entry.product.omschrijving}
                pictureFilename={entry.product.pictureFilename}
              ></BesteldProductCard>
            ))
          )}
        </Box>
        <Flex direction={"row"} className={"bestellingDetails"}>
          <Flex direction={"column"}>
          <Text fontWeight="bold">
            Order Id
          </Text>
          <Text>
            {bestelling?.orderId}
          </Text>
          <Text fontWeight="bold">
            Besteld op
          </Text>
          <Text>
            {bestelling?.datumGeplaatst.toString()}
          </Text>
          <Text fontWeight="bold">
            Aankoopstatus
          </Text>
          <Text>
            {bestelling?.status}
          </Text>
          </Flex>  
          <Spacer />
          <Flex direction={"column"}>
          <Text fontWeight="bold">
            Leveradres
          </Text>
          <Text>
            {bestelling?.leveradresStraat} {bestelling?.leveradresNummer}
          </Text>
          <Text>
            {bestelling?.leveradresPostcode} {bestelling?.leveradresStad}
          </Text>
          <Text>
            {bestelling?.leveradresLand}
          </Text>
          <Text fontWeight="bold">
            Track en trace code
          </Text>
          <Link colorScheme='red' onClick={() => handleNavigate(`/track-and-trace`)}>
            {bestelling?.trackAndTraceCode}
          </Link>
          </Flex>  
          <Spacer />
          <Flex direction={"column"}>
          <Text fontWeight="bold">
            Verpakking
          </Text>
          <Text>
            {bestelling?.doos.naam}
          </Text>
          <Text fontWeight="bold">
            Leverancier
          </Text>
          <Text>
            {bestelling?.leverancierBedrijf.naam}
          </Text>
          <Text fontWeight="bold">
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