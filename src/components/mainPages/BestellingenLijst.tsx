import { Text} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ChakraProvider } from "@chakra-ui/react";
import { Grid, GridItem } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { Button, IconButton } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useMemo, useState } from "react";
import Bestelling from "../../type/Bestelling";
//import Bestelling from "./Bestelling";
import { DataTable } from "../subComponents/DataTable";
import { bestellingenByAankoper } from "../../service/bestellingen";
import "../../styling/bestellingen.css"
import { BestellingStatus } from "../../enums/BestellingStatusEnum";

type UnitConversion = {
    orderId: string;
    email: string;
    datumGeplaatst: Date;
    status: BestellingStatus;
    details: JSX.Element;
  };

const columnHelper = createColumnHelper<UnitConversion>();

const columns = [
    columnHelper.accessor("orderId", {
        cell: (info) => info.getValue(),
        header: "OrderID"
      }),
      columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: "Aankoper"
      }),
      columnHelper.accessor("datumGeplaatst", {
        cell: (info) => info.getValue(),
        header: "Datum geplaatst"
      }),
      columnHelper.accessor("status", {
        cell: (info) => info.getValue(),
        header: "Status"
      }),
      columnHelper.accessor("details", {
        cell: (info) => info.getValue(),
        header: "Details"
      }),
];

export default function BestellingenLijst(){
    let [bestellingen, setBestellingen] = useState<Bestelling[]>([]);
    const [textAankoper, setTextAankoper] = useState('');
    const [searchAankoper, setSearchAankoper] = useState('');
    const [textDatum, setTextDatum] = useState('');
    const [searchDatum, setSearchDatum] = useState('');
    const [textStatus, setTextStatus] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    
    useEffect(() => {
        async function fetchBestellingen() {
          const bestellingenData = await bestellingenByAankoper(); // fetch bestellingen from the API
          setBestellingen(bestellingenData); // set the fetched producten in state
        }
        fetchBestellingen();
        
      }, []);

      
    bestellingen = bestellingen.map((bestelling:Bestelling) => {
      return {...bestelling,
              email: bestelling.aankoper.email,
              details: (<Button colorScheme='white'>Zie details</Button>)
          };
    });

    const filteredBestellingen = useMemo(() => bestellingen.filter((b: Bestelling) =>{
      console.log("filtering...");
      
      return (
              b.aankoper.email.toLowerCase().includes(searchAankoper.toLowerCase())
              &&
              (searchDatum == "" || new Date(b.datumGeplaatst).getTime() === new Date(searchDatum).getTime())
              &&
              (searchStatus == "" || BestellingStatus[b.status] == searchStatus)
              );
      }),[bestellingen, searchAankoper, searchDatum, searchStatus]);

    

      // render a message if there are no products
      if (!bestellingen.length) {
        return <Text>No bestellingen found.</Text>;
      }

      


    
    return(
      <Container maxW="70%" centerContent>
      <Heading>Mijn aankopen</Heading>
      <Grid mt='20' templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem w='100%' h='10' className='gridItem'/>
        <GridItem w='100%' h='10' className='gridItem'><Input type="text" value={textAankoper} onChange={(e) => setTextAankoper(e.target.value)} className="flex-1"
      placeholder="zoek op aankoper" /></GridItem>
        <GridItem w='100%' h='10' className='gridItem'><Input type="date" value={textDatum} onChange={(e) => setTextDatum(e.target.value)} className="flex-1"
      placeholder="zoek op datum" /></GridItem>
        <GridItem w='100%' h='10' className='gridItem'>
          <Select placeholder='Selecteer status' onChange={(e) => setTextStatus(e.target.value)}>
          {
            //Object.values(BestellingStatus).map((value: string, index: number, array: string[]) => {return (<option></option>);})
            
          }
            <option key={1} value={BestellingStatus.GEPLAATST}>GEPLAATST</option>
            <option key={2} value={BestellingStatus.VERWERKT}>VERWERKT</option>
            <option key={3} value={BestellingStatus.VERZONDEN}>VERZONDEN</option>
            <option key={4} value={BestellingStatus.UIT_VOOR_LEVERING}>UIT VOOR LEVERING</option>
            <option key={5} value={BestellingStatus.GELEVERD}>GELEVERD</option>
          </Select></GridItem>
        <GridItem w='100%' h='10' className='gridItem'>
          <IconButton aria-label='Filter bestellingen' colorScheme='white' icon={<SearchIcon />} onClick={()=>{
          setSearchAankoper(textAankoper);
          setSearchDatum(textDatum);
          setSearchStatus(textStatus);
        }
        }/>
        </GridItem>
      </Grid>
      <ChakraProvider>
        <DataTable columns={columns} data={filteredBestellingen} />
      </ChakraProvider>
      </Container>
    )
}