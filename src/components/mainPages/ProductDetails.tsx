import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { HStack, Text } from "@chakra-ui/react";
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
  useColorModeValue,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";

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
    <Flex>
      <Container maxW={"5xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 4, md: 10 }}
          py={{ base: 10, md: 24 }}
        >
          <Flex justifyContent={{ base: "space-between", sm: "center" }}>
            <Stack spacing={{ base: 6, md: 10 }}>
              {product && (
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={require(`../../assets/productafbeeldingen/${bedrijfIdString}/${product?.pictureFilename}`)}
                  fit={"cover"}
                  w={"100%"}
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                />
              )}
            </Stack>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                >
                  {product?.naam}
                </Text>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"xl"}
                  fontWeight={"300"}
                >
                  {product?.omschrijving}
                </Text>
              </VStack>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  <ListItem justifyContent={"space-between"}>
                    <HStack justifyContent={"space-between"}>
                      <Text as={"span"} fontWeight={"bold"}>
                        Prijs:
                      </Text>
                      <Text> €{product?.eenheidsprijs}</Text>
                    </HStack>
                  </ListItem>

                  <Divider orientation="horizontal" />
                  <ListItem>
                    <HStack justifyContent={"space-between"}>
                      <Text as={"span"} fontWeight={"bold"}>
                        Levertermijn:
                      </Text>
                      <Text>
                        {product?.levertermijn}{" "}
                        {product?.levertermijn === 1 ? "werkdag" : "werkdagen"}
                      </Text>
                    </HStack>
                  </ListItem>
                  <Divider orientation="horizontal" />
                  <ListItem>
                    <HStack justifyContent={"space-between"}>
                      <Text as={"span"} fontWeight={"bold"}>
                        Voorraad:
                      </Text>
                      <Text>{product?.voorraad} stuks</Text>
                    </HStack>
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center">
              <NumberInput
                defaultValue={1}
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
            </Stack>
            <Text
              color="#ec4842"
              mt={4}
              onClick={() => handleNavigate(`/producten/${bedrijfIdString}`)}
              _hover={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >{`Terug naar productoverzicht`}</Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}
