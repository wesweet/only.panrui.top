
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"百宝箱","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"唯一","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.7.4","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"/static/-tongue-.png","selectedIconPath":"/static/-tongue-.png","text":"首页"},{"pagePath":"pages/treasure/treasure","iconPath":"/static/-tongue-_1.png","selectedIconPath":"/static/-tongue-_1.png","text":"百宝箱"},{"pagePath":"pages/user/user","iconPath":"/static/-tongue.png","selectedIconPath":"/static/-tongue.png","text":"个人中心"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"titleText":"首页","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/user/user","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"enablePullDownRefresh":false,"navigationBar":{"titleText":"个人中心","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/login/login","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"登录","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/treasure/treasure","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"titleText":"百宝箱","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/ditie/ditie","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"地铁线路图","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/dianzishu/dianzishu","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"盗版小说","type":"default"},"isNVue":false}},{"path":"pages/wendang/wendang","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/gouwu/gouwu","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"指南","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/chatgpt/chatgpt","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/reg/reg","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"注册","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/bluetooth/bluetooth","meta":{"navigationBar":{"titleText":"蓝牙测试","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/dhphoto/dhphoto","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"瑞瑞和叮叮的流浪日记","type":"default"},"isNVue":false}},{"path":"pages/dhphoto/wander","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  