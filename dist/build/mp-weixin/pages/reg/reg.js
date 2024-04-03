"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-nav-bar")+e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-data-checkbox")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js")+(()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const r=e.defineComponent({__name:"reg",setup(r){const o=e.reactive({username:"",password:"",mobile:"",gender:"M"}),n={username:{rules:[{required:!0,errorMessage:"请输入账号",trigger:"blur"},{minLength:3,maxLength:10,errorMessage:"长度在 3 到 10 个字符",trigger:"blur"}]},password:{rules:[{required:!0,errorMessage:"请输入密码",trigger:"blur"},{minLength:6,maxLength:20,errorMessage:"长度在 6 到 20 个字符",trigger:"blur"}]},mobile:{rules:[{required:!0,errorMessage:"请输入手机号",trigger:"blur"},{minLength:11,maxLength:11,errorMessage:"手机号格式不正确",trigger:"blur"}]},gender:{rules:[{required:!0,errorMessage:"请选择性别",trigger:"change"}]}},a=e.ref("");e.onReady((()=>{a.value.setRules(n)}));const s=[{text:"男",value:"M"},{text:"女",value:"F"},{text:"未知",value:"U"}],u=e=>{console.log(e)},i=async()=>{await a.value.validate()};return(r,l)=>({a:e.p({shadow:!0,dark:!0,title:"注册"}),b:e.o((e=>o.username=e)),c:e.p({trim:"all",placeholder:"请输入账号",modelValue:o.username}),d:e.p({label:"账号",name:"username",required:!0}),e:e.o((e=>o.password=e)),f:e.p({type:"password",placeholder:"请输入密码",modelValue:o.password}),g:e.p({label:"密码",name:"password",required:!0}),h:e.o((e=>o.mobile=e)),i:e.p({trim:"all",placeholder:"请输入手机号",modelValue:o.mobile}),j:e.p({label:"手机号",name:"mobile",required:!0}),k:e.o(u),l:e.o((e=>o.gender=e)),m:e.p({localdata:s,modelValue:o.gender}),n:e.p({label:"性别",name:"gender",required:!0}),o:e.sr(a,"58af3456-1",{k:"form"}),p:e.p({rules:n,model:o}),q:e.o(i)})}}),o=e._export_sfc(r,[["__scopeId","data-v-58af3456"]]);wx.createPage(o);
