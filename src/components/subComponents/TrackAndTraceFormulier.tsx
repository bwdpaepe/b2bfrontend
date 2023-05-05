import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TrackAndTraceSchema } from "../../schema/track-and-trace.schema";
import { bestellingByTrackAndTrace } from "../../service/bestellingen";

export default function TrackAndTraceFormulier() {
  const {register, handleSubmit, formState: { errors }, reset} = useForm<typeTrackAndTraceSchema>({resolver: zodResolver(TrackAndTraceSchema),});

  const onSubmit = (data: typeTrackAndTraceSchema) => {
    console.log(JSON.stringify(data));
    const {ttc, verify} = data;
    bestellingByTrackAndTrace(ttc, verify);
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
              <p className="text-xs italic text-red-500 mt-2"> {errors.ttc?.message}
              </p>
            )}
            <FormLabel>Verificatie</FormLabel>
            <Input
              type="text"
              {...register('verify')}
              required
            />{errors.verify && (
              <p className="text-xs italic text-red-500 mt-2"> {errors.verify?.message}
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