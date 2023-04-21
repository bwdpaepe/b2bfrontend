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
import ProductProps from "../../type/ProductProps";

export default function Product({ product }: ProductProps) {
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
          src={`/images/${product.pictureFilename}`}
          alt={product.naam}
        />
        <Stack>
          <CardBody>
            <Heading size="md">{product.naam}</Heading>
            <Text>{product.omschrijving}</Text>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Buy {product.naam}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
