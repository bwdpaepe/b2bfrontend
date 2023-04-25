import { Box, HStack, Image, Text} from "@chakra-ui/react";
import logo from "../../assets/icons/logo_red.jpg"
import MenuButtons from "./MenuButtons";
import "../../styling/menu.css"
import { UserContext } from "../../App";
import { useContext } from "react";
import User from "../../type/User";


export default function MenuBar(){

    const userContext = useContext(UserContext);
    var user : User | null = null;
    if (userContext.length > 0) {
        user = JSON.parse(userContext);
    }
   
    
    return(
    <>
    <Box bgColor="#E0433E" w="100%" h="115px">
        <HStack bgColor="#EC4842" h="80px">
            <Image src={logo} h="80px" w="80px"></Image>
            <MenuButtons/>

        </HStack>
        <Text className="userText"> Welkom, {user? user.firstname : "Gast"} !</Text>
    </Box>
    </>
    )
}