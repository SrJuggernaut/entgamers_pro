import eslintJs from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylisticPlugin from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores([
    'node_modules/',
    'public/', 'src/styled-system/**/*', '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts']),

  {
    name: 'entgamers_pro/globals',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    name: 'project/eslint-js',
    files: ['**/*.{js,mjs,ts,tsx}'],
    ...eslintJs.configs.recommended
  },
  {
    name: 'project/typescript',
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  {
    name: 'project/react-next',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...jsxA11yPlugin.configs.strict.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      'react/jsx-no-target-blank': 'off',
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/media-has-caption': 'warn'
    },
    settings: {
      react: {
        version: '19'
      }
    }
  },
  {
    name: 'project/stylistic',
    files: ['**/*.{js,mjs,ts,tsx}'],
    plugins: {
      '@stylistic': stylisticPlugin
    },
    rules: {
      // Remove legacy formatting rules from ESLint core
      ...stylisticPlugin.configs['disable-legacy'].rules,
      // Add recommended stylistic rules
      ...stylisticPlugin.configs.recommended.rules,
      '@stylistic/indent': ['warn', 2],
      '@stylistic/quotes': ['warn', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: 'always'
      }],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/comma-dangle': ['warn', 'never'],
      '@stylistic/arrow-parens': ['warn', 'always', {
        requireForBlockBody: true
      }],
      '@stylistic/brace-style': ['warn', '1tbs', {
        allowSingleLine: true
      }]
    }
  }
])
