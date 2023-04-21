import {
  Tr,
  Td,
} from '@chakra-ui/react';
import "../../styling/bestellingen.css";
import BestellingProps from '../../type/BestellingProps';

export default function Bestelling( { bestelling }:BestellingProps) {
  return (
    <Tr>
      <Td>{bestelling.orderId}</Td>
      <Td>{bestelling.aankoper.email}</Td>
      <Td>{bestelling.datumGeplaatst.toString()}</Td>
      <Td>{bestelling.status}</Td>
      <Td>Zie details</Td>
    </Tr>
  );
}