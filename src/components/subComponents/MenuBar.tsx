import { Box, HStack, Image, Text} from "@chakra-ui/react";
import logo from "../../assets/icons/logo_red.jpg"
import MenuButtons from "./MenuButtons";
import "../../styling/menu.css"
import useLoggedUser from "../../util/useLoggedUser";
import User from "../../type/User";


export default function MenuBar(){

    const [user] = useLoggedUser();
    
    let loggedInUser : User | null = null
    if (user.length) {
        loggedInUser = JSON.parse(user);
    }
   
    
    return(
    <>
    <Box bgColor="#E0433E" w="100%" h="115px">
        <HStack bgColor="#EC4842" h="80px">
            <Image src={logo} h="80px" w="80px"></Image>
            <MenuButtons/>

        </HStack>
        <Text className="userText"> Welkom, {loggedInUser? loggedInUser.firstname : "Gast"} !</Text>
    </Box>
    </>
    )
}