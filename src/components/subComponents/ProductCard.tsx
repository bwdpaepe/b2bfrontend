import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Text,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Product from "../../type/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mr="2"
      mb="2"
      mt="2"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={`/images/productAfbeelding/${product.pictureFilename}`}
        alt={product.naam}
      />
      <Stack>
        <CardBody>
          <Heading size="md">{product.naam}</Heading>
          <Heading size="md">€{product.eenheidsprijs}</Heading>
          <Text>
            {product.omschrijving} met product ID: {product.productId} en heeft
            als voorraad: {product.voorraad}
          </Text>
        </CardBody>
        <CardFooter>
          <Flex alignItems="center">
            <NumberInput
              defaultValue={0}
              min={0}
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
            <Button variant="solid" className="button">
              <AiOutlineShoppingCart size="2.5rem" />
            </Button>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
}
