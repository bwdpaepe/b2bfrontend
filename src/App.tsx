import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import MenuBar from "./components/subComponents/MenuBar";
import Footer from "./components/subComponents/Footer";
import { Route, Routes } from "react-router";
import Home from "./components/mainPages/Home";
import BestellingenLijst from "./components/mainPages/BestellingenLijst";
import Notificaties from "./components/mainPages/Notificaties";
import NotFound from "./components/mainPages/NotFound";
import Producten from "./components/mainPages/Producten";

import Profile from "./components/mainPages/Profile";
import ProductDetails from "./components/mainPages/ProductDetails";
import WinkelmandPage from "./components/mainPages/WinkelmandPage";
import BestellingPage from "./components/mainPages/BestellingOrderPage";
import BestellingDetails from "./components/mainPages/BestellingDetails";
import BestellingTrackAndTrace from "./components/mainPages/BestellingTrackAndTrace";


function App() {
  return (
    <>

        <Grid
          templateAreas={`"menu""content""footer"`}
          h="100vh"
          w="100%"
          templateRows="115px 1fr 55px"
        >
          <GridItem gridArea="menu">
            <MenuBar />
          </GridItem>
          <GridItem
            gridArea="content"
            overflow="scroll"
            overflowY="auto"
            overflowX="hidden"
          >
            <Routes>
              <Route index element={<Home />} />
              <Route path="/bestellingen" element={<BestellingenLijst />} />
              <Route path="/notificaties/:id?" element={<Notificaties/>} />
              <Route path="/winkelmand" element={<WinkelmandPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/producten/:bedrijfIdString"
                element={<Producten />}
              />
              <Route
                path="/producten/:bedrijfIdString/:productIdString"
                element={<ProductDetails />}
              />
              <Route
                path="/bestellingen/:bestellingIdString"
                element={<BestellingDetails />}
              />
              <Route
                path="/bestellingen/:bestellingIdString/track-and-trace"
                element={<BestellingTrackAndTrace />}
              />
              <Route
                path="/bestelling/:leverancierIdString/:userIdString"
                element={<BestellingPage />}
              />
              <Route
                path="/track-and-trace"
                element={<BestellingTrackAndTrace />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GridItem>
          <GridItem gridArea="footer">
            <Footer />
          </GridItem>
        </Grid>

    </>
  );
}

export default App;
