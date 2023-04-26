import { Box, HStack, Text, useBoolean, Spinner } from "@chakra-ui/react";
import "../../styling/notificaties.css";
import { useCallback, useEffect, useState } from "react";
import Notifications from "../../type/Notifications";
import { getNotifications } from "../../service/notifications";
import LeftPanelNotifications from "../subComponents/LeftPanelNotifications";
import ErrorMessage from "../subComponents/ErrorMessage";
import "../../styling/index.css";

export default function Notificaties() {
  const [notifications, setNotifications] = useState<Notifications[]>();
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
  }, []);

  useEffect(() => {
    _getNotifications();
  }, [_getNotifications]);

  return (
    <>
      {isLoading ? (
        <Spinner className="spinner" />
      ) : (
        <>
          {error ? (
            <ErrorMessage message={error}></ErrorMessage>
          ) : (
            <HStack w="100%" ml={2}>
              {notifications ? (
                <LeftPanelNotifications
                  notifications={notifications ? notifications : null}
                />
              ) : (
                <Text>Er zijn geen notificaties...</Text>
              )}
              <Box></Box>
            </HStack>
          )}
        </>
      )}
    </>
  );
}
