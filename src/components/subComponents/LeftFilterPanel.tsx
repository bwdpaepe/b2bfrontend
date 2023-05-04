import {
  Flex,
  GridItem,
  Box,
  Text,
  Select,
  NumberInput,
  NumberInputField,
  Checkbox,
  Stack,
} from "@chakra-ui/react";

export default function LeftFilterPanel() {
  return (
    <GridItem>
      <Box
        borderRight="1px"
        borderColor="gray.200"
        w={{ base: "full", md: 60 }}
        pos="relative"
        h="full"
        maxWidth={{ base: "100%", md: "500px" }}
      >
        <Flex
          alignItems="center"
          mx="8"
          justifyContent="space-between"
          direction={"column"}
          py={4}
        >
          <NumberInput min={10} max={20}>
            <NumberInputField defaultValue={0} />
          </NumberInput>
          <NumberInput min={10} max={20}>
            <NumberInputField defaultValue={0} />
          </NumberInput>
          <br />
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <br />
          <Stack direction={"row"}>
            <Text>Enkel voorradige producten</Text>
            <Checkbox size="lg" width="1.5rem" />
          </Stack>
        </Flex>
      </Box>
    </GridItem>
  );
}
