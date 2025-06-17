// Importa as regras base do JavaScript recomendadas pelo ESLint
import js from '@eslint/js'

// Importa as variáveis globais típicas de ambientes browser (window, document, etc.)
import globals from 'globals'

// Importa o plugin de regras para os hooks do React
import reactHooks from 'eslint-plugin-react-hooks'

// Importa o plugin do React Refresh (hot reload no desenvolvimento)
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignora a pasta "dist" nas verificações
  { ignores: ['dist'] },

  {
    // Aplica essas regras para todos os arquivos JS e JSX
    files: ['**/*.{js,jsx}'],

    // Configurações de linguagem
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    // Plugins utilizados
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // Conjunto de regras
    rules: {
      // Regras básicas recomendadas pelo ESLint
      ...js.configs.recommended.rules,

      // Regras específicas para hooks do React
      ...reactHooks.configs.recommended.rules,

      // Customização: Ignora variáveis não usadas que comecem com letra maiúscula ou underscore
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // Recomendação para exportações de componentes com hot reload
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
