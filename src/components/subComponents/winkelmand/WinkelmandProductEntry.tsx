import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  // Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import winkelmandProduct from "../../../type/WinkelmandProduct";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router";

export default function WinkelmandProductEntry(props: {
  product: winkelmandProduct;
  updateProductQuantity: (productId: number, newQuantity: number) => void;
  deleteProduct: (productId: number) => void;
}) {
  const [quantity, setQuantity] = useState(props.product.aantal);

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }
  // useEffect is used to delay the updateProductQuantity function call and prevent it from being called too often.
  // https://usehooks-ts.com/react-hook/use-debounce
  useEffect(() => {
    console.log(
      "useEffect in WinkelmandProductEntry to delay updateProductQuantity"
    );
    const timer = setTimeout(() => {
      if (quantity !== props.product.aantal) {
        props.updateProductQuantity(props.product.product.productId, quantity);
      }
    }, 300); // 0.3s

    return () => clearTimeout(timer);
  }, [quantity, props]);

  // function handleClick() {}

  //   const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log("handleQuantityChange with value " + event.target.value);
  //     const newQuantity = parseInt(event.target.value);
  //     if (!isNaN(newQuantity)) {
  //       setQuantity(newQuantity);
  //     }
  //   };

  const handleQuantityChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    console.log("handleQuantityChange with value " + valueAsNumber);
    if (!isNaN(valueAsNumber)) {
      setQuantity(valueAsNumber);
    }
  };

  const handleDeleteClick = () => {
    // if confirmed, call deleteProduct function
    // else do nothing
    if (
      window.confirm(
        "Weet je zeker dat je " +
          props.product.product.naam +
          " uit je winkelmand wilt verwijderen?"
      )
    ) {
      props.deleteProduct(props.product.product.productId);
    }
  };

  return (
    <>
      <Box className="WinkelmandProductEntry">
        <Grid className="winkelmandEntryGrid" alignItems="center">
          <GridItem>
            <Box
              className="winkelmandProductNaam, underlineOnHover"
              onClick={() =>
                handleNavigate(
                  `/producten/${props.product.product.bedrijf.bedrijfId}/${props.product.product.productId}`
                )
              }
              cursor="pointer"
            >
              {props.product.product.naam}{" "}
            </Box>
          </GridItem>
          <GridItem>
            <Box className="winkelmandProductNaam">
              {/* <Text>
                Aantal:{" "}
                <Input
                  display="inline-block"
                  width="60px"
                  height="30px"
                  defaultValue={quantity}
                  mb="2px"
                  onChange={handleQuantityChange}
                ></Input>
              </Text> */}
              <Flex flexDirection="row" alignItems="center">
                <Text mr={1}>Aantal: </Text>
                <NumberInput
                  display="inline-block"
                  width="80px"
                  height="30px"
                  alignContent={"center"}
                  mb={"10px"}
                  //mb="20px"
                  value={quantity}
                  min={1}
                  max={props.product.product.voorraad}
                  variant="filled"
                  focusBorderColor="#ec4842"
                  onChange={handleQuantityChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper mt={1.5} />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
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
          <GridItem>
            <Button
              variant="solid"
              className="button"
              width="60px"
              ml={4}
              py={"4"}
              _hover={{
                //transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={handleDeleteClick}
            >
              <AiFillDelete size="2.5rem" />
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
