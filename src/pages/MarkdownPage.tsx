import {
    Box,
    Code,
    Heading,
    Text,
    UnorderedList,
    Link as ChakraLink,
    ListItem,
    HStack,
    IconButton,
    Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

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

    useEffect(() => {
        const loadMarkdown = async () => {
            if (!filepath) return;

            const convertedPath = filepath.replace(/-/g, "/");

            const fetchPath = `/${
                import.meta.env.VITE_REPO_NAME
            }/md/${convertedPath}.md`;

            try {
                const response = await fetch(fetchPath);
                console.log(fetchPath);
                const contentType = response.headers.get("Content-Type");

                if (response.ok && contentType) {
                    const text = await response.text();
                    console.log(text); // test
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
            <HStack mt={"20px"} as={Link} to={"/wiki"}>
                <IconButton
                    aria-label="Back to pre-page"
                    icon={<IoIosArrowBack />}
                />
                <Text>戻る</Text>
            </HStack>
            <Box
                mt={"20px"}
                bg={"gray"}
                fontSize={"3xl"}
                as={Link}
                to={"/wiki"}
            >
                <Text ml={"30px"}>戻る</Text>
            </Box>

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
                            const adjustedSrc = `/${
                                import.meta.env.VITE_REPO_NAME
                            }${src.startsWith("/") ? src.slice(1) : src}`;
                            return (
                                <Image src={adjustedSrc} alt={alt} {...props} />
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
