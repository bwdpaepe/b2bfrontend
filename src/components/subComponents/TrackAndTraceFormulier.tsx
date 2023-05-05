import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { FormEvent, useState } from "react";

import { bestellingByTrackAndTrace } from "../../service/bestellingen";

export default function TrackAndTraceFormulier() {
  const [trackAndTrace, setTrackAndTrace] = useState<string>("");
  const [verificatie, setVerificatie] = useState<string>("");

  const getTrackAndTrace = async(event: FormEvent) => {
    event.preventDefault();
    try {
        const data = await bestellingByTrackAndTrace(trackAndTrace, verificatie);
        console.log(data);
        //window.location.reload();
    } catch (error: any) {
        console.log(error.message)
        
    }
    


};

  return(<>
        <form onSubmit={(e) => {getTrackAndTrace(e)}}>
            <FormControl>
            <FormLabel>Track & Trace Code</FormLabel>
            <Input
              type="text"
              onChange={(event) => {
                setTrackAndTrace(event.currentTarget.value);
              }}
              required
            ></Input>
            <FormLabel>Verificatie</FormLabel>
            <Input
              type="text"
              onChange={(event) => {
                setVerificatie(event.currentTarget.value);
              }}
              required
            ></Input>
            <Center>
              <Button className="button" type="submit">
                Verstuur
              </Button>
            </Center>
          </FormControl>
        </form>
       
       </>
  );
}