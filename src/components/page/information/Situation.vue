@@ -0,0 +1,219 @@
<template>
  <div class="container">
        <div id="app">
             <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
				        style="height: 0px;">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-row>
                <el-col :span="18">
                    <el-divider content-position="left">基本信息</el-divider>
                </el-col>
                <!-- @click="savebaseinfo('form_base')" -->
                <el-button type="primary" class="save_btn1" >保存</el-button>
            </el-row>
            <el-form ref="form_base" :model="form"  label-width="110px" class="form">
                <br/>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item  label="姓名">
                            <el-input v-model="tableData_base.username" placeholder="name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="学号">
                            <el-input v-model="tableData_base.number" placeholder="number" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item label="班级">
                            <el-input v-model="tableData_base.class" placeholder="class" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="学院" >
                            <el-input v-model="tableData_base.college" placeholder="college"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item label="联系电话">
                            <el-input v-model="tableData_base.phone" placeholder="phnoe" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="身份证" >
                            <el-input v-model="tableData_base.cardId" placeholder="cardId" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item label="楼栋">
                            <el-input v-model="tableData_base.dorm_floor" placeholder="dorm_floor" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="宿舍号">
                            <el-input v-model="tableData_base.dorm_num" placeholder="dorm_num" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item label="性别">
                            <el-input v-model="tableData_base.sex" placeholder="sex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="专业">
                            <el-input v-model="tableData_base.major" placeholder="专业"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item label="籍贯">
                            <el-input v-model="tableData_base.natives" placeholder="籍贯"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="邮箱">
                            <el-input v-model="tableData_base.email" placeholder="邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="18">
                    <el-divider content-position="left">家庭信息</el-divider>
                </el-col>
                <el-button type="primary" class="save_btn2">保存</el-button>
            </el-row>
            <el-form ref="form_faimly" :model="form" label-width="110px" class="form">
                <br/>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="家庭关系">
                            <el-input v-model="form.name3"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="联系电话">
                            <el-input v-model="form.name4"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="5">
                        <el-form-item label="姓名" >
                            <el-input v-model="form.name5"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="家庭关系" >
                            <el-input v-model="form.name6"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="联系电话">
                            <el-input v-model="form.name7"></el-input>
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
        id:'',
        form:{
          username: '',
          email: '',
          number:''
        },
        tableData_base: [],
        imageUrl: '',
      }
    },
    created(){
      //个人信息
      this.number=localStorage.getItem('ms_username');
      var fd  = new FormData()
      fd.append("flag",this.number)
      this.$axios.post(`http://localhost:8081/dormphp/src/Person_Info.php`,fd).then(res =>{
        this.tableData_base = res.data.data[0]
        this.imageUrl ='http://192.168.0.167:8380/'+this.tableData_base.FACE_URL
        })
    },
    mounted() {
      this.form.number=localStorage.getItem('ms_username');
    },
    methods: {
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
        //校验成功上传文件
        if(isJPG && isLt2M == true){
          // post上传图片
          new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
              var imgcode = e.target.result;
              localStorage.setItem('photo_base64',imgcode)
            }
          })  
          this.$message({
            type:"success",
            message:"上传成功，请按确定以保存！"
          })       
        }
        return isJPG && isLt2M;
      },
      //*******************************接口暂时放下***************************************
      //添加人脸接口
      // addfaceApi(facegroupId){
      //   var imageData = localStorage.getItem('photo_base64')
      //   imageData = imageData.replace(/^data:image\/\w+;base64,/, "")
      //   var fd  = new Array()
      //   var fd = 
      //     {
      //       name:this.form.username,
      //       carId:this.form.cardId,
      //       natives:"广东",
      //       groupId:facegroupId,
      //       imageData:imageData,
      //       userId:"c11aa5249fb64ba5bfc10f93e123320a",
      //       race:"",
      //       remark:""
      //     }
      //   this.$axios.post(`/api/cw-afaps/extService/face/add`,fd).then(res =>{
      //     this.$message.success('保存成功！')
      //   })  
      // },
      // //查询人脸库接口
      // checkfacegroupId(){
      //   var fd  = new Array()
      //   var fd = 
      //   {
      //     userId:'c11aa5249fb64ba5bfc10f93e123320a', //人员编号 
      //   }
      //   //获取人脸库名称及人脸库id
      //   this.$axios.post(`/api/cw-afaps/extService/faceGroup/select`,fd).then(res =>{
      //     for(var i=0;i<2;i++){
      //       if(this.form.dorm_floor==res.data.data.datas[i].name){//用宿舍楼号获取人脸库id
      //         var facegroupId =res.data.data.datas[i].id
      //       }
      //     }
      //     this.addfaceApi(facegroupId)
      //   })
      // },
      // savebaseinfo(form_base){
      // this.checkfacegroupId()
      // this.$refs[form_base].validate(valid => {
      //     if (valid) {
      //       localStorage.setItem('state', '注册');
      //       var fd  = new FormData()
      //       fd.append("username",this.form.username)
      //       fd.append("number",this.form.number)
      //       fd.append("class",this.form.class)
      //       fd.append("college",this.form.college)
      //       fd.append("phone",this.form.phone)
      //       fd.append("carId",this.form.carId)
      //       fd.append("dorm_floor",this.form.dorm_floor)
      //       fd.append("dorm_num",this.form.dorm_num)
      //       fd.append("sex",this.form.sex)
      //       fd.append("email",this.form.email)
      //       fd.append("state",1)     
      //       this.$axios.post(`http://localhost:8081/dormphp/src/UpState.php`,fd).then(res =>{
      //         console.log(res) 
      //       })
      //     }
      //   });
      // }, 
      //*******************************接口暂时放下***************************************
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 ! important;
    border-radius: 6px ! important;
    top: 130px ! important;
    cursor: pointer ! important;
    position: relative ! important;
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
  .container{
    height: 100%;  
  }
  .save_btn1{
    margin:1px;
    width:100px;
    height:45px;
    font-size:15px;
  }
  .save_btn2{
    margin:1px;
    width:100px;
    height:45px;
    font-size:15px;
  }
  .form{
    margin-top: 30px;
    margin-left:210px;
  }
  .row{
    margin-left: 15px;
  }
</style>