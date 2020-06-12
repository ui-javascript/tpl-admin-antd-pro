export default [
  {
    path: '/account',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/account/login',
        component: './account/login',
      },
    ],
  },
  {
    path: '/exception',
    routes: [
      {
        path: '/exception/404',
        component: './exception/404',
      },
      {
        path: '/exception/403',
        component: './exception/403',
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
        path: '/',
        name: 'dashboard',
        icon: 'home',
        component: './Home',
      },
      {
        path: '/product',
        name: 'product',
        icon: 'shop',
        routes: [
          {
            name: 'productList',
            path: '/product/list',
            component: './product/list',
          },
          {
            name: 'createProduct',
            path: '/product/create',
            component: './product/list/create',
            hideInMenu: true,
          },
          {
            name: 'category',
            path: '/product/category',
            component: './product/category',
          },
        ],
      },
      {
        name: 'user',
        path: '/user',
        icon: 'user',
        component: './user/list',
        authority: 'admin',
      },
    ],
  },
  {
    component: './exception/404',
  },
];
