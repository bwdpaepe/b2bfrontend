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

export default function LeftFilterPanel({
  onVoorraadChange,
  onMaximumPrijsChange,
  onMinimumPrijsChange,
}: {
  onVoorraadChange: any;
  onMaximumPrijsChange: any;
  onMinimumPrijsChange: any;
}) {
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
          <Text>Minimum prijs</Text>
          <NumberInput min={0} defaultValue={0}>
            <NumberInputField
              onChange={(e) => onMinimumPrijsChange(Number(e.target.value))}
            />
          </NumberInput>
          <br />
          <Text>Maximum prijs</Text>
          <NumberInput min={0} defaultValue={1000}>
            <NumberInputField
              value={1000}
              onChange={(e) => onMaximumPrijsChange(Number(e.target.value))}
            />
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
            <Checkbox
              size="lg"
              width="1.5rem"
              onChange={(e) => onVoorraadChange(e.target.checked)}
            />
          </Stack>
        </Flex>
      </Box>
    </GridItem>
  );
}
