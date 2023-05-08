import { Text, Stack, Spacer } from "@chakra-ui/react";

export default function OrderOverviewBoxLine(props: {
  doosNaam: string | undefined;
  doosPrijs: number | undefined;
}) {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <Text fontSize={"l"}>Verpakking</Text>
        <Spacer />
        <Text fontSize={"l"} alignSelf={"flex-end"}>
          €{props.doosPrijs?.toFixed(2)}
        </Text>
      </Stack>
      <Text fontSize={"xs"}>{props.doosNaam}</Text>
    </>
  );
}
