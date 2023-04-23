import { Box, Text } from "@chakra-ui/react";
import Bedrijf from "../../type/Bedrijf";

function LeftPanel({ bedrijf }: { bedrijf: Bedrijf | undefined }) {
  return (
    <Box w="20%" minW="300px" minHeight="100vh" bg="gray.100" p="4">
      <Text fontSize="xl">{bedrijf?.naam}</Text>
      <Text mt="4">Telefoonnummer: {bedrijf?.telefoonnummer}</Text>
      <Text mt="4">
        Adres: {bedrijf?.straat} {bedrijf?.huisnummer} {bedrijf?.postcode}{" "}
        {bedrijf?.stad}
      </Text>
    </Box>
  );
}

export default LeftPanel;
