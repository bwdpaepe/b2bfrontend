import {
  Flex,
  Grid,
  GridItem,
  Stack,
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

  const [isVoorradig, setIsVoorradig] = useState<boolean>(false);
  const [minimumPrijs, setMinimumPrijs] = useState<number>(0);
  const [maximumPrijs, setMaximumPrijs] = useState<number>(1000);

  const onVoorraadChange = (isChecked: boolean) => {
    setIsVoorradig(isChecked);
  };

  const onMinimumPrijsChange = (prijs: number) => {
    setMinimumPrijs(prijs);
  };

  const onMaximumPrijsChange = (prijs: number) => {
    setMaximumPrijs(prijs);
  };

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
            <LeftFilterPanel
              onVoorraadChange={onVoorraadChange}
              onMinimumPrijsChange={onMinimumPrijsChange}
              onMaximumPrijsChange={onMaximumPrijsChange}
            />
          )}
          <GridItem>
            <ProductenLijst
              bedrijfId={bedrijfId}
              isVoorradig={isVoorradig}
              minimumPrijs={minimumPrijs}
              maximumPrijs={maximumPrijs}
            />
          </GridItem>
        </Grid>
        <FooterProductPage bedrijf={bedrijf} />
      </Stack>
    </Flex>
  );
}
