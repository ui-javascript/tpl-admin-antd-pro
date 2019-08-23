const { strictEslint } = require('@umijs/fabric');

// 自定义eslint规则
Object.assign(strictEslint.rules, {
  'no-unused-expressions': 0,
  // 放宽条件，单双引号都可以
  'quotes': [0],
  'comma-dangle': 0,
  'padded-blocks': 0,
  'no-trailing-spaces': 0,
  'object-shorthand': 0,
  'no-case-declarations': 0,
  'no-underscore-dangle': 0,
  'no-plusplus': 0,
  // react相关
  'react/no-array-index-key': [0],
  'react/no-access-state-in-setstate': [0],
  'react/sort-comp': [0],
  'react/no-find-dom-node': [0],
  'react/no-unused-state': 0,
  'react/no-string-refs': 0,
  // 以下谨慎！
  'prefer-destructuring': 0,
  'no-nested-ternary': 0,
  'import/no-dynamic-require': 0,
  'global-require': [0],
  'no-use-before-define': 0,
  'no-script-url': 0,
  'no-useless-concat': 0,
});

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
