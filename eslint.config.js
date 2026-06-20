// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const perfectionist = require('eslint-plugin-perfectionist');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    // Исправлено: plugins теперь объект
    plugins: {
      perfectionist: perfectionist,
    },
    processor: angular.processInlineTemplates,
    rules: {
      // Настройка сортировки классов от perfectionist
      'perfectionist/sort-classes': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          groups: ['property', 'constructor', 'angular-lifecycle', 'method', 'private-method'],
          customGroups: [
            {
              elementNamePattern: '^ng[A-Z]',
              groupName: 'angular-lifecycle',
            },
          ],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  },
  {
    files: ['src/app/core/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@feature/*', '@feature/**'], message: 'Core cannot import from Features!' },
            { group: ['@shared/*', '@shared/**'], message: 'Core cannot import from Shared!' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/app/shared/**/*.ts'],
    plugins: {
      perfectionist: perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@feature/*', '@feature/**'],
              message: 'Shared cannot import from Features!',
            },
            { group: ['@core/*', '@core/**'], message: 'Shared cannot import from Core!' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/app/features/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@feature/*', '@feature/**'],
              message: 'Features are isolated! No cross-feature imports.',
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
);
