import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';

export default [
    {
        files: ['**/*.{js,ts}'],
        ignores: ['node_modules/**/*', 'dist/**/*'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...tsPlugin.configs['recommended'].rules,
            ...eslintConfigPrettier.rules,
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-redeclare': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            'object-shorthand': ['error', 'always'],
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
            'no-unreachable': 'error',
            'no-var': 'error',
        },
    },
    {
        files: ['**/*.html'],
        ignores: ['node_modules/**/*', 'dist/**/*'],
        languageOptions: {
            parser: htmlParser,
        },
        plugins: {
            '@html-eslint': html,
        },
        ...html.configs['flat/recommended'],
    },
];
