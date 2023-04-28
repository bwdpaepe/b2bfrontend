import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export default function ProductDetails() {
  const { bedrijfIdString } = useParams();
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }

  return (
    <div>
      <h1>ProductDetails</h1>
      <Text
        color="red"
        onClick={() => handleNavigate(`/producten/${bedrijfIdString}`)}
        _hover={{ cursor: "pointer", textDecoration: "underline" }}
      >{`< Terug`}</Text>
    </div>
  );
}
