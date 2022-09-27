<template>
    <div>
      <!--  提取公共组件 包括样式和数据  -->
      <van-cell  center 
       :title="name"
       :label="author + '-' +name"
       :key="id"
      
       >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
              <van-icon name="play-circle-o" size='0.6rem'
              @click="playFn"
              />
          </template>
      </van-cell>
    </div>
  </template>
  
  <script>
  export default {  
    props:{
      name:String,//歌名
      author:String,//歌手
      id:Number//歌曲id 为播放功能做准备 区分是哪首歌
    },
    methods: {
      playFn(){
        // 编程路由导航
        this.$router.push({
          path:'/play',
          query:{
            id:this.id
          }
        })
      }
    },
  }
  </script>
  
  <style scoped>
  .van-cell {
      border-bottom: 1px solid gray;
  }
  </style>