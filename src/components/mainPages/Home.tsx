import { Box, SimpleGrid } from "@chakra-ui/react";
import "../../styling/home.css";
import { useEffect, useState } from "react";
import BedrijfHomeCard from "../subComponents/BedrijfHomeCard";
import Bedrijf from "../../type/Bedrijf";
import { getAllBedrijven } from "../../service/bedrijven";

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
    <Box w="100vw" h="50px" alignSelf="center">
      <SimpleGrid
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gridGap="1rem"
        p={["1rem", "1rem", "1rem", "1rem", "1rem", "1rem"]}
        justifyContent="center"
        gridAutoRows={["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]}
      >
        {bedrijven.map((bedrijf) => (
          <BedrijfHomeCard key={bedrijf.bedrijfId} bedrijf={bedrijf} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
