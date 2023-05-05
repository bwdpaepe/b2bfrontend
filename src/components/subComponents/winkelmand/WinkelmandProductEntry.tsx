import { Box, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import winkelmandProduct from "../../../type/WinkelmandProduct";


export default function WinkelmandProductEntry(props: {product : winkelmandProduct}){

    function handleClick(){

    };






    return(<>

    <Box className="WinkelmandProductEntry">
        <Grid className="winkelmandEntryGrid" alignItems="center">

            <GridItem><Box className="winkelmandProductNaam, underlineOnHover" onClick={() => handleClick()} cursor="pointer"> {props.product.product.naam} </Box></GridItem>
            <GridItem><Box className="winkelmandProductNaam"><Text> Aantal: <Input display="inline-block" width="50px" height="30px" defaultValue={props.product.aantal} mb="2px"></Input></Text></Box></GridItem>
            <GridItem><Box className="winkelmandProductNaam"><Text> voorraad: {props.product.product.voorraad}</Text></Box></GridItem>
            <GridItem><Box className="winkelmandProductNaam"><Text> Prijs: {props.product.product.eenheidsprijs} €</Text></Box></GridItem>
            <GridItem><Box className="winkelmandProductNaam"><Text> totaal: {props.product.subtotal.toFixed(2)} €</Text></Box></GridItem>
            
        </Grid>
    </Box>

    
    
    
    </>)
}