<template>
  <div class="hello">
    <el-dialog title="编辑学生信息" :modal-append-to-body='false' :visible.sync="dialogEdit.show">
      <el-form :model="form" ref="formEdit" label-width="100px" :rules="formrules">
        <el-form-item label="头像" prop="photo">
         <template slot-scope="scope">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8081/yxxtcs/Pic_Upload.php"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">             
              <!-- <el-button size="small" type="primary">点击上传</el-button> -->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <!-- <i v-else>上传预览</i> -->
            </el-upload>   
            <img v-if="form.photo" :src="'http://localhost:8081/yxxtcs/upload/'+form.photo" style="position:absolute ;top:1px;left:200px;" class="avatar"> 
          </template>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="form.province"></el-input>
        </el-form-item> 
        <el-form-item label="考生号" prop="num">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" style="width:100%;" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="message">
          <el-input v-model="form.message"></el-input>
        </el-form-item>
        <el-form-item label="班级信息" prop="classmate">
          <el-input v-model="form.classmate"></el-input>
        </el-form-item>
        <el-form-item label="二级学院" prop="xueyuan">
          <el-input v-model="form.xueyuan"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dorm">
          <el-input v-model="form.dorm"></el-input>
        </el-form-item>
         <el-form-item label="缴费情况" prop="payment">
          <el-select v-model="form.payment" style="width:100%;" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="注册状态" prop="registe">
          <el-select v-model="form.registe" style="width:100%;" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="录取专业" prop="zy">
          <el-input v-model="form.zy"></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="收件人" prop="receive">
          <el-input v-model="form.receive"></el-input>
        </el-form-item>
        <el-form-item label="投档成绩" prop="result">
          <el-input v-model="form.result"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormClose('formEdit')">取 消</el-button>
        <el-button type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
 
