import { Box, Text } from "@chakra-ui/react";
import Notifications from "../../type/Notifications";






export default function NotificationCardMini(notification : {notification: Notifications}) {
    function handleClick(){
        //TODO
    }




  return (<>
    <Box id="notificationCardMini" onClick={() => handleClick()}>
        <Box display="inline-block">
        <Text>Bestelling : {notification.notification.bestellingId} Datum : {notification.notification.creationDate.substring(0,10)}</Text>
        <Text></Text>
        <Text>Status: {notification.notification.bestellingStatus.toLowerCase()} </Text>
        <Text color={notification.notification.status === "READ"? "black" : "red"} fontWeight={notification.notification.status === "NEW"? "bold" : "normal"}>{notification.notification.status.toLowerCase()} </Text>
        </Box>

        <Box borderRadius="45" bgColor="red" width="10px" height="10px" display={notification.notification.status === "NEW"? "inline-block" : "none"}></Box>

    </Box>

  
  
  
  </>);
}
