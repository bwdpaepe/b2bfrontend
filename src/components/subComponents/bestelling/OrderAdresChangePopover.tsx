import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import Bestelling from "./../../../type/Bestelling";
import { FormEvent, useEffect, useState } from "react";
import Doos from "../../../type/Doos";
import { getAllDozenfromBedrijf } from "../../../service/dozen";
import { updateBestelling } from "../../../service/bestellingen";

export default function OrderAdresChangePopover({
  bestelling,
}: {
  bestelling: Bestelling;
}) {
  const [dozen, setDozen] = useState<Doos[]>([]);
  const toast = useToast();

  const [selectedDoos, setSelectedDoos] = useState<Doos>(bestelling.doos);

  const onDoosChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoosId = Number(event.target.value);
    const newSelectedDoos = dozen.find(
      (doos) => doos.doosId === selectedDoosId
    );
    setSelectedDoos(newSelectedDoos!);
  };

  const onHandleUpdateAdres = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const [land, stad, postcode, straat, nummer] = Array.from(
        target.elements
      ) as HTMLInputElement[];
      const doosId = selectedDoos?.doosId || bestelling.doos.doosId;

      await updateBestelling(
        straat.value,
        nummer.value,
        postcode.value,
        stad.value,
        land.value,
        doosId,
        bestelling.bestellingId
      );
      console.log("bestelling.bestellingId", doosId);
      toast({
        title: "Bestelling gewijzigd",
        description: `Bestelling ${bestelling.bestellingId} is gewijzigd`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: `${error} `,
        description: "Er is iets misgegaan",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    async function getDozen(bestelling: Bestelling) {
      const dozen = await getAllDozenfromBedrijf(
        bestelling.leverancierBedrijf.bedrijfId
      );
      setDozen(dozen);
    }
    getDozen(bestelling);
  }, [bestelling]);
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="Wijzig bestelling"
          size="sm"
          colorScheme="white"
          icon={<EditIcon />}
        />
      </PopoverTrigger>
      <PopoverContent p={3}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton color="white" />
          <PopoverHeader>Wijzig bestelling</PopoverHeader>
          <Stack spacing={3} mt={2}>
            <form
              onSubmit={(e) => {
                onHandleUpdateAdres(e);
              }}
            >
              <FormControl>
                <FormLabel>Land</FormLabel>
                <Input type="text" defaultValue={bestelling.leveradresLand} />
              </FormControl>
              <FormControl>
                <FormLabel>Stad</FormLabel>
                <Input type="text" defaultValue={bestelling.leveradresStad} />
              </FormControl>
              <FormControl>
                <FormLabel>Postcode</FormLabel>
                <Input
                  type="text"
                  defaultValue={bestelling.leveradresPostcode}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Straat</FormLabel>
                <Input type="text" defaultValue={bestelling.leveradresStraat} />
              </FormControl>
              <FormControl>
                <FormLabel>Nummer</FormLabel>
                <Input type="text" defaultValue={bestelling.leveradresNummer} />
              </FormControl>
              <FormControl>
                <FormLabel>Dozen</FormLabel>
                <Select
                  placeholder={selectedDoos?.naam}
                  onChange={(e) => {
                    onDoosChange(e);
                  }}
                >
                  {dozen.map((doos) => (
                    <option value={doos.doosId}>{doos.naam}</option>
                  ))}
                </Select>
                <Button colorScheme="green" type="submit">
                  Submit
                </Button>
              </FormControl>
            </form>
          </Stack>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
}