<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props:{
    dialogEdit:Object,
    form:Object
  },
  data () {
    return {
      options: [{
          value: '已缴费',
          label: '已缴费'
        }, {
          value: '未缴费',
          label: '未缴费'     
        }],
        options1: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'     
      }],
      options2: [{
          value: '已注册',
          label: '已注册'
        }, {
          value: '未注册',
          label: '未注册'     
        },{
          value: '人工处理',
          label: '人工处理'
        }],
        value: '',
        flag:'null',//用以判断是否点击上传图片
        photo_url:'',
        sex:'',
        imageUrl: ``,
      formrules:{
        name:[{required:true,message:"用户名不能为空",trigger:"blur"}],
        province:[{required:true,message:"省份不能为空",trigger:"blur"}],
        num:[{required:true,message:"考生号不能为空",trigger:"blur"}],
        sex:[{required:true,message:"性别不能为空",trigger:"blur"}],
        message:[{required:true,message:"身份证号不能为空",trigger:"blur"}],
        xueyuan:[{required:true,message:"二级学院不能为空",trigger:"blur"}],
        zy:[{required:true,message:"录取专业不能为空",trigger:"blur"}],
        address:[{required:true,message:"邮寄地址不能为空",trigger:"blur"}],
        code:[{required:true,message:"邮政编码不能为空",trigger:"blur"}],
        phone:[{required:true,message:"联系电话不能为空",trigger:"blur"}],
        receive:[{required:true,message:"收件人不能为空",trigger:"blur"}],
        result:[{required:true,message:"投档成绩不能为空",trigger:"blur"}],
        classmate:[{required:true,message:"班级信息不能为空",trigger:"blur"}],
      }
    }
  },
  created () {
    // console.log(this.form.photo_Base64)

  },
  methods:{
    dialogFormEdit(formEdit) {  
      var fd = new FormData()
      fd.append("flag",'Edit')
      fd.append("name",this.form.name)
      fd.append("id",this.form.id)
      fd.append("province",this.form.province)
      fd.append("num",this.form.num)
      fd.append("sex",this.form.sex)
      fd.append("message",this.form.message)
      fd.append("xueyuan",this.form.xueyuan)
      fd.append("dorm",this.form.dorm)
      fd.append("zy",this.form.zy)
      fd.append("address",this.form.address)
      fd.append("code",this.form.code)
      fd.append("phone",this.form.phone)
      fd.append("receive",this.form.receive)
      fd.append("result",this.form.result)
      fd.append("payment",this.form.payment)
      fd.append("registe",this.form.registe)
      fd.append("classmate",this.form.classmate)
        if(this.form.sex=='男'){
          this.sex ='1'
        }else{
          this.sex ='0'
        }
        var picture_url = localStorage.getItem('photo_base64')
        let token =localStorage.getItem('my_token')
        var base64 =this.form.photo_Base64
        var userId =this.form.userId
        var workCode= this.form.num
        var name= this.form.name
        var Sex = this.sex
        this.$refs[formEdit].validate((valid) => {
          if (valid) {
            this.$axios.post(`http://localhost:8081/yxxtcs/Mes_Change.php`,fd).then(res => {              
                if(res.data.states=='已存在'){
                  this.$message({
                    type: 'error',
                    message: '人员已存在，请检查考生号！'
                  });
                }else{
                  if(base64==null){
                    console.log('不更新照片')
                  }else if(userId==''){
                    console.log('更新照片')
                    //调用上传人员接口信息
                    var picture_Base64 = picture_url.replace(/^data:image\/\w+;base64,/, "")
                    fd.append('file', localStorage.getItem('photo_base64'))
                    fd.append('Base64', picture_Base64)
                    axios.post(`http://localhost:8081/yxxtcs/Pic_Upload.php`,fd).then(res => {
                      console.log(res.data)
                    })
                    this.dialogAddInterface(picture_url,token,workCode,name)//调用接口上传
                  }else{
                     console.log('调用更新')
                    this.dialogUpdateInterface(base64,token,Sex,name,userId)//调用更新人员接口信息
                  }
                  this.$message({
                    type:"success",
                    message:"编辑信息成功"
                  })
                  this.imageUrl = '';
                  this.dialogEdit.show = false;
                  clearTimeout(this.timer);  //清除延迟执行 
                  this.timer = setTimeout(()=>{   //设置延迟执行
                    this.$emit('updateEdit');
                  },100)
                  localStorage.removeItem('photo_base64')
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    },
    dialogAddInterface(picture_url,token,workCode,name){//调用添加人员接口
      picture_url = picture_url.replace(/^data:image\/\w+;base64,/, "")
      this.list = []
      var fd = new Array()
      var fd = [
          {
            id:"55", //人员编号 
            name:name,//人员姓名
            workCode:workCode, //人员工号 系统全局唯一编号，不能重复 
            orgCode:"1000", //机构编码 
            deptCode:"1000", //部门编码 
            gender:this.sex, //性别 1：男 0：女 
            userType:"1", //人员类型 1：普通员工 2：VIP 3：黑名单 
            picture:picture_url, //注册照片 
            customerPicture:picture_url, //显示照片 
            devIds:[""] //需要同步的设备列表 
          }
          ]
        this.list = fd
        axios.post(`api/user/public/api/v1.0/add?token=${token}`,{
          userList:this.list
        }).then(res=>{
          this.userId = res.data.data[0].userId
          var userId = this.userId
          this.test(userId,workCode)
        })
        this.$message({
          type: 'success',
          message: '编辑成功!'
        }); 
    },
    test(userId,workCode){
      var fd =new FormData()
      fd.append("userId",userId)
      fd.append("num",workCode)
      axios.post(`http://localhost:8081/yxxtcs/Mes_UserId.php`,fd).then(res=>{
            // console.log(res)
          })

    },
    dialogUpdateInterface(Base64,token,Sex,name,userId){//调用更新人员接口
      this.list = []
      var fd = new Array()
      var fd = [
          {
            userId:userId, //人员编号 
            name:name,//人员姓名
            gender:Sex, //性别 1：男 0：女 
            picture:Base64, //注册照片 
            customerPicture:Base64, //显示照片 
            devIds:[""] //需要同步的设备列表 
          }
          ]
        this.list = fd
        axios.post(`api/user/public/api/v1.0/update?token=${token}`,{
          userList:this.list
        }).then(res=>{
          console.log(res)
        })
        this.$message({
          type: 'success',
          message: '编辑成功!'
        }); 
    },
    dialogFormClose(formEdit){
      this.dialogEdit.show = false;
      this.imageUrl = '';
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      //上传前对图片类型和大小进行判断
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
        // console.log(file);
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
      // this.$emit('updateEdit')
      return isJPG && isLt2M;
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
</style>