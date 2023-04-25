import { Box, HStack, Text, useBoolean} from "@chakra-ui/react";
import "../../styling/notificaties.css"
import { useCallback, useEffect, useState } from "react";
import Notifications from "../../type/Notifications";
import { getNotifications } from "../../service/notifications";
import LeftPanelNotifications from "../subComponents/LeftPanelNotifications";
import ErrorMessage from "../subComponents/ErrorMessage";



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

            
        } catch (error : any) {
            setError(error.message)
            toggleLoading.off();
            
        }
    },[])

    useEffect(() => {
        _getNotifications();
    },[_getNotifications])



    return(
    <>
    {error && <ErrorMessage message={error}></ErrorMessage>}
    <HStack w="100%">
    <LeftPanelNotifications notifications = {notifications? notifications : null}/>
    <Box ></Box>
    </HStack>
    
    </>
    )
}