import request from "@/utils/request";

// 登录
export function fetchLogin(data : any) {
	return request?.post?.("/api/login", data, { noAuth: true });
}