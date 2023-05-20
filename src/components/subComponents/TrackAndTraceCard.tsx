import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import delivery_black from "../../assets/icons/delivery_black.png";
import { BestellingStatus } from "../../enums/BestellingStatusEnum";

const statusCode = function(inputStatus: string){
  if (inputStatus === "UIT_VOOR_LEVERING"){
    return 'UIT VOOR LEVERING';
  }
  return inputStatus;
}

export default function TrackAndTraceCard(props: {
  status: string;
  bestellingStatus: BestellingStatus|undefined;
}) {
  
  let currentStatus = false;
  if(props.bestellingStatus !== undefined){
    currentStatus = parseInt(props.status) === parseInt(BestellingStatus[props.bestellingStatus]);
  }
  
  let statusColor = "#333333";
  if(props.bestellingStatus !== undefined && parseInt(props.status) <= parseInt(BestellingStatus[props.bestellingStatus])){
    statusColor = "#EC4842"
  }
  

  return (
    <Card
      direction={"column"}
      overflow="hidden"
      variant="outline"
      mr="2"
      mb="2"
      mt="2"
      width="20%"
    >
      <Stack direction="column">
        <CardBody 
          bgColor={statusColor}
          minHeight="120px"
        >
          {currentStatus && <Image src={delivery_black} boxSize="80px" fit="fill"></Image>}
        </CardBody>
        <CardFooter className="ttc-card-footer">
          <Text className="ttc-status">{statusCode(BestellingStatus[parseInt(props.status)])}</Text>
        </CardFooter>
      </Stack>
    </Card>
  );
}
