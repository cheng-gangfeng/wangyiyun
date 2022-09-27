// 前端路由配置 --最后导出router对象，在main.js引入挂载到Vue配置对象上
// 引入-注册-路由规则-生成对象-导出

import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import Layout from '@/views/Layout'
import Home from '../views/Home';
import Search from '../views/Search'
import Play from '../views/Play'

Vue.use(VueRouter)
const routes=[  
    // 一级路由 
    {
        path: '/', 
        redirect: '/layout'
    },
    { 
        path: '/layout',
        component: Layout,
        redirect:'/layout/home',
        // 二级路由  meta 是当前路由对象的其他属性
        children:[
            { path: 'home', component: Home ,
        meta:{title:'首页'}},
            { path: 'search', component:Search, meta:{title:'搜索'} },

        ]
     },
     {
        path:'/play',
        component:Play
     }

  
]

const router=new VueRouter({
    routes
})

export default router