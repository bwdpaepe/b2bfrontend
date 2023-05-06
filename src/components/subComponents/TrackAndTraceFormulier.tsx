import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

//import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TrackAndTraceSchema } from "../../schema/track-and-trace.schema";
import { bestellingByTrackAndTrace } from "../../service/bestellingen";
//import BestellingByTrackAndTrace from "../../type/BestellingByTrackAndTrace";

export default function TrackAndTraceFormulier(props: {setBestelling : Function}) {
  const {register, handleSubmit, formState: { errors }, reset} = useForm<typeTrackAndTraceSchema>({resolver: zodResolver(TrackAndTraceSchema),});

  const onSubmit = async (data: typeTrackAndTraceSchema) => {
    console.log(JSON.stringify(data));
    const {ttc, verify} = data;
    props.setBestelling(await bestellingByTrackAndTrace(ttc, verify));
    reset();
    };
    
  type typeTrackAndTraceSchema = z.infer<typeof TrackAndTraceSchema>;

  return(<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
            <FormLabel>Track & Trace Code</FormLabel>
            <Input
              type="text"
              {...register('ttc',
              )}
              required
            />{errors.ttc && (
              <p className="ttcError"> {errors.ttc?.message}
              </p>
            )}
            <FormLabel>Verificatie</FormLabel>
            <Input
              type="text"
              {...register('verify')}
              required
            />{errors.verify && (
              <p className="ttcError"> {errors.verify?.message}
              </p>
            )}
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