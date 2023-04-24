import {
  Box,
  Button,
  Center,
  CircularProgress,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import notificationsIcon from "../../assets/icons/Notifications.png";
import { checkNew, checkUnread } from "../../service/notifications";
import { useCallback, useContext, useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import useInterval from "@use-it/interval";
import { UserContext } from "../../App";
import {getLimitedNotifications} from "../../service/notifications"
import { useNavigate } from "react-router";
import { forEach, forIn } from "lodash";
import NotificationCardMini from "./NotificationCardMini";
import Notifications from "../../type/Notifications";


export default function NotificationButton() {
  const [error, setError] = useState("");
  const [unreadAmount, setUnreadAmount] = useState(0);
  const [limitedNotifications, setLimitedNotifications] = useState<Notifications[]>();
  const [isLoading, toggleLoading] = useBoolean();

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
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

  function showNotification(amount: number) {
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
        onScreen: true,
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

  async function handleClick(){
    try {
      toggleLoading.on();
      const _notifications = await getLimitedNotifications();
      setLimitedNotifications(_notifications);
      toggleLoading.off();
    } catch (error) {
      setError("Er ging iets mis bij het laden van de notificiaties")
    }


  }

  return (
    <><Menu>
      <Button
        as = {MenuButton}
        className="menuButton"
        onClick={() => handleClick()}
        display={userContext.length > 0 ? "flex" : "none"}
      >

      <Center>
        <Box id="notificationButton" bgImage={notificationsIcon}>
          <Box
            id="notificationTip"
            display={unreadAmount > 0 ? "block" : "none"}
          >
            {unreadAmount}
          </Box>
        </Box>
        </Center>
      </Button>
      <MenuList>
        {isLoading && <CircularProgress isIndeterminate></CircularProgress>}
        {limitedNotifications?.map(not => <><NotificationCardMini notification={not}/></>)}
        <MenuItem onClick={() => handleNavigate("/notificaties")}>Zie meer...</MenuItem>
        


      </MenuList>

      </Menu>
    </>
  );
}
