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

  console.log(`../../assets/productafbeeldingen/${props.bedrijfsId}/${props.pictureFilename}`);
  return (
    <>
      <Box className="BesteldProductCard">
      <Grid className="BesteldProductGrid" alignItems="top">

<GridItem className={"box1"}><Box> <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={require(`../../assets/productafbeeldingen/${props.bedrijfsId}/${props.pictureFilename}`)}
                  fit={"cover"}
                  w={"100%"}
                /> </Box></GridItem>
<GridItem className={"box2"}>
  <Box h={'100%'}>
    <Flex direction={'column'} h={'100%'} className={"flex-space-between"}>
      <Text>{props.naam}</Text>
      <Text>{props.aantal} x {props.eenheidsprijs?.toFixed(2)} €</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text>{props.subtotal?.toFixed(2)} €</Text>
    </Flex>
    </Box>
</GridItem>
<GridItem className={"box3"}><Box><Text>{props.omschrijving}</Text></Box></GridItem>

</Grid>
      </Box>
    </>);
}