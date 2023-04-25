import { Box } from "@chakra-ui/react";
import Notifications from "../../type/Notifications";



export default function LeftPanelNotifications(props: {notifications : Notifications[] | null}){



    return(<>
    <Box w="35%"  overflow="scroll" overflowX="hidden" overflowY="auto">
        {props.notifications?.map((not) => <Box>{not.bestellingStatus}</Box>)}
    </Box>

    
    
    </>)




}