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
import Product from "../../type/Product";

export default function ProductCard({ product }: { product: Product }) {
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
          src={`/images/productAfbeelding/${product.pictureFilename}`}
          alt={product.naam}
        />
        <Stack>
          <CardBody>
            <Heading size="md">{product.naam}</Heading>
            <Text>
              {product.omschrijving} met product ID: {product.productId}
            </Text>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Buy {product.productId}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
