import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';


export default [
    {
        files: ['src/**/*.{js,ts}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'prettier': prettierPlugin,
        },
        rules: {
            ...tsPlugin.configs['recommended'].rules,
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-redeclare': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/type-annotation-spacing': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            'object-shorthand': ['error', 'always'],
            'curly': ['error', 'all'],
            'eqeqeq': ['error', 'always'],
            'no-unreachable': 'error',
        },
    },
    eslintConfigPrettier
];