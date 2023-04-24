import { Box, Text } from "@chakra-ui/react";
import Notifications from "../../type/Notifications";






export default function NotificationCardMini(notification : {notification: Notifications}) {
    function handleClick(){
        //TODO
    }


  return (<>
    <Box id="notificationCardMini" onClick={() => handleClick()}>
        <Text>Bestelling : {notification.notification.bestellingId} Datum : {notification.notification.creationDate.substring(0,10)}</Text>
        <Text></Text>
        <Text>bestellingStatus: {notification.notification.bestellingStatus.toLowerCase()} </Text>
        <Text>{notification.notification.status.toLowerCase()} </Text>
    </Box>
  
  
  
  </>);
}
