import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/index.css";
import App from "./App";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";




const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <CSSReset />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

