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
          src="/images/porduct_picture1.jpg"
          alt="Caffe Latte"
        />
        <Stack>
          <CardBody>
            <Heading size="md">TEST</Heading>
            <Text>This a to test a product</Text>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Buy Latte
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
