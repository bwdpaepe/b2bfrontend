import {
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import "../../styling/index.css";
import "../../styling/profile.css";
import { getBedrijfProfile } from "../../service/bedrijven";
import Bedrijf from "../../type/Bedrijf";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [bedrijfProfile, setBedrijfProfile] = useState<Bedrijf | null>(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false); // check if token is saved in localstorage

  // check if user is logged in
  // if so, fetch data from backend
  // if not, show text that user needs to be logged in
  const checkForLoggedInUser = useCallback(() => {
    if (localStorage.getItem("Token")) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
  }, []);

  // fetch bedrijf profile data (incl list of aankopers) from backend
  const fetchBedrijfProfile = useCallback(async () => {
    setLoading(true);
    try {
      if (!isLoggedInUser) {
        return; // if user is not logged in, don't fetch data
      }
      const response = await getBedrijfProfile();
      console.log(response);
      if (response) {
        setBedrijfProfile(response);
      } else {
        throw Error("Kon bedrijfprofiel niet ophalen");
      }
    } catch (error: any) {
      console.error("Error fetching bedrijfprofiel:", error.message);
    } finally {
      setLoading(false);
    }
  }, [isLoggedInUser]);

  useEffect(() => {
    checkForLoggedInUser();
    fetchBedrijfProfile();
  }, [checkForLoggedInUser, fetchBedrijfProfile]);

  return (
    <>
      {isLoggedInUser ? (
        <>
          {loading ? (
            <Spinner className="spinner" />
          ) : (
            <>
              <VStack id="profileVstack">
                <Box id="profileBox">
                  <Heading className="profileHeadings" id="profileHeading">
                    {bedrijfProfile?.naam}
                  </Heading>
                  {bedrijfProfile && (
                    <Grid
                      templateColumns={{
                        base: "repeat(1, minmax(250px, 1fr))",
                        md: "repeat(3, minmax(250px, 1fr))",
                      }}
                      gap={6}
                      // no padding of margins
                      p={0}
                      m={0}
                    >
                      <GridItem>
                        <Image
                          src={`/path/to/logo/folder/${bedrijfProfile.logoFilename}`}
                          alt={bedrijfProfile.naam}
                        />
                      </GridItem>
                      <GridItem>
                        <Text fontWeight="bold">Adres</Text>
                        <Text>
                          {bedrijfProfile.straat} {bedrijfProfile.huisnummer}
                        </Text>
                        <Text>
                          {bedrijfProfile.postcode} {bedrijfProfile.stad}
                        </Text>
                        <Text>{bedrijfProfile.land}</Text>
                      </GridItem>
                      <GridItem>
                        <Text fontWeight="bold">Telefoonnummer</Text>
                        <Text>{bedrijfProfile.telefoonnummer}</Text>
                      </GridItem>
                    </Grid>
                  )}
                </Box>
                <Box id="aankopersBox">
                  <Heading className="profileHeadings" id="aankopersHeading">
                    AANKOPERS
                  </Heading>
                  <Table id="aankopersTable">
                    <Thead>
                      <Tr>
                        <Th>Personeelnummer</Th>
                        <Th>Voornaam</Th>
                        <Th>Familienaamaam</Th>
                        <Th>E-mail</Th>
                        <Th>Telefoonnummer</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {bedrijfProfile &&
                        bedrijfProfile.users?.map((aankoper) => (
                          <Tr key={aankoper.userId}>
                            <Td>{aankoper.personeelsNr}</Td>
                            <Td>{aankoper.firstname}</Td>
                            <Td>{aankoper.lastname}</Td>
                            <Td>{aankoper.email}</Td>
                            <Td>{aankoper.phone}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </>
          )}
        </>
      ) : (
        <Text id="notLoggedInText">
          Je moet ingelogd zijn om deze pagina te bekijken.
        </Text>
      )}
    </>
  );
}
