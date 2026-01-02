import eslintParserTypeScript from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier/flat";
import tailwind from "eslint-plugin-better-tailwindcss";
import { defineConfig } from "eslint/config";
import path from "path";
import tseslint from "typescript-eslint";

import { includeIgnoreFile } from "@eslint/compat";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

const eslintConfig = defineConfig([
    includeIgnoreFile(gitignorePath),
    {
        files: ["**/*.{ts,tsx,cts,mts}"],
        languageOptions: {
            parser: eslintParserTypeScript,
            parserOptions: {
                project: true,
            },
        },
        extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
        rules: {
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
        },
        ignores: ["*.config.ts", ".lintstagedrc.ts"],
    },
    {
        files: ["**/*.{jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "better-tailwindcss": tailwind,
        },
        rules: {
            ...tailwind.configs.correctness.rules,
        },
        settings: {
            "better-tailwindcss": {
                entryPoint: "app/app.css",
                tailwindConfig: "tailwind.config.ts",
            },
        },
    },
    prettier,
]);

export default eslintConfig;
