import { Flex, Grid, GridItem, Box, Text, Stack } from "@chakra-ui/react";

import ProductenLijst from "../subComponents/ProductenLijst";
import { useState, useEffect } from "react";
import Bedrijf from "../../type/Bedrijf";
import { getBedrijfByBedrijfId } from "../../service/bedrijven";
import { useParams } from "react-router";
import FooterProductPage from "../subComponents/FooterProductPage";

export default function Producten() {
  const { bedrijfIdString } = useParams();
  const bedrijfId = Number(bedrijfIdString);
  const [bedrijf, setBedrijf] = useState<Bedrijf>();

  useEffect(() => {
    async function fetchBedrijf() {
      const bedrijfData: Bedrijf = await getBedrijfByBedrijfId(bedrijfId);
      setBedrijf(bedrijfData);
    }
    fetchBedrijf();
  }, [bedrijfId]);

  return (
    <Flex>
      <Stack direction={"column"}>
        <Grid templateColumns={{ base: "5fr", md: "250px 1fr" }}>
          <GridItem>
            <Box
              borderRight="1px"
              borderColor="gray.200"
              w={{ base: "full", md: 60 }}
              pos="relative"
              h="full"
              maxWidth={{ base: "100%", md: "500px" }}
            >
              <Flex alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                  Hier komen de filters en dit is een test om te kijken indien
                  de tekst te lang is of het dan wel goed gaat
                </Text>
              </Flex>
            </Box>
          </GridItem>
          <GridItem>
            <ProductenLijst bedrijfId={bedrijfId} />
          </GridItem>
        </Grid>
        <FooterProductPage bedrijf={bedrijf} />
      </Stack>
    </Flex>
  );
}
