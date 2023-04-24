import { Box, Text, Image } from "@chakra-ui/react";
import { AiFillPhone, AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import Bedrijf from "../../type/Bedrijf";

function LeftPanel({ bedrijf }: { bedrijf: Bedrijf | undefined }) {
  return (
    <Box w="20%" minW="250px" minHeight="100vh" borderRight="1px solid" p="4">
      <Image
        src={`/images/bedrijfAfbeelding/${bedrijf?.logoFilename}`}
        alt="logo"
        w="50%"
        h="auto"
        mb="2"
      />
      <Text fontSize="xl">{bedrijf?.naam}</Text>
      <Text mt="4" display="flex" alignItems="center">
        <AiOutlineMail />
        <div style={{ marginLeft: "0.5rem" }}>NOG NIET IN DATABASE</div>
      </Text>
      <Text mt="4" display="flex" alignItems="center">
        <AiFillPhone />
        <div style={{ marginLeft: "0.5rem" }}>{bedrijf?.telefoonnummer}</div>
      </Text>
      <Text mt="4" display="flex" alignItems="center">
        <AiOutlineHome />{" "}
        <div style={{ marginLeft: "0.5rem" }}>
          {bedrijf?.straat} {bedrijf?.huisnummer} {bedrijf?.postcode}{" "}
          {bedrijf?.stad}
        </div>
      </Text>
    </Box>
  );
}

export default LeftPanel;
