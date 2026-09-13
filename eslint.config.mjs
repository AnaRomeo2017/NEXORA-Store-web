import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * تهيئة ESLint بصيغة Flat Config.
 *
 * لا نستخدم `eslint-config-next` مباشرة لأنها تُحمّل `@rushstack/eslint-patch`
 * الذي لا يتوافق مع إصدار ESLint 9 الحالي في هذا المستودع الأحادي، فنُركّب
 * إضافة Next وقواعد React Hooks ومحلّل TypeScript مباشرةً.
 */
const nextPlugin = require('@next/eslint-plugin-next');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const tsParser = require('@typescript-eslint/parser');

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts', 'public/**'],
  },
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }],
    },
  },
];

export default eslintConfig;
