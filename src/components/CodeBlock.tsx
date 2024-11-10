import { Box, Code, IconButton, useClipboard, Text } from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

export interface CodeBlockProps {
    className?: string;
    children: React.ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState(false);

    // className を ":" で分割して、前半と後半を取得
    const [language, fileName] = (className || "").split(":");

    const extractTextFromChildren = (children: React.ReactNode): string => {
        if (typeof children === "string") {
            return children;
        } else if (typeof children === "number") {
            return children.toString();
        } else if (React.isValidElement(children)) {
            return "";
        } else if (Array.isArray(children)) {
            return children.map(extractTextFromChildren).join("");
        } else if (children instanceof Object) {
            return "";
        }
        return "";
    };

    const code = extractTextFromChildren(children).trim();
    const { onCopy } = useClipboard(code);

    const handleCopy = () => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 800);
    };

    return (
        <Box
            position={"relative"}
            w={{ base: "100%", md: "80%" }}
            mx={"auto"}
            my={"45px"}
            gap={0}
            rounded={"lg"}
            bg={"gray.700"}
            pb={"10px"}
            pt={"10px"}
        >
            {/* ファイル名のラベルをCodeの上部に配置 */}
            {fileName && (
                <Text
                    position="absolute"
                    top="-10px" // 上に配置して内容と重ならないように調整
                    left="0"
                    fontSize="sm"
                    fontWeight="bold"
                    bg="gray.100"
                    px={2}
                    py={1}
                    borderRadius="md"
                    zIndex={1}
                >
                    {fileName}
                </Text>
            )}

            {/* コピーボタンを右上に配置 */}
            <IconButton
                aria-label={"Copy code"}
                icon={isCopied ? <CheckIcon /> : <CopyIcon />}
                size={"sm"}
                onClick={handleCopy}
                position={"absolute"}
                right={0}
                zIndex={1}
                mt={2}
                mr={2}
            />

            {/* Code component with language class */}
            <Code
                w={{ base: "100%" }}
                whiteSpace={"pre-wrap"}
                className={language}
                mt={6} // ラベル分の高さ調整
                bg={"gray.700"}
                color={"white"}
            >
                {children}
            </Code>
        </Box>
    );
};

export default CodeBlock;
