import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import theme from "./theme.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </StrictMode>
);
