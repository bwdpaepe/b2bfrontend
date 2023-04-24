import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import MenuBar from "./components/subComponents/MenuBar";
import Footer from "./components/subComponents/Footer";
import { Route, Routes } from "react-router";
import Home from "./components/mainPages/Home";
import Bestellingen from "./components/mainPages/Bestellingen";
import Notificaties from "./components/mainPages/Notificaties";
import NotFound from "./components/mainPages/NotFound";
import Winkelmand from "./components/mainPages/Winkelmand";
import Producten from "./components/mainPages/Producten";

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
          templateRows="auto 1fr auto"
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
              <Route path="/bestellingen" element={<Bestellingen />} />
              <Route path="/notificaties" element={<Notificaties />} />
              <Route path="/winkelmand" element={<Winkelmand />} />
              <Route
                path="/producten/:bedrijfIdString"
                element={<Producten />}
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
