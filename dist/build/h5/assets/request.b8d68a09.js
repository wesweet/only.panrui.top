import{Y as e,_ as a,Z as t,B as r}from"./index-1b6864a7.js";import{H as o}from"./app.3e5dbecf.js";const s=(s,n)=>{n=Object.assign({method:"GET",data:{},header:{}},n),(e=>{if(!e)throw new Error("请求地址不能为空")})(s);const i=r("token");return i&&(n.header.Authorization=`Bearer ${i}`),new Promise(((r,i)=>{e({title:"加载中",mask:!0}),a({url:o+s,method:n.method||"GET",data:n.data,header:Object.assign({},{"Content-Type":"application/json"},n.header),success:e=>{r(e.data)},fail:e=>{i(e)},complete:()=>{t()}})}))};export{s as r};