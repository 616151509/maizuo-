// 整个
// 前端项目的入口js文件。
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';
/* eslint-disable  */
// import MockData from './mockData'
// 去除vue开发时的浏览器提示。
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  store,
  components: {
    App: App
  },
  template: '<App/>'
});
