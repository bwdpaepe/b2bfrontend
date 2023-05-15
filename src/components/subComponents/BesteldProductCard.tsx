import { Box, Grid, GridItem, Text, Image, Flex } from "@chakra-ui/react";

export default function BesteldProductCard(props: {
  naam: string | null;
  eenheidsprijs: number | null;
  bedrijfsId: number | null;
  aantal: number | null;
  omschrijving: string | null;
  pictureFilename: string | null;
}) {

  console.log(`../../assets/productafbeeldingen/${props.bedrijfsId}/${props.pictureFilename}`);
  return (
    <>
      <Box className="BesteldProductCard">
      <Grid className="BesteldProductGrid" alignItems="top">

<GridItem><Box> <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={require(`../../assets/productafbeeldingen/${props.bedrijfsId}/${props.pictureFilename}`)}
                  fit={"cover"}
                  w={"100%"}
                /> </Box></GridItem>
<GridItem>
  <Box h={'100%'}>
    <Flex direction={'column'} h={'100%'} justifyContent={'space-between'}>
      <Text>naam: {props.naam}</Text>
      <Text> aantal: {props.aantal}</Text>
      <Text> eenheidsprijs: {props.eenheidsprijs} €</Text>
    </Flex>
    </Box>
</GridItem>
<GridItem><Box><Text> omschrijving: {props.omschrijving}</Text></Box></GridItem>

</Grid>
      </Box>
    </>);
}