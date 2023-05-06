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
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Product from "../../type/Product";
import { addProductToWinkelmand } from "../../service/winkelmand";

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

  const handleButtonClick = async () => {
    if (user) {
      try {
        // Call addProductToWinkelmand with productId and quantity
        await addProductToWinkelmand(product.productId, quantity);
        setSuccessMessage("Product added to winkelmand successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000); // to clear the message after 5 seconds
      } catch (error: any) {
        console.log("Error when adding product to winkelmand: " + error.message);
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); // to clear the message after 5 seconds
      }
    } 

  };

  return (
    <>
      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
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
        mt={4}
        py={"4"}
        w={"full"}
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
        onClick={handleButtonClick}
      >
        <AiOutlineShoppingCart size="2.5rem" />
      </Button>
    </>
  );
}
