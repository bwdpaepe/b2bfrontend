import {
  Text,
  Box,
  Stack,
  Spacer,
  Flex,
  Button,
  Divider,
  Select,
} from "@chakra-ui/react";
import EditableLineBestellingPage from "../subComponents/bestelling/EditableLineBestellingPage";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Doos from "../../type/Doos";
import Bedrijf from "../../type/Bedrijf";
import { getBedrijfProfile } from "../../service/bedrijven";
import { getAllDozenfromBedrijf } from "../../service/dozen";
import { getWinkelmand } from "../../service/winkelmand";
import winkelmandProduct from "../../type/WinkelmandProduct";
import ProductLine from "../subComponents/bestelling/ProductLine";
export default function BestellingPage() {
  const { leverancierIdString, userIdString } = useParams();
  const [dozen, setDozen] = useState<Doos[]>([]);
  const [bedrijfProfile, setBedrijfProfile] = useState<Bedrijf | null>(null);
  const [levertermijn, setLevertermijn] = useState<number | undefined>();
  const [teBestellenProducten, setTeBestellenProducten] = useState<
    winkelmandProduct[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }

  useEffect(() => {
    async function fetchBedrijfProfile() {
      const response = await getBedrijfProfile();
      if (response) {
        setBedrijfProfile(response);
      } else {
        throw Error("Kon bedrijfprofiel niet ophalen");
      }
    }
    fetchBedrijfProfile();
  }, []);

  useEffect(() => {
    async function fetchDoos() {
      const doosData = await getAllDozenfromBedrijf(
        Number(leverancierIdString)
      );
      if (doosData) {
        setDozen(doosData);
      } else {
        throw Error("Kon dozen niet ophalen");
      }
    }
    fetchDoos();
  }, [leverancierIdString]);

  useEffect(() => {
    async function fetchProducten() {}
    fetchProducten();
  }, [leverancierIdString]);

  useEffect(() => {
    async function fetchWinkelmandgegevens() {
      const response = await getWinkelmand();
      console.log(JSON.stringify(response));
      const levertermijn = response.totalPrice.find(
        (item) => item.bedrijfId === Number(leverancierIdString)
      )?.levertermijn;

      const _totalPrice = response.totalPrice.find(
        (item) => item.bedrijfId === Number(leverancierIdString)
      );

      const winkelmandProducten = response.winkelmandProducten.filter(
        (item) => item.product.bedrijf.bedrijfId === Number(leverancierIdString)
      );

      if (response) {
        setTotalPrice(_totalPrice?.value);
        setLevertermijn(levertermijn);
        setTeBestellenProducten(winkelmandProducten);
        console.log(JSON.stringify(winkelmandProducten));
      } else {
        throw Error("Kon winkelmand niet ophalen");
      }
    }
    fetchWinkelmandgegevens();
  }, [userIdString, leverancierIdString]);

  return (
    <>
      <Text
        color={"red"}
        p={2}
        mt={2}
        ml={4}
        onClick={() => handleNavigate(`/winkelmand`)}
        _hover={{ cursor: "pointer", textDecoration: "underline" }}
      >{`< Winkelwagen`}</Text>
      <Flex mt={4} flexWrap={"wrap"} justifyContent={"space-between"}>
        <Box p={2} ml={4} alignItems={"flex-start"} flex={1} border={"1px"}>
          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Leveradres
          </Text>
          {bedrijfProfile && (
            <>
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.land}
              />
              <br />
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.stad}
              />
              <br />
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.postcode}
              />
              <br />
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.straat}
              />
              <br />
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.huisnummer}
              />
              <br />
            </>
          )}

          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Verpakking
          </Text>
          <Select>
            {dozen.map((doos) => (
              <option key={doos.doosId} value={doos.naam}>
                {doos.naam}
              </option>
            ))}
          </Select>
          <br />
          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Verwachte levertermijn
          </Text>
          {levertermijn === 1 ? (
            <Text>{levertermijn} werkdag</Text>
          ) : (
            <Text>{levertermijn} werkdagen</Text>
          )}
          <br />
        </Box>

        <Box minW={"300px"} p={4} mr={10}>
          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Overzicht
          </Text>
          <Text fontSize={"xl"} mb={2}>
            Producten
          </Text>
          {teBestellenProducten.map((item) => (
            <ProductLine
              productNaam={item.product.naam}
              productSubTotaal={item.subtotal}
              key={item.product.productId}
            />
          ))}

          <Divider mt={2} mb={2} colorScheme="purple" />
          <Stack direction={"row"} alignItems={"center"}>
            <Text fontSize={"l"} fontWeight={"bold"}>
              TOTAAL BEDRAG:
            </Text>
            <Spacer />
            <Text fontSize={"l"} alignSelf={"flex-end"}>
              €{totalPrice?.toFixed(2)}
            </Text>
          </Stack>
          <Button mt={4} w={"full"} colorScheme={"red"}>
            Plaats bestelling
          </Button>
        </Box>
      </Flex>
    </>
  );
}
