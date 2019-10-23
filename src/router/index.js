import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    name:'dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页',requireAuth:true }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '学生信息' ,requireAuth: true}
                },
                {
                    path: '/late',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/late.vue'),
                    meta: { title: '晚归记录' ,requireAuth:true}
                }, {
                    path: '/noback',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/noback.vue'),
                    meta: { title: '不归记录' ,requireAuth:true}
                }, {
                    path: '/nogo',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/nogo.vue'),
                    meta: { title: '不出记录' ,requireAuth:true}
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' ,requireAuth:true }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' ,requireAuth:true}
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Application.vue'),
                    meta: { title: '请假申请' ,requireAuth:true}
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' ,requireAuth:true}
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '账号管理', permission: true }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/405',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/405.vue'),
                    meta: { title: '405' }
                },
                {
                    path: '/situation',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/information/Situation.vue'),
                    meta: { title: '基本信息' }
                },
            ]
        },
        {
            path: '/login',
            name:'login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue')
        },
        {
            path: '/node',
            component: () => import(/* webpackChunkName: "tabs" */ '../components/page/information/Node.vue'),
            meta: { title: 'tab选项卡' ,requireAuth:true }
        },
        {
            path: '/123',
            redirect: '/404'
        }
    ]
});
