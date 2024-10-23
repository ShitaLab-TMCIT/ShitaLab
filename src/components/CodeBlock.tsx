import { Box, Code, IconButton, useClipboard } from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
// import Editor from "@monaco-editor/react";

export interface CodeBlockProps {
    className?: string;
    children: React.ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState(false);
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
    // const code = String(children).trim();
    const { onCopy } = useClipboard(code);

    // const language = className?.replace("language-", "") || "python";

    const handleCopy = () => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 800);
    };

    return (
        <Box position={"relative"} w={"100%"} p={2} my={4}>
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

            {/* <Editor
                height={"400px"}
                defaultLanguage={language}
                value={code}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                }}
            /> */}

            {/* Codeコンポーネントの内容 */}
            <Code w={"100%"} whiteSpace={"pre-wrap"} className={className}>
                {children}
            </Code>
        </Box>
    );
};

export default CodeBlock;
