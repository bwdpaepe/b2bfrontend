import { Box, Center, Text, Button } from "@chakra-ui/react";
import WinkelmandProduct from "../../../type/WinkelmandProduct";
import TotalPrice from "../../../type/TotalPrice";

export default function WinkelmandCard(props: {
  producten: WinkelmandProduct[] | null, totalPrice : TotalPrice[] | null;
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
              <Text><Text fontWeight="bold">PRODUCTEN: </Text>{JSON.stringify(props.producten)} <Text fontWeight="bold"> PRIJS: </Text>{JSON.stringify(props.totalPrice)}</Text>
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
