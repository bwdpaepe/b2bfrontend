import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/index.css";
import 'react-notifications-component/dist/theme.css';
import App from "./App";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";




const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <CSSReset />
        <ReactNotifications /> 
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

