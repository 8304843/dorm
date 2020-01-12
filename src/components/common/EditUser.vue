<template id="hellooo">
    <div class="hello">
        <el-dialog :title="ban?'学生详细信息':'编辑学生信息'"  :modal-append-to-body="false" :visible.sync="dialogEdit.show">
            <el-form :model="form" ref="formEdit" label-width="100px" :rules="formrules">
                <el-form-item label="头像" prop="photo">
                    <template slot-scope="scope" class="parent">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8081/yxxtcs/Pic_Upload.php"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="form.FACE_URL" :src="form.FACE_URL" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </template>
                </el-form-item>
                <el-form-item label="姓名" prop="username" >
                    <el-input v-model="form.username" :readonly="ban" ></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="class">
                    <el-input v-model="form.class" :readonly="ban" ></el-input>
                </el-form-item>
                <el-form-item label="学院" prop="college">
                    <el-input v-model="form.college" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-input v-model="form.major" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="number">
                    <el-input v-model="form.number" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="cardId">
                    <el-input v-model="form.cardId" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="宿舍楼栋" prop="dorm_floor">
                    <el-input v-model="form.dorm_floor" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号" prop="dorm_num">
                    <el-input v-model="form.dorm_num" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号" prop="sex" v-if="ban" >
                    <el-input v-model="form.dorm_num" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" v-else>
                    <el-select v-model="form.sex" style="width:100%;" placeholder="请选择">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" >
                    <el-input v-model="form.email" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="籍贯" prop="natives">
                    <el-input v-model="form.natives" :readonly="ban"></el-input>
                </el-form-item>
                <el-form-item label="录入时间" prop="rge_time">
                    <el-input v-model="form.rge_time" :readonly="ban"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" v-if="!ban">
                <el-button @click="dialogFormClose('formEdit')">取 消</el-button>
                <el-button type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template> 
 
<script>
export default {
    name: 'EditUser',
    props: {
        dialogEdit: Object,
        form: Object,
        imageUrl: '',
        type:''
    },
    data() {
        return {
            options1: [
                {
                    value: '男',
                    label: '男'
                },
                {
                    value: '女',
                    label: '女'
                }
            ],
            value: '',
            flag: 'false', //用以判断是否点击上传图片
            photo_url: '',
            sex: '',
            readonly:false,
            formrules: {
                name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                province: [{ required: true, message: '省份不能为空', trigger: 'blur' }],
                sex: [{ required: true, message: '性别不能为空', trigger: 'blur' }],
                xueyuan: [{ required: true, message: '二级学院不能为空', trigger: 'blur' }],
                zy: [{ required: true, message: '录取专业不能为空', trigger: 'blur' }],
                phone: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
                classmate: [{ required: true, message: '班级信息不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {

    },
    computed: {
        ban: function () {
            return (this.type=='details'?true:false);
        }
  },
    methods: {
        dialogFormEdit(formEdit) {
            var fd = new FormData();
            // fd.append('flag', 'Edit');
            fd.append('username', this.form.username);
            fd.append('number', this.form.number);
            fd.append('class', this.form.class);
            fd.append('major', this.form.major);
            fd.append('college', this.form.college);
            fd.append('cardId', this.form.cardId);
            fd.append('dorm_floor', this.form.dorm_floor);
            fd.append('dorm_num', this.form.dorm_num);
            fd.append('phone', this.form.phone);
            fd.append('email', this.form.email);
            fd.append('natives', this.form.natives);
            fd.append('sex', this.form.sex);
            fd.append('rge_time', this.form.rge_time);
            if (this.form.sex == '男') {
                this.sex = '1';
            } else {
                this.sex = '0';
            }
            this.$refs[formEdit].validate(valid => {
                if (valid) {
                    this.$axios.post(`http://localhost:8081/dormphp/src/Edit_Stu.php`, fd).then(res => {
                        var facegroupId=res.data.groupId
                        var faceId = res.data.faceId
                        this.ChangePhoto(facegroupId,faceId)//调用接口修改照片
                        this.$message({
                            type: 'success',
                            message: '编辑信息成功'
                        });
                        this.dialogEdit.show = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //修改人脸接口
        ChangePhoto(facegroupId,faceId){
            var imageData = localStorage.getItem('photo_base64')
            imageData = imageData.replace(/^data:image\/\w+;base64,/, "")
            var fd  = new Array()
            var fd = 
            {   
                id:faceId,
                groupId:facegroupId,
                imageData:imageData,
                userId:"c11aa5249fb64ba5bfc10f93e123320a",
            }
            this.$axios.post(`/api/cw-afaps/extService/face/update`,fd).then(res =>{
            })  
        },
        dialogFormClose(formEdit) {
            this.dialogEdit.show = false;
        },
        handleAvatarSuccess(res, file) {
            this.form.FACE_URL = URL.createObjectURL(file.raw);
            this.flag="true" //判断是否有上传操作
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
            if (isJPG && isLt2M == true) {
                // console.log(file);
                // post上传图片
                new Promise(function(resolve, reject) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = e => {
                        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                        var imgcode = e.target.result;
                        localStorage.setItem('photo_base64', imgcode);
                    };
                });
                this.$message({
                    type: 'success',
                    message: '上传成功，请按确定以保存！'
                });
            }
            // this.$emit('updateEdit')
            return isJPG && isLt2M;
        }
    }
};
</script>
<style lang="scss" scoped>
/deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    top: 10px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
    width: 180px !important;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff !important;
}
.avatar-uploader-icon {
    font-size: 28px !important;
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