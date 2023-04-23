import { Flex } from "@chakra-ui/react";
import LeftPanel from "../subComponents/LeftPanel";
import ProductenLijst from "../subComponents/ProductenLijst";
import { useState, useEffect } from "react";
import BedrijfProps from "../../type/BedrijfProps";
import Bedrijf from "../../type/Bedrijf";
import { getAllBedrijven } from "../../service/bedrijven";

export default function Producten({ bedrijfId }: { bedrijfId: number }) {
  const [bedrijf, setBedrijf] = useState<Bedrijf>();

  //TODO aanapassen naar getBedrijfById eens die in de service laag zit

  useEffect(() => {
    async function fetchBedrijf() {
      const bedrijfData: any = await getAllBedrijven();
      const bedrijf = bedrijfData.filter(
        (bedrijf: any) => bedrijf.bedrijfId === bedrijfId
      );
      setBedrijf(bedrijf[0]);
      console.log(bedrijf[0]);
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
