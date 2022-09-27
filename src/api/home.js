// 首页模块的网络请求
// 文件名尽量和模块页面文件名统一（方便查找）
// 导入axios
import request from '../utils/request';
// 导出一个网络请求函数 分别导出
// 首页-推荐歌单  在当前文件夹导入 再导出，再在main.js中导入看看能不能请求到数据
// 配合 async aweit
export const recommendMusic=params=>request({
    url:'/personalized',
    params
})
// 首页-最新歌曲
export const newMusic =params=>request({
    url:'/personalized/newsong',
    params
}) 
