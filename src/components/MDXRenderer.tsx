import React, { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import { compile } from "@mdx-js/mdx";

import { Text } from "@chakra-ui/react";

interface MDXRendererProps {
    mdxSource: string;
}

const MDXRenderer = ({ mdxSource }: MDXRendererProps) => {
    const [MDXContent, setMDXContent] = useState();

    useEffect(() => {
        async function compileMDX() {
            try {
                const compiledMDX = await compile(mdxSource, {
                    outputFormat: "function-body",
                });
                const scope = { React, ...runtime };
                const component = new Function(
                    "React",
                    "runtime",
                    `${compiledMDX}`
                )(React, runtime);
                setMDXContent(() => component);
            } catch (error) {
                console.error("MDX compile error", error);
            }
        }

        compileMDX();
    }, [mdxSource]);
    return <></>;

    if (!MDXContent) {
        return <Text>Loading...</Text>;
    }

    return (
        <MDXProvider>
            <MDXContent />
        </MDXProvider>
    );
};

export default MDXRenderer;
