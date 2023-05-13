import { Box, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import winkelmandProduct from "../../../type/WinkelmandProduct";
import { useState, useEffect } from "react";

export default function WinkelmandProductEntry(props: {
  product: winkelmandProduct;
  updateProductQuantity: (productId: number, newQuantity: number) => void;
  deleteProduct: (productId: number) => void;
}) {
  const [quantity, setQuantity] = useState(props.product.aantal);

  // useEffect is used to delay the updateProductQuantity function call and prevent it from being called too often.
  // https://usehooks-ts.com/react-hook/use-debounce
  useEffect(() => {
    console.log("useEffect in WinkelmandProductEntry to delay updateProductQuantity");
    const timer = setTimeout(() => {
      if (quantity !== props.product.aantal) {
        props.updateProductQuantity(props.product.product.productId, quantity);
      }
    }, 1000);  // 1s

    return () => clearTimeout(timer);
  }, [quantity, props]);
  
  function handleClick() {}

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleQuantityChange with value " + event.target.value);
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
        setQuantity(newQuantity);
    }
  };

  const handleDeleteClick = () => {
    props.deleteProduct(props.product.product.productId);
  };

  return (
    <>
      <Box className="WinkelmandProductEntry">
        <Grid className="winkelmandEntryGrid" alignItems="center">
          <GridItem>
            <Box
              className="winkelmandProductNaam, underlineOnHover"
              onClick={() => handleClick()}
              cursor="pointer"
            >
              {props.product.product.naam}{" "}
            </Box>
          </GridItem>
          <GridItem>
            <Box className="winkelmandProductNaam">
              <Text>
                Aantal:{" "}
                <Input
                  display="inline-block"
                  width="60px"
                  height="30px"
                  defaultValue={quantity}
                  mb="2px"
                  onChange={handleQuantityChange}
                ></Input>
              </Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box className="winkelmandProductNaam">
              <Text> voorraad: {props.product.product.voorraad}</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box className="winkelmandProductNaam">
              <Text> Prijs: {props.product.product.eenheidsprijs} €</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Box className="winkelmandProductNaam">
              <Text> totaal: {props.product.subtotal.toFixed(2)} €</Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
