import { Box, HStack, Text, useBoolean, Spinner } from "@chakra-ui/react";
import "../../styling/notificaties.css";
import { useCallback, useEffect, useState } from "react";
import Notifications from "../../type/Notifications";
import { getNotification, getNotifications } from "../../service/notifications";
import LeftPanelNotifications from "../subComponents/LeftPanelNotifications";
import ErrorMessage from "../subComponents/ErrorMessage";
import "../../styling/index.css";
import { useParams } from "react-router";
import RightPaneNotification from "../subComponents/RightPaneNotification";

export default function Notificaties() {
  let {id} = useParams();
  const [notifications, setNotifications] = useState<Notifications[]>();
  const [notification, setNotification] = useState<Notifications>();
  const [error, setError] = useState();
  const [isLoading, toggleLoading] = useBoolean();

  const _getNotifications = useCallback(async () => {
    try {
      toggleLoading.on();
      const _notifications = await getNotifications();
      setNotifications(_notifications);
      toggleLoading.off();
    } catch (error: any) {
      setError(error.message);
      toggleLoading.off();
    }
  }, [id]);

  const _getNotification = useCallback(async () => {
    try {
      if(id){

      const _notification = await getNotification(id!);
      setNotification(_notification);

      }

    } catch (error: any) {
      setError(error.message);

    }

  },[id])

  useEffect(() => {
    _getNotifications();
  }, [_getNotifications]);

  useEffect(() => {
    _getNotification();
    console.log(notifications);
  }, [_getNotification]);

  return (
    <>
      {isLoading ? (
        <Spinner className="spinner" />
      ) : (
        <>
          {error ? (
            <ErrorMessage message={error}></ErrorMessage>
          ) : (
            <HStack w="100%" ml={2} alignItems="start">
              {notifications ? (
                <LeftPanelNotifications
                  notifications={notifications ? notifications : null}
                />
              ) : (
                <Text>Er zijn geen notificaties...</Text>
              )}
              <RightPaneNotification notification={notification? notification : null}/>
            </HStack>
          )}
        </>
      )}
    </>
  );
}
