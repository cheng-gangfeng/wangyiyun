<template>
<div>
    <van-search shape="round" v-model.trim="value" placeholder="请输入搜索关键词" @input="inputFn" />
    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="resultList.length===0">
        <!-- 标题 -->
        <p class="hot_title">热门搜索</p>
        <!-- 热搜关键词容器 -->
        <div class="hot_name_wrap">
            <span class="hot_item" v-for="(obj, index) in hotArr" :key="index" @click="fn(obj.first)">{{ obj.first }}</span>
        </div>
    </div>
    <div class="search_wrap" v-else>
        <!-- 标题 -->
        <p class="hot_title">最佳匹配</p>

        <van-list v-model="loading"
         :finished="finished"
          finished-text="没有更多了" 
          @load="onLoad"

          >
            <!-- <van-cell center :title="obj.name" :label="obj.ar[0].name+' - '+obj.name" >
                <template #right-icon>
                    <van-icon name="play-circle-o" size='0.6rem' />
                </template>
            </van-cell> -->
            <SongItem v-for="obj in  resultList" :key="obj.id"
    :name="obj.name"
    :id="obj.id"    
    :author="obj.ar[0].name"
    
    ></SongItem>

        </van-list>
    </div>

</div>
</template>

<script>
/** 目标: 铺设热搜关键字
// 1. 搜索框van-search组件, 关键词标签和样式
// 2. 找接口, api/Search.js里定义获取搜索关键词的请求方法
// 3. 引入到当前页面, 调用接口拿到数据循环铺设页面
// 4. 点击关键词把值赋予给van-search的v-model变量

// 目标: 铺设搜索结果
// 1. 找到搜索结果的接口 - api/Search.js定义请求方法
// 2. 再定义methods里getListFn方法(获取数据)
// 3. 在点击事件方法里调用getListFn方法拿到搜索结果数据
// 4. 铺设页面(首页van-cell标签复制过来)
// 5. 把数据保存到data后, 循环van-cell使用即可(切换歌手字段)
// 6. 互斥显示搜索结果和热搜关键词

// 目标: 搜索框-显示结果
// 1. @input给van-search绑定事件
// 2. @input事件中, 获取搜索结果保存 resultList中
// 3. 判断如果搜索关键字为空(.length === 0), 数组清空, 阻止网络请求执行(提前return)

// 目标: 加载更多
// 1. 集成list组件-定义相关的变量(搞懂变量的作用) -监测触底事件
// 2. 一旦触底, 自动执行onload方法
// 3. 对page++, 给后台传递offset偏移量参数-请求下一页的数据
// 4. 把当前数据和下一页新来的数据拼接起来用在当前 页面的数组里
// (切记) - 加载更多数据后,一定要把loading改成false, 保证下一次还能触发onload方法
// bug 无数据/只有一页数据  --- finished改为true 即可 认为加载完成不会再执行onload
// 加几个判断 */
import {
    hotSearchApi,
    searchResultListApi
} from "@/api"
import SongItem from '@/components/SongItem'
export default {
    data() {
        return {
            value: '',
            hotArr: [], //热词关键词
            resultList: [], //热曲列表
            loading:false,//是否正在加载，默认是不是正在加载，组件触底 执行onload中要把 loading=false 下次会再次onload
            finished:false,//是否加载完成
            page:1,//当前页数
            timer:null//定时器
        }
    },
    components:{
        SongItem
    },
    // 获取热词关键字
    async created() {
        const res = await hotSearchApi();
        this.hotArr = res.data.result.hots;
    },
    methods: {
        // 获取热曲列表
        async getListFn() {
            return await searchResultListApi({
                keywords: this.value,
                limit: 20,
                offset:(this.page-1)*20//加载下一页
            })
        },
        // 点击热词
        async fn(val) {
          // 
          this.page=1
          this.finished=false//改变状态为未加载完成会触发 onload事件
            this.value = val
            const res = await this.getListFn();
            this.resultList = res.data.result.songs;
            this.loading=false
        },
        // input输入框改变
        async inputFn() {
          this.page=1
          if(this.timer) clearTimeout(this.timer) 
        this.timer=setTimeout( async ()=>{
        // 包裹住
        // 要防抖的代码
        this.finished=false
            if (this.value.length === 0) {
                this.resultList = [] //不显示内容
                return
            }
            const res = await this.getListFn();
            console.log(res.data.result.songs);
            //  优化：输入框没有数据
            if(res.data.result.songs===undefined){//没有请求到数据
               this.resultList=[]
               return
            }
            this.resultList = res.data.result.songs;
            // 每次网络请求完成都要改成
            this.loading=false
    },1000)
          
        },
        // List 组件通过 loading 和 finished 两个变量控制加载状态，
        // 当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true
        // 此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
        // 若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
        async onLoad(){  
           this.page++
           const res=await this.getListFn()
          // 优化： 当下一页没有数据
           if(res.data.result.songs===undefined){//没有请求到数据
              this.finished=true//设置状态 为加载完成。显示没有更多数据
              this.loading=false
              return
            }
           console.log(res);
          //  追加到原来的数组中
           this.resultList=[...this.resultList,...res.data.result.songs]
           this.loading=false
           //当这次请求结束之后 把正在加载的状态改为false
          //  让下次onload自动执行
        }
    },
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
    padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
    font-size: 0.32rem;
    color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
    margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
    display: inline-block;
    height: 0.853333rem;
    margin-right: 0.213333rem;
    margin-bottom: 0.213333rem;
    padding: 0 0.373333rem;
    font-size: 0.373333rem;
    line-height: 0.853333rem;
    color: #333;
    border-color: #d3d4da;
    border-radius: 0.853333rem;
    border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
    border-bottom: 1px solid lightgray;
}
</style>
