/*
 * @Description:
 * @Author: panrui
 * @Date: 2023-05-25 15:26:42
 * @LastEditTime: 2024-07-24 10:43:47
 * @LastEditors: panr99 1547177202@qq.com
 * 不忘初心,不负梦想
 */

// 定义接口环境
let env = "";

// #ifdef H5
env = "h5";
// #endif

// #ifdef APP-PLUS
env = "app";
// #endif

// export const NEST_API_URL = `https://work.panrui.top:8443/${env}`; // h5生产环境
export const NEST_API_URL = `https://app.panrui.top:8443/${env}`; // app生产环境
// export const NEST_API_URL = `http://localhost:3000/${env}`; // 本地
export const GEO_URL = "https://restapi.amap.com/v3"; // 高德地图接口服务路径
export const MAP_KEY = "eef520430048905703a89eef94f73d23"; // 高德地图web_key
export const METRO_KEY = "2676091421668dc3a8b7534e5cc3b502"; // 高德地铁 key
