import Vue from 'vue'
import App from './App.vue'
import './mobile/flexible'//适配
import './styles/reset.css'//清除默认样式
import router from './router/index.js'
Vue.config.productionTip = false
// 按需引入vant
import {List,Search,Icon,Cell, Image as VanImage,Tabbar, TabbarItem,NavBar,Col, Row , } from 'vant';
Vue.use(List);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(VanImage)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);

// 网络请求测试 导入网络请求函数
// import {recommendMusicApi} from './api/index'
// async function fn(){
//    const res =await recommendMusicApi()
//    console.log(res);
// }
// fn()
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
