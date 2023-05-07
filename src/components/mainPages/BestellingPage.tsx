import {
  Text,
  Box,
  Stack,
  Spacer,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import EditableLineBestellingPage from "../subComponents/bestelling/EditableLineBestellingPage";
import { useNavigate, useParams } from "react-router";
import { useState, useCallback, useEffect } from "react";
import Doos from "../../type/Doos";
import Bedrijf from "../../type/Bedrijf";
import { getBedrijfProfile } from "../../service/bedrijven";
export default function BestellingPage() {
  const { leverancierIdString, userIdString } = useParams();
  const [doos, setDoos] = useState<Doos>();
  const [loading, setLoading] = useState(false);
  const [bedrijfProfile, setBedrijfProfile] = useState<Bedrijf | null>(null);

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
          <EditableLineBestellingPage adresgegevens="test" />
          <br />
          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Verwachte levertermijn
          </Text>
          <EditableLineBestellingPage adresgegevens="test" />
          <br />
        </Box>

        <Box minW={"300px"} p={4} mr={10}>
          <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"} mb={2}>
            Overzicht
          </Text>
          <Text fontSize={"xl"} mb={2}>
            Producten
          </Text>
          <Stack direction={"row"} alignItems={"center"}>
            <Text fontSize={"l"}>Product1</Text>
            <Spacer />
            <Text fontSize={"l"} alignSelf={"flex-end"}>
              €100
            </Text>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Text fontSize={"l"}>Product2</Text>
            <Spacer />
            <Text fontSize={"l"} alignSelf={"flex-end"}>
              €100
            </Text>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Text fontSize={"l"}>Product3</Text>
            <Spacer />
            <Text fontSize={"l"} alignSelf={"flex-end"}>
              €100
            </Text>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Text fontSize={"l"}>Product4</Text>
            <Spacer />
            <Text fontSize={"l"} alignSelf={"flex-end"}>
              €100
            </Text>
          </Stack>
          <Divider mt={2} mb={2} colorScheme="purple" />
          <Button mt={4} w={"full"} colorScheme={"red"}>
            Plaats bestelling
          </Button>
        </Box>
      </Flex>
    </>
  );
}
