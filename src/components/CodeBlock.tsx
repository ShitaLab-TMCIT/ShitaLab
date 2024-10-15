import { Box, Code, IconButton, useClipboard } from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

export interface CodeBlockProps {
    className?: string;
    children: React.ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const code = String(children).trim();
    const { onCopy } = useClipboard(code);

    const handleCopy = () => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 800);
    };

    return (
        <Box
            position={"relative"}
            w={"100%"}
            // bg={"blue.300"}
            p={2}
            my={4}
        >
            {/* コピーボタンを右上に配置 */}
            <IconButton
                aria-label={"Copy code"}
                icon={isCopied ? <CheckIcon /> : <CopyIcon />}
                size={"sm"}
                onClick={handleCopy}
                position={"absolute"}
                top={2}
                right={2}
                zIndex={1}
            />

            {/* Codeコンポーネントの内容 */}
            <Code w={"100%"} whiteSpace={"pre-wrap"} className={className}>
                {children}
            </Code>
        </Box>
    );
};

export default CodeBlock;
