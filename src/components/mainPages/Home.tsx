import { Box, Flex } from "@chakra-ui/react";
import "../../styling/home.css";
import { useEffect, useState } from "react";
import BedrijfHomeCard from "../subComponents/BedrijfHomeCard";
import Bedrijf from "../../type/Bedrijf";
import { getAllBedrijven } from "../../service/bedrijven";
import RandomHomeCard from "../subComponents/RandomHomeCard";

export default function Home() {
  const [bedrijven, setBedrijven] = useState<Bedrijf[]>([]);

  useEffect(() => {
    async function fetchBedrijven() {
      const bedrijvenData = await getAllBedrijven();
      setBedrijven(bedrijvenData);
    }
    fetchBedrijven();
  }, []);

  return (
    <>
      <Box w="100vw" h="50px">
        <Flex flexWrap="wrap" justifyContent="center" margin="10">
          {bedrijven.map((bedrijf) => (
            <BedrijfHomeCard key={bedrijf.bedrijfId} bedrijf={bedrijf} />
          ))}
          {[...Array(100)].map((_, i) => (
            <RandomHomeCard key={i} />
          ))}
        </Flex>
      </Box>
    </>
  );
}
