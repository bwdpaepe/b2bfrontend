import { Flex, Grid, GridItem } from "@chakra-ui/react";
import LeftPanelProductPage from "../subComponents/FooterProductPage";
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
      <Grid>
        <GridItem>
          <ProductenLijst bedrijfId={bedrijfId} />
        </GridItem>
        <GridItem>
          <FooterProductPage bedrijf={bedrijf} />
        </GridItem>
      </Grid>
    </Flex>
  );
}
