import { Box, Text } from "@chakra-ui/react";
import WinkelmandCard from "./WinkelmandCard";
import BedrijfProducten from "../../../type/BedrijfProducten";
import TotalPrice from "../../../type/TotalPrice";

export default function WinkelmandCardHolder(props : {winkelmand : BedrijfProducten[] | null, totalPrices: TotalPrice[]| null}){


    return(
        <>
        <Box id="WinkelmandCardHolder">

        {props.winkelmand === null? <WinkelmandCard producten={null} totalPrice = {null}/> : <>{props.winkelmand.map((entry) =><Text>{JSON.stringify(entry.producten)}</Text>)}</>}

        </Box>


        </>
    )


}