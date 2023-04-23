import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import BedrijfProps from "../../type/BedrijfProps";
export default function BedrijfHomeCard(bedrijf: BedrijfProps) {
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    console.log(pathname);
    navigate(pathname);
  }

  return (
    <Card
      maxW="sm"
      mr="2"
      mb="2"
      onClick={() => handleNavigate(`/producten/${bedrijf.bedrijf.bedrijfId}`)}
    >
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Text>{bedrijf.bedrijf.naam}</Text>
      </CardFooter>
    </Card>
  );
}
