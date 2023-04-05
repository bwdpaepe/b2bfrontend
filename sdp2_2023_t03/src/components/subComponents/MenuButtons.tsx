import { Box, Button, HStack, Image } from "@chakra-ui/react";
import home from "../../assets/icons/Home.png"
import cart from "../../assets/icons/Cart.png"
import order from "../../assets/icons/order.png"
import notificiations from "../../assets/icons/Notifications.png"
import profile from "../../assets/icons/profile.png"

export default function MenuButtons() {
  return (
    <>
      <HStack w="100%" spacing="0">
        <Box w="100%" h="80px">
            <HStack spacing="5%">
                <Button className="menuButton"><Image src = {home} boxSize='80px' fit="fill"></Image></Button>
                <Button className="menuButton"><Image src= {cart} boxSize='80px' fit="fill"></Image></Button>
                <Button className="menuButton"><Image src= {order} boxSize='80px' fit="fill"/></Button>
                <Button className="menuButton"><Image src= {notificiations} boxSize='80px' fit="fill"/></Button>
            </HStack>
        </Box>
        <Box bgColor="blue">
        <Button className="menuButton"><Image src= {profile} boxSize='80px' fit="fill"/></Button>
        </Box>
      </HStack>
    </>
  );
}
