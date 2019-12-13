<template>
    <div class="basic">
        <div class="container">
            <div class="handle-box">
              <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input  style="width:200px;left:10px" title="可按姓名、学号、专业、宿舍信息、缴费情况查找"  v-model="keyUser"  placeholder="查询所需要的内容......"></el-input>
                <el-button style="margin-left:50px;" @click="searchUserinfo(keyUser)">保存</el-button>
            </div>
            <!-- :data="searchUserinfo(keyUser)" -->
            <el-table
                
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center" width="80%"></el-table-column>
                <el-table-column prop="xuehao" label="学号" align="center"></el-table-column>
                <el-table-column prop="college" label="二级学院" align="center"></el-table-column>
                <el-table-column prop="classmate" label="班级" align="center"></el-table-column>
                <el-table-column prop="dorm" label="宿舍号" align="center"></el-table-column>
                <el-table-column prop="date" label="录入时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-star-off" @click="handlecheck(scope.$index, scope.row)"
                        >查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 40]" 
                    :page-size="pagesize"        
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">    
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <EditUser :dialogEdit="dialogEdit" :form="form"></EditUser>
        <!-- 编辑弹出框 -->
    </div>
</template>

<script>
import EditUser from "../common/EditUser"
import axios from "axios";
export default {
    name: 'basetable',
    data() {
        return {
            currentPage:1, //初始页
            pagesize:10,    //    每页的数据
            dialogEdit: {
              show: false
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            form: {},
            keyUser:'',
            formDate:{},
            formrules:{
                name:[{required:true,message:"用户名不能为空",trigger:"blur"}],
                college:[{required:true,message:"二级学院不能为空",trigger:"blur"}],
                classmate:[{required:true,message:"班级信息不能为空",trigger:"blur"}],
                xuehao:[{required:true,message:"学号不能为空",trigger:"blur"}],
                dorm:[{required:true,message:"宿舍号不能为空",trigger:"blur"}],
            }
        };
    },
    created() {
        this.getData();
        // var fd  = new Array()
        // var fd = 
        //   {
        //     id:'1', //人员编号 
        //   }
        // axios.post(`/api/cw-afaps/extService/faceGroup/get`,fd).then(res =>{
        //   console.log(res) 
        // })
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
          console.log("121")
            axios.post(`http://localhost:8081/dormphp/src/Mes_Show.php`).then((res)=> {
            // console.log(res.data.data.length)
            this.tableData = res.data.data
            this.pageTotal = res.data.data.length;
            this.loading = false;  
            const data = res.data.data;
            this.allTableData = data;
            }) 
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //搜索
        searchUserinfo(keyUser) {
          console.log(keyUser)
          
        },
        // 编辑操作
        handleEdit(index, row) {
            this.dialogEdit.show = true;
            this.form = {
            }
        },
        //批量删除
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
         // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },    
    },
    components: {
      EditUser,
    },
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
