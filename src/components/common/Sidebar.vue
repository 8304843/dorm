<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes"  background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                // collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'//各种记录统计
                    },
                    {
                        icon: 'el-icon-lx-people',
                        index: 'table',
                        title: '学生信息'//查看相关楼栋学生进出宿舍记录
                    },                                       
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '异常记录',//记录需推送
                        subs: [
                            {
                                index: 'late',
                                title: '晚归记录'//人性化处理,规定时间推迟几分钟开始计算
                            },
                            {
                                index: 'noback',
                                title: '不归记录',//需求不清楚,如何才算是不归???
                            },
                            {
                                index: 'nogo',
                                title: '未出记录'//未出门时间超过24小时
                            },
                            {
                                index: '3-4',
                                title: '陌生人记录'//非本校人员皆为陌生人
                            },
                            // {
                            //     index: 'upload',
                            //     title: '文件上传'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-notice',
                        index: 'tabs1',
                        title: '紧急报警'//针对陌生人,是否需要与陌生人记录合并???
                    },
                    {
                        icon: 'el-icon-lx-text',
                        index: 'editor',
                        title: '请假申请'//上传假条照片(已请假)  或者编写电子假条  可打印或者推送给辅导员
                    },  
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'markdown',
                        title: '违规申诉'//出现紧急情况被记录,事后向辅导员说明,申请驳回异常记录
                    },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '系统设置',
                        subs: [
                            {
                                index: 'permission',
                                title: '账号管理'//只有超级管理员可查看
                            },
                            // {
                            //     index: '404',
                            //     title: '404页面'
                            // }
                            {
                                index: 'situation',
                                title: '基本信息'//编辑个人信息
                            },
                        ]
                    }
                    ,
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 170px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
