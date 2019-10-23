<template>
    <div class="basic">
        <div class="container">
            <div class="handle-box">
                <el-button 
                type="primary" 
                title="添加学生信息" 
                icon="el-icon-edit-outline"
                @click="hanldeAdd()">
                添加</el-button>
                <el-button 
                type="primary" 
                title="添加学生信息" 
                icon="el-icon-edit-outline"
                class="handle-del mr10" 
                @click="enter()">
                导入</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input  style="width:200px;left:10px" title="可按姓名、学号、专业、宿舍信息、缴费情况查找"  v-model="keyUser"  placeholder="查询所需要的内容......"></el-input>
            </div>
            <el-table
                :data="searchUserinfo(keyUser)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column
                type="index"
                label="序号"
                align="center"
                width="80">
              </el-table-column>
                <el-table-column prop="name" label="姓名" align="center" width="80%"></el-table-column>
                <el-table-column prop="xuehao" label="学号" align="center"></el-table-column>
                <el-table-column prop="college" label="二级学院" align="center"></el-table-column>
                <el-table-column prop="classmate" label="班级" align="center"></el-table-column>
                <el-table-column prop="dorm" label="宿舍号" align="center"></el-table-column>
                <el-table-column prop="date" label="录入时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-star-off"
                            @click="handlecheck(scope.$index, scope.row)"
                        >查看</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
               <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="xuehao">
          <el-input v-model="form.xuehao"></el-input>
        </el-form-item>
        <el-form-item label="二级学院" prop="college">
          <el-input v-model="form.college"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classmate">
          <el-input v-model="form.classmate"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dorm">
          <el-input v-model="form.dorm"></el-input>
        </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit(form)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="formAdd" :model="formDate" label-width="80px" :rules="formrules">
                <el-form-item label="头像" prop="photo">
             <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</el-form-item>
    <el-form-item label="姓名" prop="name">
          <el-input v-model="formDate.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="xuehao">
          <el-input v-model="formDate.xuehao"></el-input>
        </el-form-item>
        <el-form-item label="二级学院" prop="college">
          <el-input v-model="formDate.college"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classmate">
          <el-input v-model="formDate.classmate"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dorm">
          <el-input v-model="formDate.dorm"></el-input>
        </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary"  @click="dialogFormAdd('formAdd')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { fetchData } from '../../api/index';
import axios from "axios";
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
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            keyUser:'',
            imageUrl:'',
            formDate:{
                name:'',//姓名
                xuehao:'',//省份
                college:'',//考生号
                classmate:'',//性别
                dorm:'',//宿舍号
      },
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
        var fd  = new Array()
        var fd = 
          {
            id:'1', //人员编号 
          }
        
        // axios.post(`/api/cw-afaps/extService/faceGroup/get`,fd).then(res =>{
        //   console.log(res) 
        // })
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            axios.post(`http://localhost:8081/dormphp/src/Mes_Show.php`).then((res)=> {
            // console.log(res.data.data)
            this.tableData = res.data.data
            this.total = res.data.data.length-1;
            this.loading = false;  
            const data = res.data.data;
            this.allTableData = data;
            // this.setPaginations()
        }) 
            // fetchData(this.query).then(res => {
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal || 50;
            // });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            //console.log(row.id)
            // 二次确认删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var fd = new FormData()
          fd.append("id",row.id)
          this.$axios.post(`/api/Mes_Del.php`,fd).then(res =>{
            this.$message({
                type:"success",
                message:"删除信息成功"
            })
            this.getData()    //删除数据，更新视图
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        searchUserinfo(keyUser) {
        return this.tableData.filter((user) => {
            if(user.name.includes(keyUser)) {//按姓名查找
                return user
            }
            if(user.xuehao.includes(keyUser)) {//按学号查找
                return user
            }
            if(user.dorm.includes(keyUser)) {//按宿舍信息查找
                return user
            }
             if(user.classmate.includes(keyUser)) {//按注册状态查找
                return user
            }
        })
    },
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
        // 编辑操作
        handleEdit(index, row) {
            //   this.idx = row.id;
            //  this.idx = index;
            // this.form = row;
            this.editVisible = true;
            this.form = {
                id:row.id,
                name:row.name,
                xuehao:row.xuehao,
                college:row.college,
                dorm:row.dorm,
                classmate:row.classmate 
        }
        },
        hanldeAdd(){
          //console.log(123)
          this.addVisible = true;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
        dialogFormAdd(formAdd){
            var fd  = new FormData()
        fd.append("flag",'Add')
        fd.append("name",this.formDate.name)
        fd.append("xuehao",this.formDate.xuehao)
        fd.append("college",this.formDate.college)      
        fd.append("classmate",this.formDate.classmate)
        fd.append("dorm",this.formDate.dorm)
        this.$refs[formAdd].validate((valid) => {
          if (valid) {
               axios.post(`/api/AddStudent.php`,fd).then(this.creatRefresh)
          this.$message({
            type: 'success',
            message: '新建成功!'
          });
          this.addVisible = false;
           clearTimeout(this.timer);  //清除延迟执行 
        this.timer = setTimeout(()=>{   //设置延迟执行
        this.getData();
        },200)
          }else {
            console.log('error submit!!');
            return false;
          }
        })
        this.empty();
        },
       empty() {
      this.formDate.name=''
      this.formDate.xuehao=''
      this.formDate.college=''
      this.formDate.classmate=''
      this.formDate.dorm=''
    },
    saveEdit(form){
        //console.log(form.id)
        var fd  = new FormData()
        fd.append("flag",'edit')
        fd.append("id",this.form.id)
        fd.append("name",this.form.name)
        fd.append("xuehao",this.form.xuehao)
        fd.append("college",this.form.college)      
        fd.append("classmate",this.form.classmate)
        fd.append("dorm",this.form.dorm)
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$axios.post(`/api/EditStudent.php`,fd).then(res => {
                this.$message({
                    type:"success",
                    message:"编辑信息成功"
                })
              //console.log(res)
               this.editVisible = false;
               clearTimeout(this.timer);  //清除延迟执行 
            this.timer = setTimeout(()=>{   //设置延迟执行
            this.getData();
        },200)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 ! important;
    border-radius: 6px ! important;
    top: 20px ! important;
    cursor: pointer ! important;
    position: absolute ! important;
    overflow: hidden ! important;
    width: 180px ! important;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #c7d5e9;
    width: 178px ;
    height: 178px;
    line-height: 178px;
    top: 200px;
    text-align: center;
  }
  .avatar {
    width: 250px;
    height: 250px;
    display: block;
  }
</style>
