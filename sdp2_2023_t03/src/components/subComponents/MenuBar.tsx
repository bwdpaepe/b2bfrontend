import { Box, HStack, Image} from "@chakra-ui/react";
import logo from "../../assets/icons/logo_red.jpg"
import MenuButtons from "./MenuButtons";
import "../../styling/menu.css"



export default function MenuBar(){
    return(
    <>
    <Box bgColor="#E0433E" w="100vw" h="115px">
        <HStack bgColor="#EC4842" h="80px">
            <Image src={logo} h="80px" w="80px" mr="40vw"></Image>
            <MenuButtons/>

        </HStack>
    </Box>
    </>
    )
}