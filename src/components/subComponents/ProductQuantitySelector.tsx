import React , { useContext } from "react";
import { UserContext } from "../../App";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Product from "../../type/Product";

interface ProductQuantitySelectorProps {
  product: Product;
}

export default function ProductQuantitySelector({
  product,
}: ProductQuantitySelectorProps) {

  const user = useContext(UserContext);
  
  return (
    <>
      <NumberInput
        defaultValue={1}
        min={1}
        max={product.voorraad}
        variant="filled"
        focusBorderColor="#ec4842"
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
      >
        <AiOutlineShoppingCart size="2.5rem" />
      </Button>
    </>
  );
};

