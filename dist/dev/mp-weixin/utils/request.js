"use strict";
const common_vendor = require("../common/vendor.js");
const config_app = require("../config/app.js");
const checkRequestValidity = (url) => {
  if (!url) {
    throw new Error("请求地址不能为空");
  }
};
const getToken = () => {
  return common_vendor.index.getStorageSync("token");
};
const request = (url, options) => {
  checkRequestValidity(url);
  const token = getToken();
  if (token) {
    options.header.Authorization = `Bearer ${token}`;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: config_app.HTTP_REQUEST_URL + url,
      method: options.method || "GET",
      data: options.data,
      header: Object.assign(
        {},
        {
          "Content-Type": "application/json"
        },
        options.header
      ),
      success: (response) => {
        resolve(response.data);
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
};
exports.request = request;
