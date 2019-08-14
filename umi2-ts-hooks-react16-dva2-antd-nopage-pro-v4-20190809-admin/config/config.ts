import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
    npmClient: 'cnpm',
    // npmClient: 'tyarn',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/user-login',
            },
            {
              name: 'login',
              path: '/user/user-login',
              component: './user/user-login',
            },
            {
              name: 'register-result',
              path: '/user/user-register-result',
              component: './user/user-register-result',
            },
            {
              name: 'register',
              path: '/user/user-register',
              component: './user/user-register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/demo',
              name: 'demo',
              icon: 'dashboard',
              component: './_demo',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  name: 'analysis',
                  path: '/dashboard/dashboard-analysis',
                  component: './dashboard/dashboard-analysis',
                },
                {
                  name: 'monitor',
                  path: '/dashboard/dashboard-monitor',
                  component: './dashboard/dashboard-monitor',
                },
                {
                  name: 'workplace',
                  path: '/dashboard/dashboard-workplace',
                  component: './dashboard/dashboard-workplace',
                },
              ],
            },
            {
              path: '/form',
              icon: 'form',
              name: 'form',
              routes: [
                {
                  name: 'basic-form',
                  path: '/form/form-basic',
                  component: './form/form-basic',
                },
                {
                  name: 'step-form',
                  path: '/form/form-step',
                  component: './form/form-step',
                },
                {
                  name: 'advanced-form',
                  path: '/form/form-advanced',
                  component: './form/form-advanced',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              routes: [
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/list-articles',
                    },
                    {
                      name: 'articles',
                      path: '/list/search/list-articles',
                      component: './list/search/list-articles',
                    },
                    {
                      name: 'projects',
                      path: '/list/search/list-projects',
                      component: './list/search/list-projects',
                    },
                    {
                      name: 'applications',
                      path: '/list/search/list-applications',
                      component: './list/search/list-applications',
                    },
                  ],
                },
                {
                  name: 'table-list',
                  path: '/list/list-table',
                  component: './list/list-table',
                },
                {
                  name: 'basic-list',
                  path: '/list/list-basic',
                  component: './list/list-basic',
                },
                {
                  name: 'card-list',
                  path: '/list/list-card',
                  component: './list/list-card',
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              routes: [
                {
                  name: 'basic',
                  path: '/profile/profile-basic',
                  component: './profile/profile-basic',
                },
                {
                  name: 'advanced',
                  path: '/profile/profile-advanced',
                  component: './profile/profile-advanced',
                },
              ],
            },
            {
              name: 'result',
              icon: 'check-circle-o',
              path: '/result',
              routes: [
                {
                  name: 'success',
                  path: '/result/result-success',
                  component: './result/result-success',
                },
                {
                  name: 'fail',
                  path: '/result/result-fail',
                  component: './result/result-fail',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  name: '403',
                  path: '/exception/exception-403',
                  component: './exception/exception-403',
                },
                {
                  name: '404',
                  path: '/exception/exception-404',
                  component: './exception/exception-404',
                },
                {
                  name: '500',
                  path: '/exception/exception-500',
                  component: './exception/exception-500',
                },
                // {
                //   name: '测试',
                //   path: '/exception/exception-test',
                //   component: './exception/exception-test',
                // },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  name: 'center',
                  path: '/account/account-center',
                  component: './account/account-center',
                },
                {
                  name: 'settings',
                  path: '/account/account-settings',
                  component: './account/account-settings',
                },
              ],
            },
            {
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  name: 'flow',
                  path: '/editor/editor-flow',
                  component: './editor/editor-flow',
                },
                {
                  name: 'mind',
                  path: '/editor/editor-mind',
                  component: './editor/editor-mind',
                },
                {
                  name: 'koni',
                  path: '/editor/editor-koni',
                  component: './editor/editor-koni',
                },
              ],
            },
            {
              path: '/',
              redirect: '/dashboard/dashboard-analysis',
              authority: ['admin', 'user'],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
} as IConfig;
