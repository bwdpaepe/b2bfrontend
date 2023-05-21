import { Box, Text, Heading, Button } from "@chakra-ui/react";
import "../../styling/home.css";

export default function Home() {
  return (
    <>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400, red.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Pagina niet gevonden
        </Text>
        <Text color={"gray.500"} mb={6}>
          De pagina die u probeert te bereiken bestaat niet.
        </Text>

        <Button
          onClick={() => (window.location.href = "/")}
          colorScheme="red"
          bgGradient="linear(to-r, red.400, red.500, red.600)"
          color="white"
          variant="solid"
        >
          Homepagina
        </Button>
      </Box>
    </>
  );
}
