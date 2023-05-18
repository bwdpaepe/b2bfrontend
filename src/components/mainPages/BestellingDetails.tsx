import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Heading, Box, Text} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react';
import { useNavigate } from "react-router";

import BestellingDetail from "../../type/BestellingDetail";
import BesteldProductCard from "../subComponents/BesteldProductCard";
import { bestellingByBestellingId } from "../../service/bestellingen";
import { BestellingStatus } from "../../enums/BestellingStatusEnum";

import "../../styling/bestellingen.css"
import BesteldProducten from "../../type/BesteldProducten";
import BestellingByTrackAndTrace from "../../type/BestellingByTrackAndTrace";

export default function BestellingDetails() {
  const { bestellingIdString } = useParams();
  const [bestelling, setBestelling] = useState<BestellingDetail>();
  const [bestellingTTC, setBestellingTTC] = useState<BestellingByTrackAndTrace>();

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }
    function handleNavigateWithParams(pathname: string, bTTC: BestellingByTrackAndTrace|undefined) {
      navigate(pathname,{state:bTTC});
    }

    useEffect(() => {
    async function fetchBestelling() {
      const bestellingData = await bestellingByBestellingId(Number(bestellingIdString));
      if(bestellingData) {
        setBestelling(bestellingData);
        
        
      }
      else {
        throw Error (`kon bestelling met id ${bestellingIdString} niet ophalen`);
      }
    }
    fetchBestelling();
    
  }, [bestellingIdString]);

  useEffect(() => {
    
    if(bestelling) {
      const bTTC:BestellingByTrackAndTrace = {
        bestellingId: bestelling?.bestellingId,
        status: bestelling?.status,
        datumGeplaatst: bestelling?.datumGeplaatst,
        leveradresPostcode: bestelling?.leveradresPostcode,
        orderId: bestelling?.orderId,
        trackAndTraceCode: bestelling?.trackAndTraceCode,
        transportdienst: bestelling?.transportdienst,
        notification: bestelling?.notification
      };
      setBestellingTTC(bTTC);
    }
  }, [bestelling]);

  return(
    <Container maxW="70%" centerContent>
      <Text onClick={() => handleNavigate("/bestellingen")} _hover={{
                cursor: "pointer",
                textDecoration: "underline",
              }}>Terug naar overzicht</Text>
      <Heading>Aankoop {bestelling?.orderId}</Heading>
      <Flex direction={"column"} className={"bestellingOverzicht"}>
        <Box id="BesteldProductCardHolder">
          {bestelling?.besteldeProducten === null ? (
            <Text>Geen producten in deze bestelling</Text>
          ) : (
            bestelling?.besteldeProducten.map((entry) => (
              <BesteldProductCard
                key={entry.id}
                naam={entry.naam}
                eenheidsprijs={entry.eenheidsprijs}
                bedrijfsId={bestelling.leverancierBedrijf.bedrijfId}
                aantal={entry.aantal}
                omschrijving={entry.product.omschrijving}
                pictureFilename={entry.product.pictureFilename}
                subtotal={entry.subtotal}
              ></BesteldProductCard>
            ))
          )}
        </Box>
        <Flex className={"bestellingDetails"}>
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
          {bestelling?.trackAndTraceCode ? <Link colorScheme='red' onClick={() => handleNavigateWithParams(`/track-and-trace`, bestellingTTC)} _hover={{
                cursor: "pointer",
                textDecoration: "underline",
              }}>
            {bestelling?.trackAndTraceCode}
          </Link> : <Text>
            Track and Trace niet beschikbaar
          </Text>}
          
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
            {bestelling?.totalPrice.toFixed(2)} €
          </Text>
          </Flex>  
        </Flex>
      </Flex>
    </Container>
  );
}