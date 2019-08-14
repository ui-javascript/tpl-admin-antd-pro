const { strictEslint } = require('@umijs/fabric');

// 自定义eslint规则
Object.assign(strictEslint.rules, {
  'no-unused-expressions': 0,
  // 放宽条件，单双引号都可以
  quotes: [0],
});

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
