import {
  Text,
  Box,
  Stack,
  Spacer,
  Flex,
  Button,
  Divider,
  Select,
  useToast,
  useBoolean,
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
import OrderOverviewBoxLine from "../subComponents/bestelling/OrderOverviewBoxLine";
import OrderOverviewProductLine from "../subComponents/bestelling/OrderOverviewProductLine";
import { postBestellingen } from "../../service/bestellingen";
import Adres from "../../type/Adres";
export default function BestellingOrderPage() {
  const { leverancierIdString, userIdString } = useParams();
  const toast = useToast();
  const [dozen, setDozen] = useState<Doos[]>([]);
  const [geselecteerdeDoos, setGeselecteerdeDoos] = useState<Doos | null>(null);
  const [bedrijfProfile, setBedrijfProfile] = useState<Bedrijf | null>(null);
  const [levertermijn, setLevertermijn] = useState<number | undefined>();
  const [teBestellenProducten, setTeBestellenProducten] = useState<
    winkelmandProduct[]
  >([]);
  const [totalPriceProducten, setTotalPriceProducten] = useState<
    number | undefined
  >(0);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(
    totalPriceProducten
  );

  const [adresgegevens, setAdresgegevens] = useState<Adres>({
    land: "",
    stad: "",
    postcode: "",
    straat: "",
    huisnummer: "",
  });

  const [isLoading, toggleLoading] = useBoolean();

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }

  useEffect(() => {
    async function fetchBedrijfProfile() {
      const bedrijfprofiel = await getBedrijfProfile();
      if (bedrijfprofiel) {
        setBedrijfProfile(bedrijfprofiel);
        setAdresgegevens({
          land: bedrijfprofiel.land,
          stad: bedrijfprofiel.stad,
          postcode: bedrijfprofiel.postcode,
          straat: bedrijfprofiel.straat,
          huisnummer: bedrijfprofiel.huisnummer,
        });
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
        setGeselecteerdeDoos(doosData[0]);
      } else {
        throw Error("Kon dozen niet ophalen");
      }
    }
    fetchDoos();
  }, [leverancierIdString]);

  useEffect(() => {
    async function fetchWinkelmandgegevens() {
      const response = await getWinkelmand();

      console.log(response);

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
        setLevertermijn(levertermijn);
        setTeBestellenProducten(winkelmandProducten);
        setTotalPriceProducten(_totalPrice?.value!);
      } else {
        throw Error("Kon winkelmand niet ophalen");
      }
    }
    fetchWinkelmandgegevens();
  }, [userIdString, leverancierIdString]);

  useEffect(() => {
    setTotalPrice(totalPriceProducten! + geselecteerdeDoos?.prijs!);
  }, [geselecteerdeDoos, totalPriceProducten]);

  const handleDoosChange = (doosNaam: string) => {
    const doos = dozen.find((doos) => doos.naam === doosNaam);
    if (doos) {
      setGeselecteerdeDoos(doos);
      setTotalPrice(totalPriceProducten! + doos.prijs);
    }
  };

  const handleBestellingClick = async () => {
    console.log("Bestelling geplaatst");
    toggleLoading.on();
    try {
      await postBestellingen(
        leverancierIdString!,
        geselecteerdeDoos?.doosId!,
        adresgegevens.straat,
        adresgegevens.huisnummer,
        adresgegevens.postcode,
        adresgegevens.stad,
        adresgegevens.land
      );
      toggleLoading.off();
      handleNavigate(`/bestelling/succes`);
    } catch (error: any) {
      toast({
        title: `${error} `,
        description: "Er is iets misgegaan",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      toggleLoading.off();
    }
  };

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
      <Flex mt={4} flexWrap={"wrap"} justifyContent={"space-evenly"}>
        <Box p={2} ml={4} alignItems={"flex-start"} flex={1}>
          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Leveradres
          </Text>
          {bedrijfProfile && (
            <>
              <Text fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"}>
              Land
              </Text>
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.land}
                onChange={(value: string) =>
                  setAdresgegevens({ ...adresgegevens, land: value })
                }
              />
              <br />
              <Text fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"}>
              Stad
              </Text>
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.stad}
                onChange={(value: string) =>
                  setAdresgegevens({ ...adresgegevens, stad: value })
                }
              />
              <br />
              <Text fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"}>
              Postcode
              </Text>
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.postcode}
                onChange={(value: string) =>
                  setAdresgegevens({ ...adresgegevens, postcode: value })
                }
              />
              <br />
              <Text fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"}>
              Straat
              </Text>
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.straat}
                onChange={(value: string) =>
                  setAdresgegevens({ ...adresgegevens, straat: value })
                }
              />
              <br />
              <Text fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"}>
              Huisnummer
              </Text>
              <EditableLineBestellingPage
                adresgegevens={bedrijfProfile?.huisnummer}
                onChange={(value: string) =>
                  setAdresgegevens({ ...adresgegevens, huisnummer: value })
                }
              />
              <br />
            </>
          )}

          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Verpakking
          </Text>
          <Select
            onChange={(e) => handleDoosChange(e.target.value)}
            maxW={"300px"}
          >
            {dozen.map((doos) => (
              <option key={doos.doosId} value={doos.naam}>
                {doos.naam} - €{doos.prijs} ({doos.type.toLowerCase()})
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

        <Box minW={"300px"} p={4} mr={10} border={"2px"} height={"fit-content"}>
          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Overzicht
          </Text>
          <Text fontSize={"xl"} mb={2}>
            Producten
          </Text>
          {teBestellenProducten.map((item) => (
            <OrderOverviewProductLine
              productNaam={item.product.naam}
              productAantal={item.aantal}
              productEenhiedsprijs={item.product.eenheidsprijs}
              productSubTotaal={item.subtotal}
              key={item.product.productId}
            />
          ))}
          <OrderOverviewBoxLine
            doosNaam={geselecteerdeDoos?.naam}
            doosPrijs={geselecteerdeDoos?.prijs}
          />

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
          <Button
            mt={4}
            w={"full"}
            colorScheme={"red"}
            onClick={handleBestellingClick}
            isLoading={isLoading ? true : false}
          >
            Plaats bestelling
          </Button>
        </Box>
      </Flex>
    </>
  );
}
