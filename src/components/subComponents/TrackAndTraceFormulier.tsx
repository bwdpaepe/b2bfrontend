import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TrackAndTraceSchema } from "../../schema/track-and-trace.schema";
import {
  verificatieByTrackAndTrace,
  bestellingByTrackAndTrace,
} from "../../service/bestellingen";
import ErrorMessage from "./ErrorMessage";

//import BestellingByTrackAndTrace from "../../type/BestellingByTrackAndTrace";

export default function TrackAndTraceFormulier(props: {
  setBestelling: Function;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<typeTrackAndTraceSchema>({
    resolver: zodResolver(TrackAndTraceSchema),
  });
  const [verificatieLabel, setVerificatieLabel] = useState("Verificatie");
  const [error, setError] = useState<string>();

  const onSubmit = async (data: typeTrackAndTraceSchema) => {
    const { ttc, verify } = data;
    try {
      props.setBestelling(await bestellingByTrackAndTrace(ttc, verify));
      reset();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getVerificatieLabel = async (ttc: string) => {
    setVerificatieLabel(await verificatieByTrackAndTrace(ttc));
  };

  type typeTrackAndTraceSchema = z.infer<typeof TrackAndTraceSchema>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          {error && <ErrorMessage message={error} />}
          <FormLabel>Track & Trace Code</FormLabel>
          <Input
            type="text"
            width="300px"
            {...register("ttc")}
            required
            onBlur={(event) => {
              getVerificatieLabel(event.currentTarget.value);
            }}
          />
          {errors.ttc && <p className="ttcError"> {errors.ttc?.message}</p>}
          <FormLabel>{verificatieLabel}</FormLabel>
          <Input type="text" width="300px" {...register("verify")} required />
          {errors.verify && (
            <p className="ttcError"> {errors.verify?.message}</p>
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
