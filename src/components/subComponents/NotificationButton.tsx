import { Box, Button } from "@chakra-ui/react";
import notifications from "../../assets/icons/Notifications.png";
import { checkNew, checkUnread } from "../../service/notifications";
import { useCallback, useContext, useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import useInterval from "@use-it/interval";
import { UserContext } from "../../App";
import { useNavigate } from "react-router";
import AanmeldModal from "./AanmeldModal";

export default function NotificationButton() {
  const [error, setError] = useState("");
  const [unreadAmount, setUnreadAmount] = useState(0);

  const navigate = useNavigate();
  function handleNavigate(pathname: string){
    navigate(pathname);
  }

  const userContext = useContext(UserContext);

  const _getNew = useCallback(async () => {
    if (userContext.length > 0) {
        const _newAmount = await checkNew();
        if (_newAmount > 0) {
          showNotification(_newAmount);
          _checkUnread();
        }
    }

  }, []);

  useInterval(_getNew, 10000);

  function showNotification(amount : number) {
    Store.addNotification({
      title: "INFO!",
      message: "Je hebt " + amount + " nieuwe notificatie(s)",
      type: "info",
      insert: "top",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
  }

  const _checkUnread = useCallback(async () => {
    try {
      const _unreadAmount: number = await checkUnread();
      if (_unreadAmount > 99) {
        setUnreadAmount(99);
      } else {
        setUnreadAmount(_unreadAmount);
      }
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    _checkUnread();
  });

  return (
    <>
      <Button className="menuButton" onClick={() => {handleNavigate("/notificaties")}} display={userContext.length > 0 ? "flex" : "none"}>
        <Box id="notificationButton" bgImage={notifications}>
          <Box
            id="notificationTip"
            display={unreadAmount > 0 ? "block" : "none"}
          >
            {unreadAmount}
          </Box>
        </Box>
      </Button>
    </>
  );
}
