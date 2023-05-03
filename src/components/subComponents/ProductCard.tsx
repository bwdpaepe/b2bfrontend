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
import { AiOutlineShoppingCart } from "react-icons/ai";
import Product from "../../type/Product";
import { useNavigate } from "react-router";

export default function ProductCard({
  product,
  bedrijfId,
}: {
  product: Product;
  bedrijfId: number;
}) {
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mr="2"
      mb="2"
      mt="2"
    >
      {product && (
        <Image
          objectFit="cover"
          maxW="30%"
          h={{ base: "200px", sm: "auto" }}
          src={require(`../../assets/productafbeeldingen/${bedrijfId}/${product.pictureFilename}`)}
          alt={product.naam}
        />
      )}
      <Stack direction="column">
        <CardBody>
          <Heading size="md">{product.naam}</Heading>
          <Heading size="md">€{product.eenheidsprijs}</Heading>
          {product.voorraad === 0 ? (
            <Text>{product.naam} is niet beschikbaar</Text>
          ) : (
            <Text>Voorraad: {product.voorraad} stuks</Text>
          )}

          <Text
            color="red"
            onClick={() =>
              handleNavigate(`/producten/${bedrijfId}/${product.productId}`)
            }
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {`< Details`}
          </Text>
        </CardBody>
        <CardFooter>
          {product.voorraad === 0 ? null : (
            <Flex alignItems="center" display={{ base: "none", sm: "flex" }}>
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
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}
