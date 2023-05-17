import { Box, Grid, GridItem } from "@chakra-ui/react";
import Notifications from "../../type/Notifications";



export default function RightPaneNotification(props: {notification : Notifications | null}){



    return(<>
    
    {props.notification? <Box id="rightPaneNotification" display="block" mt="100px">
        <Grid id="notificatieGrid" padding="5px" pt="10%" gap="10px">
            <GridItem>Je bestellings nummer: {props.notification.bestellingId}</GridItem>
            <GridItem>Track and Trace code: {props.notification.trackAndTraceCode? props.notification.trackAndTraceCode : "Nog geen code toegewezen"}</GridItem>
            <GridItem>Bestelling Status: {props.notification.bestellingStatus}</GridItem>
            <GridItem>Ontvangen op: {props.notification.creationDate.slice(0,10)}</GridItem>
        </Grid>

    </Box> : <></>}


    
    
    </>)


}