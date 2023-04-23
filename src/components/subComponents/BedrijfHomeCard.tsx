import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Bedrijf from "../../type/Bedrijf";
export default function BedrijfHomeCard({ bedrijf }: { bedrijf: Bedrijf }) {
  console.log(bedrijf.logoFilename);
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    console.log(pathname);
    navigate(pathname);
  }
  //TODO logo's bedrijven aanpassen en toevoegen
  return (
    <Card
      maxW="sm"
      mr="2"
      mb="2"
      onClick={() => handleNavigate(`/producten/${bedrijf.bedrijfId}`)}
    >
      <CardBody>
        <Image
          src={`/images/bedrijfAfbeelding/${bedrijf.logoFilename}`}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Text>{bedrijf.naam}</Text>
      </CardFooter>
    </Card>
  );
}
