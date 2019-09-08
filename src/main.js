import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Router from 'vue-router'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    //https://blog.csdn.net/qq_32340877/article/details/79416344 仅供参考
    document.title = `宿舍门禁系统`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
    // const nextRoute = ['dashboard'] // 需要登录的页面
    // let isLogin = localStorage.getItem('ms_username'); // 是否登录
    // // 未登录状态；当路由到nextRoute指定页时，跳转至login
    // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    //     console.log(to.meta.requireAuth)
    //     if(isLogin==='null'&& to.path !== '/login'){ //判断本地是否登陆
    //         console.log(to.meta.requireAuth)
    //         next();
    //     }else {
    //         next('/login');
    //     }
    // }else {
    //     next();
    // }
      
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
