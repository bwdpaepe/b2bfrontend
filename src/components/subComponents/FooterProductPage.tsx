import { Box, Text, Image, Stack, Container } from "@chakra-ui/react";
import { AiFillPhone, AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import Bedrijf from "../../type/Bedrijf";

function FooterProductPage({ bedrijf }: { bedrijf: Bedrijf | undefined }) {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"column"} spacing={2} alignItems={"center"}>
          {bedrijf && (
            <Image
              src={require(`../../assets/companies/${bedrijf.logoFilename}`)}
              alt="logo"
              w="50%"
              h="50%"
              maxW="100%"
            />
          )}
          <Text fontSize="xl">{bedrijf?.naam}</Text>
        </Stack>

        <Text>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <AiOutlineMail />
            <Text>NOG NIET IN DATABASE</Text>
          </Stack>
        </Text>
        <Text>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <AiFillPhone />
            <Text>{bedrijf?.telefoonnummer}</Text>
          </Stack>
        </Text>
        <Text mt="4" display="flex" alignItems="center">
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <AiOutlineHome />{" "}
            <Text>
              {bedrijf?.straat} {bedrijf?.huisnummer} {bedrijf?.postcode}{" "}
              {bedrijf?.stad}
            </Text>
          </Stack>
        </Text>
      </Container>
    </Box>
  );
}

export default FooterProductPage;
