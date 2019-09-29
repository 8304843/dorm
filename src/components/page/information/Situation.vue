@@ -0,0 +1,219 @@
<template>
  <div class="container">
        <div id="app">
             <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-row>
                <el-col :span="18">
                    <el-divider content-position="left">基本信息</el-divider>
                </el-col>
                <el-button type="primary" style="margin:1px;width:100px;height:45px;font-size:15px;" @click="save" >保存</el-button>
            </el-row>
            <el-form ref="form" :model="form" :rules="rules" label-width="90px" style="margin-left:160px;">
                <br/>
                <el-row style="margin:15px;">
                    <el-col :span="6">
                        <el-form-item prop="nickname" label="姓名：" >
                            <el-input v-model="form.nickname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学院：" style="margin-left:20px;">
                            <el-input v-model="form.name1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin:15px;">
                    <el-col :span="6">
                        <el-form-item label="班级：">
                            <el-input v-model="form.name2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话：" style="margin-left:20px;">
                            <el-input v-model="form.name3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin:15px;">
                    <el-col :span="6">
                        <el-form-item label="学号：">
                            <el-input v-model="form.number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证：" style="margin-left:20px;">
                            <el-input v-model="form.name3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin:15px;">
                    <el-col :span="6">
                        <el-form-item label="楼栋：">
                            <el-input v-model="form.name2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="宿舍号：" prop="drom" style="margin-left:20px;">
                            <el-input v-model="form.name3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin:15px;">
                    <el-col :span="6">
                        <el-form-item label="性别：">
                            <el-input v-model="form.name2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="当前状态：" style="margin-left:20px;">
                            <el-input v-model="form.name3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="18">
                    <el-divider content-position="left">家庭信息</el-divider>
                </el-col>
                <el-button type="primary" style="margin:1px;width:100px;height:45px;font-size:15px;" >保存</el-button>
            </el-row>
            <el-form ref="form" :model="form" label-width="90px" style="margin-left:160px;">
                <br/>
                <el-row style="margin:15px;">
                    <el-col :span="6">
                        <el-form-item label="姓名：">
                            <el-input v-model="form.name0"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="家庭关系：" style="margin-left:30px;">
                            <el-input v-model="form.name1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话：" style="margin-left:30px;">
                            <el-input v-model="form.name2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin:15px;">
                    <el-col :span="6">
                        <el-form-item label="姓名：" >
                            <el-input v-model="form.name2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="家庭关系：" style="margin-left:30px;">
                            <el-input v-model="form.name3"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话：" style="margin-left:30px;">
                            <el-input v-model="form.name2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        form: {
          useranme: 'admin',
          nickname: '',
          name: '',
          email: '',
          number:''
        },
         imageUrl: '',
        rules: {
          nickname:[{required:true,message:"用户名不能为空",trigger:"blur"}],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          drom:[{required:true,message:"用户名不能为空",trigger:"blur"}],
        },
      }
    },
    methods: {
      handleSaveProfile() {
        let that = this;
        that.$refs.form.validate((valid) => {
          if (valid) {
            that.loading = true;
            let args = {
              nickname: that.form.nickname,
              name: that.form.name,
              email: that.form.email
            };
          }
        });
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
      save(){
        localStorage.setItem('state', '注册');
        var fd  = new FormData()
        fd.append("username",this.form.number)
        fd.append("state",1)     
        this.$axios.post(`http://localhost:8081/dormphp/src/UpState.php`,fd).then(res =>{
          console.log(res) 
        })
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.form.useranme = user.username;
        this.form.nickname = user.nickname || '';
        this.form.email = user.email || '';
        this.form.name = user.name || '';
      }
      this.form.number=localStorage.getItem('ms_username');
    }
    
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 ! important;
    border-radius: 6px ! important;
    top: 200px ! important;
    cursor: pointer ! important;
    position: absolute ! important;
    overflow: hidden ! important;
    width: 180px ! important;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF! important;
  }
  .avatar-uploader-icon {
    font-size: 28px ! important;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>