import { Box, Text } from "@chakra-ui/react";
import { getPing, getVersion } from "../../service/health";
import "../../styling/home.css";
import { useCallback, useEffect, useState } from "react";

interface healthType {
  env: string;
  version: string;
  name: string;
}

export default function Home() {
  const [_ping, setPing] = useState();
  const [_version, setVersion] = useState<healthType>();

  const healthCheck = useCallback(async () => {
    const ping = await getPing();
    setPing(ping);
    const version = await getVersion();
    setVersion(version);
    console.log(ping);
    console.log(version);
  }, []);


  useEffect(() => {
    healthCheck();
  }, [healthCheck]);

  return (
    <>
      <Box w="100vw" h="50px">
        <Text>HOME</Text>
        <Text>Reachable : {_ping ? "OK" : "waiting for ping"}</Text>
        <Text>
          Version:{" "}
          {_version
            ? _version.version + " " + _version.name
            : "Waiting for version"}
        </Text>
      </Box>
    </>
  );
}
