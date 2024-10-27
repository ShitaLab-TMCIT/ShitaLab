import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkEmoji from "remark-emoji";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";

const options = {
    remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkEmoji,
        remarkToc,
        remarkBreaks,
    ],
    rehypePlugins: [rehypeKatex],
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), { enforce: "pre", ...mdx(options) }],
    base: "/ShitaLab/",
    build: {
        outDir: "./dist",
    },
});
