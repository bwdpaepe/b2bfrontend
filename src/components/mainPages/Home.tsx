import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
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
        <SimpleGrid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(10, 1fr)",
          }}
          gap={1}
          p={3}
        >
          {bedrijven.map((bedrijf) => (
            <BedrijfHomeCard key={bedrijf.bedrijfId} bedrijf={bedrijf} />
          ))}
          {[...Array(100)].map((_, i) => (
            <RandomHomeCard key={i} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
