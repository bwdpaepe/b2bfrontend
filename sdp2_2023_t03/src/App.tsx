import React from 'react';
import logo from './logo.svg';
import { Box, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import MenuBar from './components/subComponents/MenuBar';
import Footer from './components/subComponents/Footer';


function App() {
  return (
    <>
    <Grid templateAreas={`"menu""content""footer"`}
    h="100vh"
    templateRows="auto 1fr auto">
    <GridItem gridArea="menu"><MenuBar/></GridItem>
    <GridItem gridArea="content"></GridItem>
    <GridItem gridArea="footer"><Footer/></GridItem>

    </Grid>

    
    </>
  );
}

export default App;
