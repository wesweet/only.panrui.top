/*
 * @Author: panrui 1547177202@qq.com
 * @Date: 2024-07-20 11:18:14
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-07-24 20:49:21
 * @FilePath: \only.panrui.top\src\api\account.ts
 * @Description: 账号管理模块接口地址
 */
import { NEST_API_URL } from "@/config/app";
export const ACCOUNT_API = {
 saveAccount: `${NEST_API_URL}/account/saveAccount`,
 getAccountList: `${NEST_API_URL}/account/getAccountList`,
 deleteAccount: `${NEST_API_URL}/account/deleteAccount`,
}