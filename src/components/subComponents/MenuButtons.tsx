import { Box, Button, HStack, Image} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import home from "../../assets/icons/Home.png"
import cart from "../../assets/icons/Cart.png"
import order from "../../assets/icons/order.png"
import notificiations from "../../assets/icons/Notifications.png"
import AanmeldModal from "./AanmeldModal";


export default function MenuButtons() {


  const navigate = useNavigate();
  function handleNavigate(pathname: string){
    navigate(pathname);
  }

  return (
    <>
      <HStack w="100%" spacing="0">
        <Box w="100%" h="80px">
            <HStack spacing="5%">
                <Button className="menuButton" onClick={() => {handleNavigate("/")}}><Image src = {home} boxSize='80px' fit="fill"></Image></Button>
                <Button className="menuButton" onClick={() => {handleNavigate("winkelmand")}}><Image src= {cart} boxSize='80px' fit="fill"></Image></Button>
                <Button className="menuButton" onClick={() => {handleNavigate("bestellingen")}}><Image src= {order} boxSize='80px' fit="fill"/></Button>
                <Button className="menuButton" onClick={() => {handleNavigate("notificaties")}}><Image src= {notificiations} boxSize='80px' fit="fill"/></Button>
            </HStack>
        </Box>
        <Box bgColor="blue">
        <AanmeldModal></AanmeldModal>
        </Box>
      </HStack>
    </>
  );
}
