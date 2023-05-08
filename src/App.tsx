import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import MenuBar from "./components/subComponents/MenuBar";
import Footer from "./components/subComponents/Footer";
import { Route, Routes } from "react-router";
import Home from "./components/mainPages/Home";
import BestellingenLijst from "./components/mainPages/BestellingenLijst";
import Notificaties from "./components/mainPages/Notificaties";
import NotFound from "./components/mainPages/NotFound";
import Winkelmand from "./components/mainPages/WinkelmandPage";
import Producten from "./components/mainPages/Producten";

import Profile from "./components/mainPages/Profile";
import ProductDetails from "./components/mainPages/ProductDetails";
import WinkelmandPage from "./components/mainPages/WinkelmandPage";

export const UserContext = React.createContext("");

function App() {
  return (
    <>
      <UserContext.Provider
        value={
          localStorage.getItem("User") ? localStorage.getItem("User")! : ""
        }
      >
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
              <Route path="/notificaties" element={<Notificaties />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GridItem>
          <GridItem gridArea="footer">
            <Footer />
          </GridItem>
        </Grid>
      </UserContext.Provider>
    </>
  );
}

export default App;
