import {
    Box,
    Code,
    Heading,
    Text,
    UnorderedList,
    Link as ChakraLink,
    ListItem,
    Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkEmoji from "remark-emoji";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";

import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark-dimmed.css";
import CodeBlock from "../components/CodeBlock";

const MarkdownPage = () => {
    const { filepath } = useParams<{ filepath: string }>();
    const [markdownContent, setMarkdownContent] = useState<string>("");

    const convertedPath = filepath ? filepath.replace(/-/g, "/") : "";
    const directoryPath = convertedPath.substring(
        0,
        convertedPath.lastIndexOf("/")
    );

    useEffect(() => {
        const loadMarkdown = async () => {
            if (!filepath) return;

            const fetchPath = `${
                import.meta.env.BASE_URL
            }md/${convertedPath}.md`;

            try {
                const response = await fetch(fetchPath);
                console.log(fetchPath);
                const contentType = response.headers.get("Content-Type");

                if (response.ok && contentType) {
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
    }, [filepath, convertedPath]);

    return (
        <>
            <Box w={{ base: "90%", md: "80%", lg: "60%" }} mx="auto" my={10}>
                <Heading as="h1" mb={6}>
                    {filepath}
                </Heading>

                <ReactMarkdown
                    remarkPlugins={[
                        remarkGfm,
                        remarkMath,
                        remarkEmoji,
                        remarkToc,
                        remarkBreaks,
                    ]}
                    rehypePlugins={[rehypeHighlight, rehypeKatex]}
                    components={{
                        h1: ({ node, ...props }) => (
                            <Heading as="h1" size="xl" my={4} {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                            <Heading as="h2" size="lg" my={4} {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                            <Heading as="h3" size="md" my={4} {...props} />
                        ),
                        p: ({ node, ...props }) => <Text my={2} {...props} />,
                        a: ({ node, ...props }) => (
                            <ChakraLink color="teal.500" {...props} />
                        ),
                        li: ({ node, ...props }) => <ListItem {...props} />,
                        ul: ({ node, ...props }) => (
                            <UnorderedList my={2} {...props} />
                        ),
                        img: ({ node, src, alt, ...props }) => {
                            if (!src) {
                                return null;
                            }
                            const adjustedSrc = `${
                                import.meta.env.BASE_URL
                            }/md/${directoryPath}/${src}`;
                            console.log(adjustedSrc);

                            return (
                                <Image
                                    mx={"auto"}
                                    my={"15px"}
                                    src={adjustedSrc}
                                    alt={alt}
                                    {...props}
                                    maxWidth={"80%"}
                                />
                            );
                        },
                        code: ({ node, className, children, ...props }) => {
                            const isInlineCode = !className;

                            if (isInlineCode) {
                                return (
                                    <Code fontSize={"0.84em"} {...props}>
                                        {children}
                                    </Code>
                                );
                            } else {
                                return (
                                    <CodeBlock className={className}>
                                        {children}
                                    </CodeBlock>
                                );
                            }
                        },
                    }}
                >
                    {markdownContent}
                </ReactMarkdown>
            </Box>
        </>
    );
};

export default MarkdownPage;
