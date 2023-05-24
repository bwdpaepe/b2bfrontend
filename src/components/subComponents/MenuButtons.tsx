import { Box, Button, HStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import home from "../../assets/icons/Home.png";
import cart from "../../assets/icons/Cart.png";
import order from "../../assets/icons/order.png";
import delivery from "../../assets/icons/delivery.png";
import AanmeldModal from "./AanmeldModal";
import NotificationButton from "./NotificationButton";
import useLoggedUser from "../../util/useLoggedUser";

export default function MenuButtons() {
 const [user] = useLoggedUser();

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }

  return (
    <>
      <HStack w="100%" spacing="0">
        <Box w="100%" h="80px">
          <HStack spacing="5%">
            <Button
              className="menuButton"
              onClick={() => {
                handleNavigate("/");
              }}
            >
              <Image src={home} boxSize="80px" fit="fill"></Image>
            </Button>
            <Button
              className="menuButton"
              onClick={() => {
                handleNavigate("winkelmand");
              }}
            >
              <Image src={cart} boxSize="80px" fit="fill"></Image>
            </Button>
            <Button
              className="menuButton"
              display={user.length ? "flex" : "none"}
              onClick={() => {
                handleNavigate("bestellingen");
              }}
            >
              <Image
                src={order}
                boxSize="80px"
                fit="fill"
                
              />
            </Button>
            <NotificationButton />
            <Button
              className="menuButton"
              onClick={() => {
                handleNavigate("track-and-trace");
              }}
            >
              <Image src={delivery} boxSize="80px" fit="fill"></Image>
            </Button>
          </HStack>
        </Box>
        <Box bgColor="blue">
          <AanmeldModal />
        </Box>
      </HStack>
    </>
  );
}
