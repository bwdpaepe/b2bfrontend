import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Notifications from "../../type/Notifications";



export default function RightPaneNotification(props: {notification : Notifications | null}){



    return(<>
    
    {props.notification? <Box id="rightPaneNotification" display="block" mt="100px">
        <Grid id="notificatieGrid" padding="5px" pt="10%" gap="10px">
            <GridItem><Text fontWeight="bold" color="red">Bestelling nummer </Text> {props.notification.bestellingId}</GridItem>
            <GridItem><Text fontWeight="bold" color="red">Track and Trace code </Text> {props.notification.trackAndTraceCode? props.notification.trackAndTraceCode : "Nog geen code toegewezen"}</GridItem>
            <GridItem><Text fontWeight="bold" color="red">Bestelling Status: </Text>{props.notification.bestellingStatus}</GridItem>
            <GridItem><Text fontWeight="bold" color="red">Geplaatst op:  </Text> {props.notification.creationDate.slice(0,10)}</GridItem>
        </Grid>

    </Box> : <></>}


    
    
    </>)


}