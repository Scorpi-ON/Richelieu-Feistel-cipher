import type { Config } from "prettier";

const config: Config = {
    singleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    semi: true,
    tabWidth: 4,
    printWidth: 120,
    endOfLine: "auto",
    plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
};

export default config;
