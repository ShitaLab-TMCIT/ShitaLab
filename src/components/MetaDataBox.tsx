import {
    Box,
    Heading,
    Text,
    Image,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface MetaData {
    title: string;
    description: string;
    image: string;
    url: string;
}

const MetaDataBox = ({ url }: { url: string }) => {
    const [metaData, setMetaData] = useState<MetaData | null>(null);

    useEffect(() => {
        const fetchMetaData = async () => {
            try {
                const res = await fetch(
                    `https://api.url-metadata-fetcher.com?url=${url}`
                );
                const data = await res.json();
                setMetaData({
                    title: data.title || "No title",
                    description: data.description || "No description",
                    image: data.image || "",
                    url: url,
                });
            } catch (error) {
                console.error("Error fetching metadata:", error);
                setMetaData({
                    title: "Failed to load metadata",
                    description: "",
                    image: "",
                    url: url,
                });
            }
        };

        fetchMetaData();
    }, [url]);

    return (
        metaData && (
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                mb={4}
                maxW="400px"
                mx="auto"
                boxShadow="md"
            >
                {metaData.image && (
                    <Image
                        src={metaData.image}
                        alt={metaData.title}
                        objectFit="cover"
                    />
                )}
                <Box p={4}>
                    <Heading size="md" mb={2}>
                        {metaData.title}
                    </Heading>
                    <Text mb={4}>{metaData.description}</Text>
                    <ChakraLink href={metaData.url} color="teal.500" isExternal>
                        Visit page
                    </ChakraLink>
                </Box>
            </Box>
        )
    );
};

export default MetaDataBox;
