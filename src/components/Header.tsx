import {
    Text,
    HStack,
    Spacer,
    IconButton,
    useColorMode,
    Link as ChakraLink,
} from "@chakra-ui/react";

import { FaMoon, FaSun } from "react-icons/fa";

import { Link, Outlet, useLocation } from "react-router-dom";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const location = useLocation();

    const pathname = location.pathname;

    return (
        <>
            <HStack w={"95%"} mx={"auto"} mt={2}>
                <Text as={Link} fontSize={"2xl"} fontWeight={"bold"} to={"/"}>
                    ShitaLab
                </Text>

                <Spacer />

                {/* <Text>{pathname}</Text> */}

                <ChakraLink
                    as={Link}
                    fontSize={"xl"}
                    to={"/"}
                    color={pathname === "/" ? "blue.600" : undefined}
                    sx={{
                        transition: "all 0.3s ease",
                        _hover: {
                            color: "blue.600",
                        },
                    }}
                >
                    Home
                </ChakraLink>

                <ChakraLink
                    as={Link}
                    fontSize={"xl"}
                    to={"/wiki"}
                    color={
                        pathname.startsWith("/wiki") ? "blue.600" : undefined
                    }
                    sx={{
                        transition: "all 0.3s ease",
                        _hover: {
                            color: "blue.600",
                        },
                    }}
                >
                    Wiki
                </ChakraLink>

                <IconButton
                    icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                    aria-label="Toggle Color Mode"
                    onClick={toggleColorMode}
                    isRound
                    bg={colorMode === "light" ? "gray.50" : "gray.800"}
                />
            </HStack>

            <Outlet />
        </>
    );
};

export default Header;
