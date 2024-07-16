/*
 * @Author: panrui 1547177202@qq.com
 * @Date: 2024-07-16 22:02:38
 * @LastEditors: panrui 1547177202@qq.com
 * @LastEditTime: 2024-07-16 22:03:13
 * @FilePath: \only.panrui.top\src\api\tag.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NEST_API_URL } from "@/config/app";
export const TAG_API = {
 getTagList: `${NEST_API_URL}/tag/getTagList`,
}