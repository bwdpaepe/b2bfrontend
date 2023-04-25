import { Box, HStack, Text, useBoolean} from "@chakra-ui/react";
import "../../styling/notificaties.css"
import { useCallback, useEffect, useState } from "react";
import Notifications from "../../type/Notifications";
import { getNotifications } from "../../service/notifications";
import LeftPanelNotifications from "../subComponents/LeftPanelNotifications";



export default function Notificaties(){
    const [notifications, setNotifications] = useState<Notifications[]>();
    const [error, setError] = useState();
    const [isLoading, toggleLoading] = useBoolean();


    const _getNotifications = useCallback(async() => {
        try {
            toggleLoading.on();
            const _notifications = await getNotifications();
            setNotifications(_notifications);
            toggleLoading.off();

            
        } catch (error) {
            
        }
    },[])

    useEffect(() => {
        _getNotifications();
    },[_getNotifications])



    return(
    <>
    <HStack w="100%">
    <LeftPanelNotifications notifications = {notifications? notifications : null}/>
    <Box w="65%"></Box>
    </HStack>
    
    </>
    )
}