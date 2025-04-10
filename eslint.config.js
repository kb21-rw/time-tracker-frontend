import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default [
    {
        ignores: ['dist'],
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react,
            prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommendedTypeChecked.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'prefer-const': 'error',
            'arrow-body-style': ['error', 'as-needed'],
            'no-console': ['warn'],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
]
