// 统一导出 封装好的网络请求函数 外部直接引入api 默认找index.js
// api 各个请求模块js 
// 导入
import { recommendMusic } from "./home";
import { newMusic } from "./home";
import { hotSearch,searchResultList } from "./Search";
import { getSongById,getLyricById } from "./Play";

// 导出
export const recommendMusicApi=recommendMusic
export const newMusicApi=newMusic
export const hotSearchApi=hotSearch
export const searchResultListApi=searchResultList
export const getSongByIdAPI=getSongById
export const getLyricByIdAPI=getLyricById
