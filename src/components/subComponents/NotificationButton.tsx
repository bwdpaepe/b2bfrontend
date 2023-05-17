import {
  Box,
  Button,
  Center,
  CircularProgress,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBoolean,
} from "@chakra-ui/react";
import notificationsIcon from "../../assets/icons/Notifications.png";
import { checkNew, checkUnread } from "../../service/notifications";
import { useCallback, useContext, useEffect, useState } from "react";
import useInterval from "@use-it/interval";

import { getLimitedNotifications } from "../../service/notifications";
import { useNavigate } from "react-router";
import NotificationCardMini from "./NotificationCardMini";
import Notifications from "../../type/Notifications";
import ErrorMessage from "./ErrorMessage";
import { showNotification } from "../../util/showNotification";
import useLoggedUser from "../../util/useLoggedUser";

export default function NotificationButton() {
  const [error, setError] = useState("");
  const [unreadAmount, setUnreadAmount] = useState(0);
  const [limitedNotifications, setLimitedNotifications] =
    useState<Notifications[]>();
  const [isLoading, toggleLoading] = useBoolean();
  const [user] = useLoggedUser();

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
    window.location.reload(); // reload the page to update the notifications list
  }

  

  const _getNew = useCallback(async () => {
    if (user) {
      try {
        const _newAmount = await checkNew();
        if (_newAmount > 0) {
          showNotification("je hebt " + _newAmount + " nieuwe notificatie(s)", "info", "INFO");
          _checkUnread();
        }
      } catch (error : any) {        
        localStorage.clear();        
        showNotification("Je sessie is verlopen, log opnieuw in", "warning", "OPGELET!");
        await new Promise(resolve => setTimeout(resolve, 5000));
        navigate("/");
        window.location.reload();
        
      }

    }
  }, []);

  useInterval(_getNew, 10000);

  const _checkUnread = useCallback(async () => {
    if(user){
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
}}, []);

  useEffect(() => {
    _checkUnread();
  });

  async function handleClick() {
    try {
      toggleLoading.on();
      const _notifications = await getLimitedNotifications();
      setLimitedNotifications(_notifications);
      toggleLoading.off();
    } catch (error: any) {
      setError(error.message);
      toggleLoading.off();
    }
  }

  return (
    <>
      <Menu>
        <Button
          as={MenuButton}
          className="menuButton"
          onClick={() => handleClick()}
          display={user.length ? "flex" : "none"}
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
          {error && <ErrorMessage message={error}></ErrorMessage>}
          {isLoading && <CircularProgress isIndeterminate></CircularProgress>}
          {!error &&
            limitedNotifications &&
            limitedNotifications?.map((not) => (
              <>
                <MenuItem p="0px" m="0px"><NotificationCardMini notification={not} /></MenuItem>
              </>
            ))}
          {limitedNotifications ? (
            <MenuItem onClick={() => handleNavigate("/notificaties")}>
              Zie meer...
            </MenuItem>
          ) : (
            <MenuItem>Geen notificaties...</MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
}
