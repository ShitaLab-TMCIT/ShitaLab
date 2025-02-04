import { useEffect, useState } from "react";
import {
    Link,
    Text,
    Image,
    Heading,
    HStack,
    VStack,
    Spacer,
    Box,
    useColorModeValue,
} from "@chakra-ui/react";

interface MetadataItem {
    title: string;
    description: string;
    keywords: string;
    image: string;
    favicon: string;
}

interface MetadataCategory {
    [url: string]: MetadataItem;
}

interface Metadata {
    [category: string]: MetadataCategory;
}

interface MetadataItemBoxProps {
    category: string;
    url: string;
}

const MetaDataBox = ({ category, url }: MetadataItemBoxProps) => {
    const [item, setItem] = useState<MetadataItem | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await fetch(
                    import.meta.env.BASE_URL + "/metadata.json"
                );
                const data: Metadata = await response.json();

                const categoryData = data[category];
                if (categoryData && categoryData[url]) {
                    setItem(categoryData[url]);
                } else {
                    console.error("Specified item not found in metadata.");
                }
            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        };

        fetchMetadata();
    }, [category, url]);

    if (!item) {
        return (
            <Text>
                {category}, {url}
            </Text>
        );
    }

    const bg = useColorModeValue("gray.100", "gray.900");
    const color = useColorModeValue("gray", "white");
    const titleTextColor = useColorModeValue("gray.800", "gray.200");
    const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

    return (
        <Link href={url} isExternal _hover={{ textDecoration: "none" }} mb={3}>
            <HStack
                borderWidth="1px"
                borderRadius="lg"
                _hover={{ shadow: "md" }}
                align="center"
                spacing={4}
                bg={bg}
                color={color}
                w={{ base: "100%", md: "70%", xl: "750px" }}
                mx={"auto"}
                h={"135px"}
                my={5}
            >
                <VStack
                    align="start"
                    spacing={1}
                    maxW={{ base: "100%", lg: "65%" }}
                    py={2}
                    pl={4}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                >
                    <Heading
                        size="sm"
                        noOfLines={1}
                        maxW={"100%"}
                        color={titleTextColor}
                    >
                        {item.title}
                    </Heading>
                    <Text
                        fontSize="sm"
                        color={secondaryTextColor}
                        noOfLines={2}
                        maxW={"100%"}
                    >
                        {item.description}
                    </Text>
                    <Text
                        fontSize="xs"
                        color="gray.500"
                        noOfLines={1}
                        maxW={"100%"}
                    >
                        {item.keywords}
                    </Text>
                    <HStack isTruncated maxW={"100%"}>
                        <Image src={item.favicon} boxSize={"17px"} />
                        <Text
                            fontSize={"sm"}
                            noOfLines={1}
                            color={secondaryTextColor}
                        >
                            {url}
                        </Text>
                    </HStack>
                </VStack>

                <Spacer />

                <Box
                    w={"30%"}
                    h={"135px"}
                    overflow="hidden"
                    borderRadius="lg"
                    display={{ base: "none", lg: "block" }} // モバイルで非表示
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                    />
                </Box>
            </HStack>
        </Link>
    );
};

export default MetaDataBox;
