import Bestelling from "../../type/Bestelling";
import {
  Card,
  
  Box,
} from "@chakra-ui/react";

export default function StatusCard({
  key,
  bestelling,
}: {
  key: string;
  bestelling: Bestelling;
}) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mr="2"
      mb="2"
      mt="2"
    >
      <Box>

      </Box>
    </Card>
  );
}