import {
  HEADER,
  HEADERPARAMS,
  TOKENNAME,
  HTTP_REQUEST_URL,
} from "@/config/app";

type RequestOptionsMethod =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";
type RequestOptionsMethodAll =
  | RequestOptionsMethod
  | Lowercase<RequestOptionsMethod>;

const requestOptions: RequestOptionsMethodAll[] = [
  "options",
  "get",
  "post",
  "put",
  "head",
  "delete",
  "trace",
  "connect",
];
type Methods = typeof requestOptions[number];
const request: { [key in Methods]?: Function } = {};

function baseRequest(
  url: string,
  method: RequestOptionsMethod,
  data: any,
  { noAuth = false, noVerify = false, noLoading = false }: any,
  params: any
) {
  const ajaxdata = Object.assign({}, data);
  const token = uni.getStorageSync("token");
  const Url = HTTP_REQUEST_URL;
  let header = JSON.parse(JSON.stringify(HEADER));
  if (params != undefined) {
    header = HEADERPARAMS;
  }
  if (!noAuth) {
    if (!token) {
      return new Promise((reslove, reject) => {
        uni.navigateTo({
          url: "../login/login",
        });
      });
    }
  }
  if (token && token !== "null") {
    ajaxdata.token = token;
    header[TOKENNAME] = token;
  }
  ajaxdata.time = Date.now();
  return new Promise((reslove, reject) => {
    if (!noLoading) {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
    }
    uni.request({
      url: Url + url,
      method: method || "GET",
      header: header,
      data: ajaxdata || {},
      success: (res: any) => {
        console.log("接口成功返回值:", res);
        if (!noLoading) {
          uni.hideLoading();
        }
        if (noVerify) {
          reslove(res.data);
        } else if (res.statusCode === 200) {
          reslove(res.data);
        } else {
          reject(res.data.message || "系统错误");
        }
      },
      fail: (msg) => {
        uni.hideLoading();
        console.log("接口失败返回值:", msg);
        reject("请求失败");
      },
    });
  });
}

requestOptions.forEach((method) => {
  const m = method as unknown as RequestOptionsMethod;
  request[method] = (api: string, data: any, opt: any, params: any) =>
    baseRequest(api, m, data, opt || {}, params);
});

export default request;
