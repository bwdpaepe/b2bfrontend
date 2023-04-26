import { Box } from "@chakra-ui/react";
import Notifications from "../../type/Notifications";
import NotificationCardMini from "./NotificationCardMini";



export default function LeftPanelNotifications(props: {notifications : Notifications[] | null}){



    return(<>
    <Box w="35%" maxW="400px" mt="10px" h="80vh" id="leftPaneNotifications" overflow="scroll" overflowX="hidden" overflowY="auto">
        {props.notifications?.map((not) => <NotificationCardMini notification={not}/>)}
    </Box>

    
    
    </>)




}