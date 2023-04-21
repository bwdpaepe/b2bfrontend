import { Text} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import IBestelling from "../../type/IBestelling";
//import Bestelling from "./Bestelling";
import { DataTable } from "../subComponents/DataTable";
import { bestellingenByAankoper } from "../../service/bestellingen";
import "../../styling/bestellingen.css"
import User from "../../type/User";
import { BestellingStatus } from "../../enums/BestellingStatusEnum";

type UnitConversion = {
    orderId: string;
    email: string;
    datumGeplaatst: Date;
    status: BestellingStatus;
    details: string;
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
    
    useEffect(() => {
        async function fetchBestellingen() {
          const bestellingenData = await bestellingenByAankoper(); // fetch bestellingen from the API
          setBestellingen(bestellingenData); // set the fetched producten in state
        }
        fetchBestellingen();
      }, []);
      // render a message if there are no products
      if (!bestellingen.length) {
        return <Text>No bestellingen found.</Text>;
      }

      bestellingen = bestellingen.map((bestelling:IBestelling) => {
        return {...bestelling,
                email: bestelling.aankoper.email
            };
      });


    
    return(
        <ChakraProvider>
        <DataTable columns={columns} data={bestellingen} />
      </ChakraProvider>
    )
}