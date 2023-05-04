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
          {screenWidth && (
            <GridItem>
              <Box
                borderRight="1px"
                borderColor="gray.200"
                w={{ base: "full", md: 60 }}
                pos="relative"
                h="full"
                maxWidth={{ base: "100%", md: "500px" }}
              >
                <Flex
                  alignItems="center"
                  mx="8"
                  justifyContent="space-between"
                  direction={"column"}
                  py={4}
                >
                  <NumberInput min={10} max={20}>
                    <NumberInputField defaultValue={0} />
                  </NumberInput>
                  <NumberInput min={10} max={20}>
                    <NumberInputField defaultValue={0} />
                  </NumberInput>
                  <br />
                  <Select placeholder="Select option">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                  <br />

                  <Checkbox />
                  <Text>Enkel voorradige producten?</Text>
                </Flex>
              </Box>
            </GridItem>
          )}
          <GridItem>
            <ProductenLijst bedrijfId={bedrijfId} />
          </GridItem>
        </Grid>
        <FooterProductPage bedrijf={bedrijf} />
      </Stack>
    </Flex>
  );
}
