let env = "app";

// #ifdef H5
env = "h5";
// #endif

// #ifdef APP-PLUS
env = "app";
// #endif

// #ifdef MP-WEIXIN
env = "wx";
// #endif

export const GEO_URL = "https://restapi.amap.com/v3"; // 高德地图接口服务路径
export const MAP_KEY = "eef520430048905703a89eef94f73d23"; // 高德地图web_key
export const METRO_KEY = "2676091421668dc3a8b7534e5cc3b502"; // 高德地铁 key

export default {
  // baseUrl: `https://work.panrui.top:8443/${env}`,
  baseUrl: `http://localhost:3000/${env}`, // 本地调试
};
