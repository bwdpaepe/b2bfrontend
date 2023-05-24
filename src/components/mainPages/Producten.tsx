import {
  Flex,
  Grid,
  GridItem,
  Stack,
  // useBreakpointValue,
} from "@chakra-ui/react";

import ProductenLijst from "../subComponents/ProductenLijst";
import { useState, useEffect } from "react";
import Bedrijf from "../../type/Bedrijf";
import {
  getBedrijfByBedrijfId,
  getBedrijfCategorie,
} from "../../service/bedrijven";
import { useParams } from "react-router";
import FooterProductPage from "../subComponents/FooterProductPage";
import LeftFilterPanel from "../subComponents/LeftFilterPanel";
import Categorie from "../../type/Categorie";
import "../../styling/producten.css";

export default function Producten() {
  //BedrijfId
  const { bedrijfIdString } = useParams();
  const bedrijfId = Number(bedrijfIdString);

  //Screen width
  // const screenWidth = useBreakpointValue({ base: false, md: true });

  //Bedrijf states
  const [bedrijf, setBedrijf] = useState<Bedrijf>();

  //Filters states
  const [bedrijfCategorieën, setBedrijfCategorieën] = useState<Categorie[]>([]);
  const [isVoorradig, setIsVoorradig] = useState<boolean>(false);
  const [minimumPrijs, setMinimumPrijs] = useState<number>(0);
  const [maximumPrijs, setMaximumPrijs] = useState<number>(1000);
  const [geselecteerdeCategorie, setGeselecteerdeCategorie] =
    useState<string>("");

  const onVoorraadChange = (isChecked: boolean) => {
    setIsVoorradig(isChecked);
  };

  const onMinimumPrijsChange = (prijs: number) => {
    setMinimumPrijs(prijs);
  };

  const onMaximumPrijsChange = (prijs: number) => {
    setMaximumPrijs(prijs);
  };

  const onCategoriesChange = (categorie: string) => {
    setGeselecteerdeCategorie(categorie);
  };

  useEffect(() => {
    async function fetchBedrijf() {
      const bedrijfData: Bedrijf = await getBedrijfByBedrijfId(bedrijfId);
      const BedrijfCategorieData: Categorie[] = await getBedrijfCategorie(
        bedrijfId
      );
      setBedrijf(bedrijfData);
      setBedrijfCategorieën(BedrijfCategorieData);
    }
    fetchBedrijf();
  }, [bedrijfId]);
  return (
    <Flex>
      <Stack direction={"column"}>
        <Grid className="productsGrid"
          // templateColumns={{ base: "5fr", md: "250px 1fr" }}
          >
          {/* {screenWidth && ( */}
            <LeftFilterPanel
              onVoorraadChange={onVoorraadChange}
              onMinimumPrijsChange={onMinimumPrijsChange}
              onMaximumPrijsChange={onMaximumPrijsChange}
              onCategorieChange={onCategoriesChange}
              bedrijfCategorieën={bedrijfCategorieën}
            />
          {/* )} */}
          <GridItem>
            <ProductenLijst
              bedrijfId={bedrijfId}
              isVoorradig={isVoorradig}
              minimumPrijs={minimumPrijs}
              maximumPrijs={maximumPrijs}
              geselecteerdeCategorie={geselecteerdeCategorie}
            />
          </GridItem>
        </Grid>
        <FooterProductPage bedrijf={bedrijf} />
      </Stack>
    </Flex>
  );
}
