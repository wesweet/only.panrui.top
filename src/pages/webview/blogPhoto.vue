<!--
 * @Author: panr99 1547177202@qq.com
 * @Date: 2024-07-08 13:15:15
 * @LastEditors: panr99 1547177202@qq.com
 * @LastEditTime: 2024-07-10 11:04:00
 * @FilePath: \only.panrui.top\src\pages\webview\blogPhoto.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
 <view>
   <prstatus></prstatus>
   <!-- <uni-nav-bar left-icon="left" shadow dark title="神奇文档" @clickLeft="back" /> -->
   <web-view src="https://blog.panrui.top/box/gallery/firstMeet"></web-view>
 </view>
</template>
<script>
var wv; //计划创建的webview
export default {
 onLoad() {

   // #ifdef APP-PLUS
   wv = plus.webview.create("", "custom-webview", {
     plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
     "uni-app": "none", //不加载uni-app渲染层框架，避免样式冲突
  // scalable: true,
     top: uni.getSystemInfoSync().statusBarHeight + 44, //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
  bottom: 44
   });
   wv.loadURL("https://blog.panrui.top/box/gallery/firstMeet");
   var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
   currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
   setTimeout(function () {
   //   console.log(wv.getStyle());
   }, 1000); //如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
   // #endif
 },
 methods: {
   back() {
       uni.switchTab({
         url: '/pages/tabBar/index'
       });
   }
 }
};
</script>