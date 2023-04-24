import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import "../../styling/index.css";
import "../../styling/profile.css";
import { getBedrijfProfile } from "../../service/bedrijven";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [bedrijfProfile, setBedrijfProfile] = useState<any>(null);
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
      if(!isLoggedInUser) {
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
  }, [checkForLoggedInUser ,fetchBedrijfProfile]);

  return (
    <>
    {isLoggedInUser ? (
      <> 
        {loading ? (
            <Spinner className="spinner"/>
          ) : (
            <>
              <VStack id="profileVstack">
                  <Box id="profileBox">
                  <Heading className="profileHeadings" id="profileHeading">PROFIEL VAN BEDRIJF</Heading>
                  <Text id="profileText">
                      Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit
                      magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit
                      dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia
                      eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                      incididunt nisi consectetur esse laborum eiusmod pariatur proident
                      Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </Text>
                  <Text>
                      {bedrijfProfile && (
                          <pre>{JSON.stringify(bedrijfProfile, null, 2)}</pre>
                      )}
                  </Text>
                  </Box>
                  <Box id="aankopersBox">
                  <Heading className="profileHeadings" id="aankopersHeading">AANKOPERS</Heading>
                  <Text id="aankopersText">
                      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
                      ullamco deserunt aute id consequat veniam incididunt duis in sint
                      irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
                      officia tempor esse quis.
                  </Text>
                  </Box>
              </VStack>
          </>
        )}
      </>
    ) : (
        <Text id="notLoggedInText">Je moet ingelogd zijn om deze pagina te bekijken.</Text>
    )}
      </>
  );
}
