import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function BestellingSuccesPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        We hebben uw bestelling goed ontvangen!
      </Heading>
      <Text color={"gray.500"}>
        U kunt de huidige status van uw bestelling bekijken in uw account.
        Wanneer uw bestelling een statuswijziging heeft, ontvangt u een
        notificatie.
      </Text>
    </Box>
  );
}
