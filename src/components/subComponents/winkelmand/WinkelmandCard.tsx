import { Box, Center, Text, Button, useToast } from "@chakra-ui/react";
import WinkelmandProduct from "../../../type/WinkelmandProduct";
import TotalPrice from "../../../type/TotalPrice";
import WinkelmandProductEntry from "./WinkelmandProductEntry";
import useLoggedUser from "../../../util/useLoggedUser";
import User from "../../../type/User";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function WinkelmandCard(props: {
  producten: WinkelmandProduct[] | null;
  totalPrice: TotalPrice | null;
  leverancier: string | null;
  leverancierId: number | null;
}) {
  const [user] = useLoggedUser();
  const toast = useToast();
  let loggedInUser: User | null = null;
  if (user.length) {
    loggedInUser = JSON.parse(user);
  }
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }

  async function handleBestelling() {
    if (!loggedInUser) {
      toast({
        title: "Je bent niet ingelogd",
        description: "Log in om een bestelling te plaatsen",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });

      return;
    }
    handleNavigate(
      `/bestelling/${props?.leverancierId}/${loggedInUser?.userId}`
    );
  }

  return (
    <>
      <Center>
        <Box className="WinkelmandCard">
          {props.producten === null ? (
            <Text>Je winkelmand is leeg</Text>
          ) : (
            <>
              <Text fontWeight="bold">Leverancier: {props.leverancier}</Text>
              <Text fontWeight="bold">PRODUCTEN: </Text>{" "}
              {props.producten.map((product) => (
                <WinkelmandProductEntry product={product} />
              ))}{" "}
              <Text fontWeight="bold">
                {" "}
                Levertermijn: {props.totalPrice?.levertermijn || -1}
                {(props.totalPrice?.levertermijn || 0) > 1
                  ? " werkdagen"
                  : " werkdag"}
              </Text>
              <Text fontWeight="bold">
                {" "}
                Totaal Bedrag: {props.totalPrice?.value.toFixed(2)} €{" "}
              </Text>
              <Button className="button" onClick={() => handleBestelling()}>
                Bestellen
              </Button>
            </>
          )}
        </Box>
      </Center>
    </>
  );
}
