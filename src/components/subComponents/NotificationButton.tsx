import { Box, Button } from "@chakra-ui/react";
import notifications from "../../assets/icons/Notifications.png"
import { checkUnread } from "../../service/notifications";
import { useCallback, useEffect, useState } from "react";
import {Store} from 'react-notifications-component'

export default function NotificationButton() {
    const [error, setError] = useState("");
    const [unreadAmount, setUnreadAmount] = useState(0);


    function _checkNew(){
        Store.addNotification({
            title: "INFO!",
            message: "Je hebt een nieuwe notificatie",
            type: "info",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
            }
          });
    }



    const _checkUnread = useCallback( async() =>{
        try {
            const _unreadAmount : number = await checkUnread();
            setUnreadAmount(_unreadAmount);
            
        } catch (error: any) {
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        _checkUnread()
    })




  return (
    <>
      <Button
        className="menuButton"
        onClick={() => {
          _checkNew();
        }}
      >
        <Box id="notificationButton" bgImage={notifications} >
          <Box id="notificationTip" display={unreadAmount > 0? "block" : "none"}>{unreadAmount}</Box>
        </Box>
      </Button>
    </>
  );
}
