"use strict";
const appApi = {
  // 登录
  login: "/app/login",
  // 注册
  register: "/app/register",
  // 退出登录
  logout: "/app/logout",
  // 获取用户信息
  getUserInfo: "/app/getUserInfo",
  // 上传流浪日记
  addWander: "/app/addWander",
  // 获取流浪日记列表
  getWanderList: "/app/getWanderList",
  // 获取流浪日记详情
  getWanderDetail: "/app/getWanderDetail",
  // 更新流浪日记
  updateWander: "/app/updateWander",
  // 上传流浪日记评论
  addWanderComment: "/app/addWanderComment",
  // 获取流浪日记评论列表
  getWanderCommentList: "/app/getWanderCommentList",
  // 获取流浪日记评论详情
  getWanderCommentDetail: "/app/getWanderCommentDetail",
  // 文件上传
  uploadFile: "/app/uploadFile",
  // 获取日历
  calendar: "/app/calendar",
  // 获取天气
  weather: "/app/weather"
};
exports.appApi = appApi;
