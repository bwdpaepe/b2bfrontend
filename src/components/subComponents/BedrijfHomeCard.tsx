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
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }
  return (
    <Card
      maxW="sm"
      mr="2"
      mb="2"
      onClick={() => handleNavigate(`/producten/${bedrijf.bedrijfId}`)}
      className="card"
      _hover={{
        cursor: "pointer",
        boxShadow: "md",
        transform: "scale(1.01)",
      }}
    >
      <CardBody alignSelf="center">
        <Image
          src={`/images/bedrijfAfbeelding/${bedrijf.logoFilename}`}
          alt={`${bedrijf.naam}`}
        />
      </CardBody>
      <Divider />
      <CardFooter className="card-footer">
        <Text>{bedrijf.naam}</Text>
      </CardFooter>
    </Card>
  );
}
