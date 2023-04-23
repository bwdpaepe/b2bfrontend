import { Text} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ChakraProvider } from "@chakra-ui/react";
import { Grid, GridItem } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import { useEffect, useMemo, useState } from "react";
import IBestelling from "../../type/IBestelling";
//import Bestelling from "./Bestelling";
import { DataTable } from "../subComponents/DataTable";
import { bestellingenByAankoper } from "../../service/bestellingen";
import "../../styling/bestellingen.css"
import User from "../../type/User";
import { BestellingStatus } from "../../enums/BestellingStatusEnum";

import "react-datepicker/dist/react-datepicker.css";

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
    let [bestellingen, setBestellingen] = useState<IBestelling[]>([]);
    const [textAankoper, setTextAankoper] = useState('');
    const [searchAankoper, setSearchAankoper] = useState('');
    const [textDatum, setTextDatum] = useState(new Date());
    const [searchDatum, setSearchDatum] = useState(new Date());
    const [textStatus, setTextStatus] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    
    useEffect(() => {
        async function fetchBestellingen() {
          const bestellingenData = await bestellingenByAankoper(); // fetch bestellingen from the API
          setBestellingen(bestellingenData); // set the fetched producten in state
        }
        fetchBestellingen();
        
      }, []);

      
    /*useEffect(() => {
      const filteredBestellingen = bestellingen.filter((b: IBestelling) =>{
        console.log("filtering...");
        return (
                b.aankoper.email.toLowerCase().includes(searchAankoper.toLowerCase())
                &&
                (searchDatum.getDate === null || b.datumGeplaatst.getDate === searchDatum.getDate)
                
                );
        })
    }, [searchAankoper, searchDatum, searchStatus]);*/

    bestellingen = bestellingen.map((bestelling:IBestelling) => {
      return {...bestelling,
              email: bestelling.aankoper.email,
              details: (<a href="#">Zie details</a>)
          };
    });

    const filteredBestellingen = useMemo(() => bestellingen.filter((b: IBestelling) =>{
      console.log("filtering...");
      console.log(b);

      
      return (
              b.aankoper.email.toLowerCase().includes(searchAankoper.toLowerCase())
              &&
              (searchDatum.getDate === new Date().getDate || b.datumGeplaatst.getDate === searchDatum.getDate)
              &&
              (searchStatus == "" || BestellingStatus[b.status] == searchStatus)
              );
      }),[bestellingen, searchAankoper, searchDatum, searchStatus]);

    

      // render a message if there are no products
      if (!bestellingen.length) {
        return <Text>No bestellingen found.</Text>;
      }

      


    
    return(
      <>
      <Grid mt='5' templateColumns='repeat(5, 1fr)' gap={6}>
  <GridItem w='100%' h='10' className='gridItem'/>
  <GridItem w='100%' h='10' className='gridItem'><input type="text" value={textAankoper} onChange={(e) => setTextAankoper(e.target.value)} className="flex-1"
placeholder="search aankoper" /></GridItem>
  <GridItem w='100%' h='10' className='gridItem'><DatePicker selected={textDatum} onChange={(date: Date) => setTextDatum(date)} /></GridItem>
  <GridItem w='100%' h='10' className='gridItem'><Select placeholder='Select option' onChange={(e) => setTextStatus(e.target.value)}>
    {
      //Object.values(BestellingStatus).map((value: string, index: number, array: string[]) => {return (<option></option>);})
      
    }
  <option key={1} value={BestellingStatus.GEPLAATST}>GEPLAATST</option>
  <option key={2} value={BestellingStatus.VERWERKT}>VERWERKT</option>
  <option key={3} value={BestellingStatus.VERZONDEN}>VERZONDEN</option>
  <option key={4} value={BestellingStatus.UIT_VOOR_LEVERING}>UIT VOOR LEVERING</option>
  <option key={5} value={BestellingStatus.GELEVERD}>GELEVERD</option>
</Select></GridItem>
  <GridItem w='100%' h='10' className='gridItem'><button type="button" onClick={()=>{
    setSearchAankoper(textAankoper);
    setSearchDatum(textDatum);
    setSearchStatus(textStatus);
  }
  }>Search</button></GridItem>
</Grid>
        <ChakraProvider>
        <DataTable columns={columns} data={filteredBestellingen} />
      </ChakraProvider>
      </>
    )
}