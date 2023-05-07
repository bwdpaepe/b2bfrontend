import { Text, Stack, Spacer } from "@chakra-ui/react";

export default function ProductLine(props: {
  productNaam: string;
  productSubTotaal: number;
}) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Text fontSize={"l"}>{props.productNaam}</Text>
      <Spacer />
      <Text fontSize={"l"} alignSelf={"flex-end"}>
        €{props.productSubTotaal.toFixed(2)}
      </Text>
    </Stack>
  );
}
