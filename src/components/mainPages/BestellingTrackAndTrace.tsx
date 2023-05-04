import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from '@chakra-ui/react';
import { SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import Bestelling from "../../type/Bestelling";
import { bestellingByTrackAndTrace } from "../../service/bestellingen";
import { BestellingStatus } from "../../enums/BestellingStatusEnum";
import StatusCard from "../subComponents/StatusCard";

export default function BestellingTrackAndTrace() {
  const [ttcSubmit, setTtcSubmit] = useState(false);
  const [bestelling, setBestelling] = useState<Bestelling>();
  type FormData = {
    ttc: string;
    verify: string;
  };
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    console.log(data);
    const {ttc, verify} = data;
  });
  // firstName and lastName will have correct type

  return(
    <Container maxW="70%" centerContent>
    <form onSubmit={onSubmit}>
      <label>Track & Trace Code</label>
      <input {...register("ttc")} />
      <label>Verification Code</label>
      <input {...register("verify")} />
      <button
        type="submit"
        
      >
        Get TTC
      </button>
    </form>
      {ttcSubmit && <SimpleGrid
      templateColumns={{
        base: "repeat(5, minmax(0, 1fr))",
      }}
      gap={6}
      p={3}
    >
      {Object.keys(BestellingStatus).map((status) => {
        return (<StatusCard
        key={status}
        bestelling={bestelling}
      />);
      })};
    </SimpleGrid>}
    </Container>
  );
}