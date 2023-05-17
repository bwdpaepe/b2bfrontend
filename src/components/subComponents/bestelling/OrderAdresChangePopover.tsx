import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Stack,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import Bestelling from "./../../../type/Bestelling";
import { useState } from "react";

export default function OrderAdresChangePopover({
  bestelling,
}: {
  bestelling: Bestelling;
}) {
  const [popoverBestelling, setPopoverBestelling] =
    useState<Bestelling>(bestelling);

  const onclick = () => {
    console.log(JSON.stringify(popoverBestelling));
  };
  return (
    console.log(JSON.stringify(bestelling)),
    (
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Wijzig bestelling"
            size="sm"
            colorScheme="white"
            icon={<EditIcon />}
          />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton color="white" />
            <PopoverHeader>Wijzig bestelling</PopoverHeader>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="number"
                  defaultValue={popoverBestelling.bestellingId}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <Button colorScheme="green" onClick={onclick}>
                Submit
              </Button>
            </Stack>
          </FocusLock>
        </PopoverContent>
      </Popover>
    )
  );
}
