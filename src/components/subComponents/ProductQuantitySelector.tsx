import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Alert,
  AlertIcon,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Product from "../../type/Product";
import { addProductToWinkelmand } from "../../service/winkelmand";
import Winkelmand from "../../type/Winkelmand";
import TotalPrice from "../../type/TotalPrice";
import winkelmandProduct from "../../type/WinkelmandProduct";

interface ProductQuantitySelectorProps {
  product: Product;
}

export default function ProductQuantitySelector({
  product,
}: ProductQuantitySelectorProps) {
  const user = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const succesMessageText = "Product toegevoegd aan winkelmand.";

  const handleButtonClick = async () => {
    if (user) {
      // if user is logged in, add product to winkelmand in database
      try {
        // Call addProductToWinkelmand with productId and quantity
        await addProductToWinkelmand(product.productId, quantity);
        setSuccessMessage(succesMessageText);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000); // to clear the message after 5 seconds
      } catch (error: any) {
        console.log(
          "Error when adding product to winkelmand: " + error.message
        );
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); // to clear the message after 5 seconds
      }
    } else {
      // if user is not logged in, add product to winkelmand in local storage
      try {
        // get or create local storage item 'winkelmand'
        let winkelmand: Winkelmand | string | null =
          localStorage.getItem("winkelmand");
        console.log("Before if: " + winkelmand);
        if (winkelmand) {
          winkelmand = JSON.parse(winkelmand) as Winkelmand;
          console.log("Existing winkelmand: " + winkelmand.toString());
        } else {
          winkelmand = { winkelmandProducten: [], totalPrice: [] };
          console.log("New winkelmand: " + winkelmand.toString());
        }
        // Add product to winkelmandProducten (or update quantity if product already exists in winkelmandProducten)
        const productIndex = winkelmand.winkelmandProducten.findIndex(
          (item: winkelmandProduct) =>
            item.product.productId === product.productId
        );

        if (productIndex > -1) {
          winkelmand.winkelmandProducten[productIndex].aantal += quantity;
          // if new quantity is higher than voorraad, set winkelmand.winkelmandProducten[productIndex].aantal to voorraad
          if (
            winkelmand.winkelmandProducten[productIndex].aantal >
            product.voorraad
          ) {
            winkelmand.winkelmandProducten[productIndex].aantal =
              product.voorraad;
          }
          winkelmand.winkelmandProducten[productIndex].subtotal =
            winkelmand.winkelmandProducten[productIndex].aantal *
            product.eenheidsprijs;
        } else {
          winkelmand.winkelmandProducten.push({
            aantal: quantity,
            product,
            subtotal: product.eenheidsprijs * quantity,
          });
        }

        // Update totalPrice
        const priceIndex = winkelmand.totalPrice.findIndex(
          (item: TotalPrice) => item.bedrijfId === product.bedrijf.bedrijfId
        );

        if (priceIndex > -1) {
          winkelmand.totalPrice[priceIndex].value +=
            product.eenheidsprijs * quantity;
        } else {
          winkelmand.totalPrice.push({
            bedrijfId: product.bedrijf.bedrijfId,
            value: product.eenheidsprijs * quantity,
            levertermijn: product.levertermijn,
          });
        }

        localStorage.setItem("winkelmand", JSON.stringify(winkelmand));
        console.log("After adding product to winkelmand: " + winkelmand);

        setSuccessMessage(succesMessageText);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000); // to clear the message after 5 seconds
      } catch (error: any) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); // to clear the message after 5 seconds
      }
    }
  };

  return (
    <>
      <VStack spacing={4} alignItems="flex-start">
      {successMessage && (
          <Alert status="success">
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
        <Flex flexDirection="row" alignItems="center">
          <NumberInput
            defaultValue={1}
            min={1}
            max={product.voorraad}
            variant="filled"
            focusBorderColor="#ec4842"
            onChange={(value) => setQuantity(Number(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            variant="solid"
            className="button"
            ml={4}
            py={"4"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={handleButtonClick}
          >
            <AiOutlineShoppingCart size="2.5rem" />
          </Button>
        </Flex>
      </VStack>
    </>
  );
}
