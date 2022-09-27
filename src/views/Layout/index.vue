<template>
<div>
    <van-nav-bar :title="activeTitle" fixed />
    <!-- 二级路由 -->
   <div class='main'>
    <router-view></router-view>
   </div>
    <!-- v-model 默认绑定选中标签的索引值，通过修改 v-model 即可切换选中的标签。 -->
    <van-tabbar route>
        <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>

</div>
</template>

<script>
export default {
    data() {
        return {
            activeTitle:this.$route.meta.title//默认值
            // 获取当前路由对象中存好的title 
        };
    },
    watch: {
      // 监听路由对象的改变  把当前路由的原信息的值重新赋给title
      $route(){
        this.activeTitle=this.$route.meta.title
      }
    }
}
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
    padding-top: 46px;
    padding-bottom: 50px;
}
</style>
