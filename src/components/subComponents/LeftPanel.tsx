import { Box, Text } from "@chakra-ui/react";

function LeftPanel() {
  return (
    <Box w="20%" minW="300px" minHeight="100vh" bg="gray.100" p="4">
      <Text fontSize="xl">Hier komt de info van het bedrijf</Text>
      <Text mt="4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
        faucibus arcu. Maecenas id euismod velit. Nunc auctor lacinia mauris, eu
        tincidunt nisi efficitur quis. Sed at aliquam nulla, non posuere elit.
      </Text>
    </Box>
  );
}

export default LeftPanel;
