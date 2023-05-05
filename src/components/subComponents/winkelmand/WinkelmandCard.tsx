import { Box, Center, Text, Button } from "@chakra-ui/react";
import WinkelmandProduct from "../../../type/WinkelmandProduct";
import TotalPrice from "../../../type/TotalPrice";
import Product from "../../../type/Product";
import WinkelmandProductEntry from "./WinkelmandProductEntry";

export default function WinkelmandCard(props: {
  producten: WinkelmandProduct[] | null;
  totalPrice: TotalPrice | null;
  leverancier: string | null;
}) {
  async function handleBestelling() {
    //TODO
  }

  return (
    <>
      <Center>
        <Box className="WinkelmandCard">
          {props.producten === null ? (
            <Text>Je winkelmand is leeg</Text>
          ) : (
            <>
              <Text fontWeight="bold">Leverancier: {props.leverancier}</Text>
              <Text fontWeight="bold">PRODUCTEN: </Text>{" "}
              {props.producten.map((product) => (
                <WinkelmandProductEntry product={product} />
              ))}{" "}
              <Text fontWeight="bold">
                {" "}
                Levertermijn: {props.totalPrice?.levertermijn}{" "}
              </Text>
              <Text fontWeight="bold">
                {" "}
                Totaal Bedrag: {props.totalPrice?.value.toFixed(2)} €{" "}
              </Text>
              <Button className="button" onClick={() => handleBestelling()}>
                Bestellen
              </Button>
            </>
          )}
        </Box>
      </Center>
    </>
  );
}
