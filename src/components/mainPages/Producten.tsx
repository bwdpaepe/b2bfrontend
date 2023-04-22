import { Flex } from "@chakra-ui/react";
import LeftPanel from "../subComponents/LeftPanel";
import ProductenLijst from "../subComponents/ProductenLijst";

export default function Producten() {
  return (
    <Flex>
      <LeftPanel />
      <ProductenLijst />
    </Flex>
  );
}
