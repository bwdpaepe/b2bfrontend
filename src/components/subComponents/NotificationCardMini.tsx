import { Box, Text } from "@chakra-ui/react";
import Notifications from "../../type/Notifications";
import { NotificationStatusDutch, NotificationStatus } from "../../util/NotificationStatusEnum";

export default function NotificationCardMini(notification : {notification: Notifications}) {
  function handleClick(){
      //TODO
  }

  const statusDutch = NotificationStatusDutch[notification.notification.status as keyof typeof NotificationStatusDutch];

  return (<>
    <Box key={notification.notification.notificationID} id="notificationCardMini" onClick={() => handleClick()}>
      <Box display="inline-block">
        <Text>Bestelling : {notification.notification.bestellingId} </Text>
        <Text>Datum : {notification.notification.creationDate.substring(0,10)}</Text>
        <Text>Status: {notification.notification.bestellingStatus.toLowerCase()} </Text>
        <Text color={notification.notification.status === NotificationStatus.READ? "black" : "red"} fontWeight={notification.notification.status === NotificationStatus.NEW.toString() ? "bold" : "normal"}>{statusDutch} </Text>
      </Box>
      <Box borderRadius="45" bgColor="red" width="10px" height="10px" display={notification.notification.status === NotificationStatus.NEW ? "inline-block" : "none"}></Box>
    </Box>
  </>);
}
