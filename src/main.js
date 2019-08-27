// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index.js'
import {Button} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Vuex)
Vue.config.productionTip = false
// import AutoComplete from 'ant-design-vue/lib/AutoComplete'
Vue.use(Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
