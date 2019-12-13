<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量推送</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="class" label="班级"></el-table-column>
                <el-table-column prop="dorm" label="宿舍"></el-table-column>
                <el-table-column prop="gotime" label="出宿舍时间"></el-table-column>
                <el-table-column prop="backtime" label="回宿舍时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope" >
                        <el-button type="text" disabled v-if="flag==false">推送</el-button>
                        <el-button v-if="flag"
                            type="text"
                            @click="push(scope.$index, scope.row)"
                        >推送</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            flag:false,
    //         formDate:{
    //             name:'',//姓名
    //             class:'',//班级
    //             dorm:'',//宿舍号
    //             gotime:'',//出宿舍时间
    //             backtime:'',//回宿舍时间
    //   },
        };
    },
    created() {
        this.getData();
        this.getaccount();
    },
    methods: {
        //获取账号
        getaccount(){
            var account=localStorage.getItem('ms_username');
            var fd  = new FormData()
            fd.append("account",account)
           this.$axios.post(`http://localhost:8081/dormphp/src/judge.php`,fd).then(res=>{
            var level=res.data.data.level;
            if(level==1||level==2)
            {
                this.flag=true;
            }   
          })
        },

        getData() {
            this.$axios.post(`http://localhost:8081/dormphp/src/LateShow.php`).then((res)=> {
            this.tableData = res.data.data
            this.total = res.data.data.length-1;
            this.loading = false;  
            const data = res.data.data;
            this.allTableData = data;
            })
        },



        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
        },
        // //推送操作
        // push(index, row) {
        //         this.$message.success('推送成功');
        //         this.tableData.splice(index, 1);
        //       //  console.log(this.tableData);
        // },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`推送了${str}`);
            this.multipleSelection = [];
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
