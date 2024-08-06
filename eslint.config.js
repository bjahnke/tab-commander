import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    languageOptions: { globals: 
      {
        ...globals.browser, 
        ...globals.node, 
        chrome: 'readonly',
        jest: 'readonly',
      } 
    },
  },
  pluginJs.configs.recommended,
  jestPlugin.configs['flat/recommended']
];