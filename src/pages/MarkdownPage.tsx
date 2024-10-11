import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkEmoji from "remark-emoji";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";

const MarkdownPage = () => {
    const { filepath } = useParams<{ filepath: string }>();
    const [markdownContent, setMarkdownContent] = useState<string>("");

    useEffect(() => {
        const loadMarkdown = async () => {
            if (!filepath) return;

            const convertedPath = filepath.replace(/-/g, "/");

            const fetchPath =
                import.meta.env.VITE_REPO_NAME +
                "/md/" +
                `${convertedPath}.txt`;
            try {
                const response = await fetch(fetchPath);
                console.log(fetchPath);
                const contentType = response.headers.get("Content-Type");

                if (
                    response.ok &&
                    contentType &&
                    contentType.includes("text/plain")
                ) {
                    const text = await response.text();
                    console.log(text);
                    setMarkdownContent(text);
                } else {
                    setMarkdownContent(
                        "# File not found or incorrect content type"
                    );
                }
            } catch (error) {
                console.error("Error loading markdown file:", error);
                setMarkdownContent("# File not found");
            }
        };

        loadMarkdown();
    }, [filepath]);

    return (
        <>
            <Box
                mt={"20px"}
                bg={"gray"}
                fontSize={"3xl"}
                as={Link}
                to={"/wiki"}
            >
                <Text ml={"30px"}>戻る</Text>
            </Box>

            <Box w={{ base: "80%", lg: "60%" }} mx="auto" my={10}>
                <Heading as="h1" mb={6}>
                    {filepath}
                </Heading>
                <Text fontWeight={"bold"}>{markdownContent}</Text>
                <Markdown
                    children={markdownContent}
                    rehypePlugins={[rehypeKatex]}
                    remarkPlugins={[
                        remarkGfm,
                        remarkMath,
                        remarkEmoji,
                        remarkToc,
                        remarkBreaks,
                    ]}
                ></Markdown>
            </Box>
        </>
    );
};

export default MarkdownPage;
