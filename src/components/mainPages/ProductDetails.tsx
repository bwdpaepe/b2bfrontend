import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../../type/Product";
import { productenByProductId } from "../../service/producten";
import {
  Box,
  Container,
  Stack,
  Image,
  Flex,
  VStack,
  Button,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";

export default function ProductDetails() {
  const { bedrijfIdString, productIdString } = useParams();
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function fetchProduct() {
      const productData = await productenByProductId(Number(productIdString));
      setProduct(productData);
    }
    fetchProduct();
  }, [productIdString]);
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex justifyContent="center">
          <Stack spacing={{ base: 6, md: 10 }}>
            {product && (
              <Image
                rounded={"md"}
                alt={"product image"}
                src={require(`../../assets/productafbeeldingen/${bedrijfIdString}/${product?.pictureFilename}`)}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            )}
          </Stack>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {product?.naam}
              </Text>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {product?.omschrijving} met product ID: {product?.productId} en
                heeft als voorraad: {product?.voorraad}. Aangeboden door bedrijf
                met ID: {bedrijfIdString}.
              </Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Between lugs:
                  </Text>{" "}
                  20 mm
                </ListItem>
                <ListItem>
                  <Stack direction="row" alignItems="center">
                    <MdLocalShipping />
                    <Text>2-3 business days delivery</Text>
                  </Stack>
                </ListItem>
                <ListItem>
                  <Text
                    color="red"
                    onClick={() =>
                      handleNavigate(`/producten/${bedrijfIdString}`)
                    }
                    _hover={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >{`< Terug`}</Text>
                </ListItem>
              </List>
            </Box>
          </Stack>
          <NumberInput
            defaultValue={0}
            min={0}
            max={product?.voorraad}
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
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            <AiOutlineShoppingCart size="2.5rem" />
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
