import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
export default function RandomHomeCard() {
  return (
    <Card maxW="sm" mr="2" mb="2" className="card">
      <CardBody alignSelf="center">
        <Image
          src={`/images/bedrijfAfbeelding/1.jpg`}
          alt="Dit is een random afbeelding"
        />
      </CardBody>
      <Divider />
      <CardFooter className="card-footer">
        <Text>GUI TEST BEDRIJF</Text>
      </CardFooter>
    </Card>
  );
}
