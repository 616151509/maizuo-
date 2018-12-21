// 路由相关的代码
import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入路由组件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 插件安装
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('./views/menu/Home'),
      children: [
        {
          // 首页
          path: 'films',
          component: () => import('./views/menu/Films.vue'),
          children: [
            {
              path: '',
              redirect: '/films/nowPlaying'
            },
            {
              path: 'nowPlaying',
              name: 'nowPlaying',
              component: () => import('./components/nowPlay')
            },
            {
              path: 'comingSoon',
              name: 'comingSoon',
              component: () => import('./components/comingPlay')
            }
          ]
        },
        {
          // 影院页
          path: '/cinemas',
          name: 'cinemas',
          component: () => import('./views/menu/Cinema.vue'),
          children: [
            {
              // 影院搜索页面
              path: 'search',
              name: 'search',
              component: () => import('./views/menu/search.vue')
            }
          ]
        },
        {
          // 个人中心页
          path: '/center',
          name: 'center',
          component: () => import('./views/menu/Center.vue')
        },
        {
          // 首页
          path: '',
          redirect: '/films'
        }
      ]
    },
    {
      // 详情页面
      path: '/films/:filmId',
      name: 'filmDetail',
      component: () => import('./views/other/FilmDetail.vue')
    },
    {
      // 登录
      path: '/user',
      name: 'user',
      component: () => import('./views/other/user.vue'),
      children: [
        {
          path: 'balance',
          name: 'balance',
          component: () => import('./views/user/balance.vue'),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('userName')) {
              next()
            } else {
              next({
                path: '/user/login',
                query: {
                  redirect: to.fullPath
                }
              })
            }
          }
        },
        {
          path: 'set',
          name: 'set',
          component: () => import('./views/user/set.vue'),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('userName')) {
              next()
            } else {
              next({
                path: '/user/login',
                query: {
                  redirect: to.fullPath
                }
              })
            }
          }
        },
        {
          path: 'card',
          name: 'card',
          component: () => import('./views/user/card.vue'),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('userName')) {
              next()
            } else {
              next({
                path: '/user/login',
                query: {
                  redirect: to.fullPath
                }
              })
            }
          }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/user/login.vue')
        }
      ]
    },
    {
      // 拼团
      path: '/tuan',
      name: 'tuan',
      component: () => import('./views/other/tuan.vue')
    },
    {
      // 城市搜索
      path: '/city',
      name: 'city',
      component: () => import('./views/other/City.vue')
    },
    {
      path: '*',
      redirect: '/films/nowPlaying'
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
// 需要暴露
export default router;
