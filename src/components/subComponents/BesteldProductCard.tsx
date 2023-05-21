import { Box, Grid, GridItem, Text, Image, Flex } from "@chakra-ui/react";

export default function BesteldProductCard(props: {
  naam: string | null;
  eenheidsprijs: number | null;
  bedrijfsId: number | null;
  aantal: number | null;
  omschrijving: string | null;
  pictureFilename: string | null;
  subtotal: number | null;
}) {

  let imageUrl;
  try {
    imageUrl = require(`../../assets/productafbeeldingen/${props.bedrijfsId}/${props.pictureFilename}`);
  } catch {
    imageUrl = require("../../assets/missing-image.jpg");
  }

  return (
    <>
      <Box className="BesteldProductCard">
        <Grid className="BesteldProductGrid" alignItems="top">
          <GridItem className={"box1"}>
            <Box>
              {" "}
              <Image
                rounded={"md"}
                alt={"product image"}
                src={imageUrl}
                fit={"cover"}
                w={"100%"}
              />{" "}
            </Box>
          </GridItem>
          <GridItem className={"box2"}>
            <Box h={"100%"}>
              <Flex
                direction={"column"}
                h={"100%"}
                className={"flex-space-between"}
              >
                <Text fontWeight="bold">Naam product</Text>
                <Text>{props.naam}</Text>
                <Text fontWeight="bold">Aantal x eenheidsprijs</Text>
                <Text>
                  {props.aantal} x {props.eenheidsprijs?.toFixed(2)} €
                </Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text fontWeight="bold">Subtotaal</Text>
                <Text>{props.subtotal?.toFixed(2)} €</Text>
              </Flex>
            </Box>
          </GridItem>

          <GridItem className={"box3"}>
            <Box>
              <Text fontWeight="bold">Omschrijving</Text>
              <Text>{props.omschrijving}</Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
