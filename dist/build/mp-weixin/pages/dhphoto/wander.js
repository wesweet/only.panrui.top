"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/request.js"),o=require("../../config/app.js"),n=require("../../api/app.js");if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-datetime-picker")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const a=e.defineComponent({__name:"wander",setup(a){const i=e.reactive({title:"",date:"",content:""}),r=e.reactive({title:{rules:[{required:!0,errorMessage:"请输入标题"}]},date:{rules:[{required:!0,errorMessage:"请选择日期"}]},content:{rules:[{required:!0,errorMessage:"请输入内容"}]}}),s=e.ref(!1),u=()=>{},l=e.ref("");e.onLoad((e=>{e.id&&(l.value=e.id,d())}));const d=()=>{t.request(n.appApi.getWanderDetail,{method:"GET",data:{id:l.value}}).then((t=>{const{errorCode:o,errorMessage:n,data:a}=t;0==o&&(e.index.showToast({title:n,duration:2e3,icon:"none"}),a&&(i.title=a.title,i.date=a.date,i.content=a.content,a.photo&&p.push({name:"image",uri:a.photo})))})).catch((e=>{console.log(e)}))},p=e.reactive([]),c=()=>{e.index.chooseImage({count:1,success(e){for(let t=0;t<e.tempFilePaths.length;t++){const o=`${Date.now()}${Math.round(1e9*Math.random())}`;p.push({name:o,uri:e.tempFilePaths[t]})}}})},m=e.ref(null),h=()=>{m.value.validate().then((t=>{l.value&&(t.id=l.value),s.value=!0,e.index.uploadFile({url:o.HTTP_REQUEST_URL+n.appApi.addWander,files:p,formData:t,success(t){s.value=!1;const o=JSON.parse(t.data),{errorCode:n,message:a}=o;0==n&&e.index.showToast({title:a,icon:"success",duration:1500,success(){e.index.navigateTo({url:"/pages/dhphoto/dhphoto"})}})},fail(e){s.value=!1,console.log(e)}})}))};return(t,o)=>({a:e.o((e=>i.title=e)),b:e.p({placeholder:"请输入标题",modelValue:i.title}),c:e.p({label:"标题",name:"title"}),d:e.o(u),e:e.o((e=>i.date=e)),f:e.p({type:"date","clear-icon":!1,modelValue:i.date}),g:e.p({label:"日期",name:"date"}),h:e.f(p,((t,o,n)=>({a:t.uri,b:e.o((t=>(t=>{e.index.previewImage({current:p[t].uri,urls:p.map((e=>e.uri))})})(o)),o),c:e.o((e=>(e=>{p.splice(e,1)})(o)),o),d:o,e:o}))),i:p.length<1,j:e.o(c),k:e.p({label:"图片",name:"photo"}),l:e.o((e=>i.content=e)),m:e.p({placeholder:"请输入内容",type:"textarea",rows:10,maxlength:"500",modelValue:i.content}),n:e.p({label:"内容",name:"content"}),o:e.sr(m,"1bec5f64-0",{k:"valiForm"}),p:e.p({rules:r,modelValue:i,"label-position":"top"}),q:e.o(h),r:s.value,s:s.value})}}),i=e._export_sfc(a,[["__scopeId","data-v-1bec5f64"]]);wx.createPage(i);
