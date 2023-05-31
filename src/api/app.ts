/*
 * @Description: 
 * @Author: panrui
 * @Date: 2023-05-25 15:24:31
 * @LastEditTime: 2023-05-30 14:43:08
 * @LastEditors: panrui
 * 不忘初心,不负梦想
 */
import request from "@/utils/request";

// 登录
export function fetchLogin(data : any) {
	return request?.post?.("/app/login", data, { noAuth: true });
}

// 参照上面的语法写一个注册的请求	
export function fetchRegister(data : any) {
	return request?.post?.("/app/register", data, { noAuth: true });
}
