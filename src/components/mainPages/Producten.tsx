import {
  Flex,
  Grid,
  GridItem,
  Box,
  Text,
  Stack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
  Switch,
  NumberInput,
  NumberInputField,
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
              pos="fixed"
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
                <Text>
                  Enkel voorradige producten?
                  <Switch />
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
