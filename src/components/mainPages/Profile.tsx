import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import "../../styling/index.css";
import "../../styling/profile.css";

export default function Profile() {
  const [loading, setLoading] = useState(false);

  // fetch bedrijf profile data (incl list of aankopers) from backend
  const fetchBedrijfProfile = useCallback(async () => {
    setLoading(true);
    try {
      //const response = await getBedrijfProfile();
      const response = {bedrijfTest: 'ok'};
      console.log(response);
    } catch (error: any) {
      console.error("Error fetching bedrijfprofiel:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBedrijfProfile();
  }, [fetchBedrijfProfile]);

  return (
    <>
    {/* if loading = true -> show spinner */}
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
  );
}
