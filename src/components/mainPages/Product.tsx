import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import IProduct from "../../type/IProduct";

export default function Product(product: any) {
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        mr="2"
        mb="2"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={`/images/${product.product.pictureFilename}`}
          alt={product.product.naam}
        />
        <Stack>
          <CardBody>
            <Heading size="md">{product.product.naam}</Heading>
            <Text>{product.product.omschrijving}</Text>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Buy {product.product.naam}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
