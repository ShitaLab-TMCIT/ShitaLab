import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props: any) => ({
            body: {
                bg: props.colorMode === "light" ? "blue.50" : "gray.800",
            },
        }),
    },
});

export default theme;
