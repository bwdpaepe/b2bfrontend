import { Flex } from "@chakra-ui/react";
import LeftPanel from "../subComponents/LeftPanel";
import ProductenLijst from "../subComponents/ProductenLijst";
import { useState, useEffect } from "react";
import Bedrijf from "../../type/Bedrijf";
import { getAllBedrijven } from "../../service/bedrijven";
import { useParams } from "react-router";

export default function Producten() {
  const { bedrijfIdString } = useParams();
  const bedrijfId = Number(bedrijfIdString);
  const [bedrijf, setBedrijf] = useState<Bedrijf>();

  //TODO aanapassen naar getBedrijfById eens die in de service laag zit

  useEffect(() => {
    async function fetchBedrijf() {
      const bedrijfData: any = await getAllBedrijven();
      const bedrijf = bedrijfData.find(
        (bedrijf: any) => bedrijf.bedrijfId === bedrijfId
      );
      setBedrijf(bedrijf);
    }
    fetchBedrijf();
  }, [bedrijfId]);

  return (
    <Flex>
      <LeftPanel bedrijf={bedrijf} />
      <ProductenLijst bedrijfId={bedrijfId} />
    </Flex>
  );
}
