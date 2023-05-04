import {
  Flex,
  Grid,
  GridItem,
  Box,
  Text,
  Stack,
  Select,
  NumberInput,
  NumberInputField,
  Checkbox,
  useBreakpointValue,
} from "@chakra-ui/react";

import ProductenLijst from "../subComponents/ProductenLijst";
import { useState, useEffect } from "react";
import Bedrijf from "../../type/Bedrijf";
import { getBedrijfByBedrijfId } from "../../service/bedrijven";
import { useParams } from "react-router";
import FooterProductPage from "../subComponents/FooterProductPage";
import LeftFilterPanel from "../subComponents/LeftFilterPanel";

export default function Producten() {
  const { bedrijfIdString } = useParams();
  const bedrijfId = Number(bedrijfIdString);
  const [bedrijf, setBedrijf] = useState<Bedrijf>();
  const screenWidth = useBreakpointValue({ base: false, md: true });

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
          {screenWidth && <LeftFilterPanel />}
          <GridItem>
            <ProductenLijst bedrijfId={bedrijfId} />
          </GridItem>
        </Grid>
        <FooterProductPage bedrijf={bedrijf} />
      </Stack>
    </Flex>
  );
}
