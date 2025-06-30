import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginPrettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'
import { defineConfig } from 'eslint/config';
export default defineConfig ([
  {
    files: ['**/*.{js,ts}'],
    ignores: ['node_modules', '**/dist/**', 'build', 'coverage'],
    languageOptions: {
      parser: tseslint.parser, // 指定 TS 解析器
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
				...globals.browser,
				...globals.node,
				...globals.jest
			},
      parserOptions: {
        project: './tsconfig.json', // 关联 TS 配置
      }
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      //添加js推荐规则
      ...js.configs.recommended.rules,
      //添加typescript-eslint推荐规则
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off' // 关闭 any 类型检查
    },
  },
  prettierConfig
]
) 