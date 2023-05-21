import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Button,
  Select,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
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

  const { onOpen, onClose, isOpen } = useDisclosure();

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

      const response = await updateBestelling(
        straat.value,
        nummer.value,
        postcode.value,
        stad.value,
        land.value,
        doosId,
        bestelling.bestellingId
      );
      console.log(response);

      toast({
        title: `${response.message}`,
        description: `Bestelling ${bestelling.bestellingId} is gewijzigd`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Er is iets misgegaan",
        description: `${error}`,
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
    <Popover
      onClose={onClose}
      closeOnBlur={true}
      isOpen={isOpen}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Wijzig bestelling"
          size="sm"
          colorScheme="white"
          icon={<EditIcon />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverHeader fontWeight="bold">
            Wijzig bestelling {bestelling.bestellingId}
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton color="white" />
          <VStack p={2}>
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
                <FormLabel mt={2}>Stad</FormLabel>
                <Input type="text" defaultValue={bestelling.leveradresStad} />
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Postcode</FormLabel>
                <Input
                  type="text"
                  defaultValue={bestelling.leveradresPostcode}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Straat</FormLabel>
                <Input type="text" defaultValue={bestelling.leveradresStraat} />
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Nummer</FormLabel>
                <Input type="text" defaultValue={bestelling.leveradresNummer} />
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Dozen</FormLabel>
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
              </FormControl>
              <HStack spacing={4} mt={4} p={2}>
                <Button colorScheme="green" type="submit">
                  Submit
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Cancel
                </Button>
              </HStack>
            </form>
          </VStack>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
}
