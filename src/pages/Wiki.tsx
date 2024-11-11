import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    HStack,
    Icon,
    Spacer,
    Stack,
    Text,
    useColorMode,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaFolder } from "react-icons/fa";

type JsonData = {
    [key: string]: string | JsonData;
};

const RenderDataAccordion = ({
    data,
    parentKey = "",
}: {
    data: JsonData;
    parentKey: string;
}) => {
    const calculateDepth = (parentKey: string) => {
        return parentKey.split("-").length;
    };

    const { colorMode } = useColorMode();

    return (
        <Box w={{ base: "350px", md: "600px", lg: "800px" }}>
            <Accordion
                allowMultiple
                borderColor={colorMode === "light" ? "gray.800" : "gray.200"}
            >
                {Object.keys(data).map((key, index) => {
                    const currentPath = parentKey ? `${parentKey}-${key}` : key;
                    const uniqueKey = `${currentPath}-${index}`;
                    const depth = calculateDepth(uniqueKey) - 2;
                    const marginRight = depth * 16;

                    return (
                        <AccordionItem key={index}>
                            {typeof data[key] === "string" ? (
                                <Stack
                                    my={2}
                                    ml={4}
                                    as={Link}
                                    to={`/wiki/${currentPath}`}
                                >
                                    <Text fontWeight="bold" fontSize={"lg"}>
                                        {key}
                                    </Text>
                                    <Text color="gray.500">
                                        {data[key] as string}
                                    </Text>
                                </Stack>
                            ) : (
                                <>
                                    <Box>
                                        <AccordionButton>
                                            <HStack>
                                                <Box
                                                    fontWeight={"bold"}
                                                    fontSize={"2xl"}
                                                >
                                                    {key}
                                                </Box>
                                                <Icon
                                                    as={FaFolder}
                                                    boxSize="25px"
                                                    verticalAlign="middle"
                                                />
                                            </HStack>

                                            <Spacer />

                                            <AccordionIcon
                                                mr={`${marginRight}px`}
                                            />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <RenderDataAccordion
                                                data={data[key] as JsonData}
                                                parentKey={currentPath}
                                            />
                                        </AccordionPanel>
                                    </Box>
                                </>
                            )}
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </Box>
    );
};

const Wiki = () => {
    const [data, setData] = useState<JsonData>({});

    useEffect(() => {
        fetch("file_path.json")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);
    document;

    return (
        <>
            <VStack w={"100%"}>
                <Heading as="h1" my={6}>
                    Document
                </Heading>

                <RenderDataAccordion data={data} parentKey="" />
            </VStack>
        </>
    );
};

export default Wiki;
