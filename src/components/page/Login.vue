<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">宿舍管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
                <!-- <el-link style="left:240px;" icon="el-icon-edit" target="_blank" @click="register()">注册</el-link> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    data: function() {
        return {
            userId:'',//用户编码
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    created() {
        this.$axios.post(`http://localhost:8081/yuyanphp/user/userId.php`).then(res=>{
            this.userId=res.data.data[0].id
            localStorage.setItem('userId',this.userId)
        })
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {//判断是否注册过，有就跳到首页，没有就跳到基本信息 
                    var fd  = new FormData()
                    fd.append("username",this.param.username)
                    this.$axios.post(`http://localhost:8081/dormphp/src/Rge_state.php`,fd).then(res=>{
                        var state=res.data.data.state;
                         localStorage.setItem('ms_username', this.param.username);
                        if(state==0)
                        {
                            this.$message.success('登录成功,请先注册个人信息');
                             localStorage.setItem('state', '未注册');
                             this.$router.push('/situation');
                        }else{
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username', this.param.username);
                            this.$router.push('/');
                        }
                    })       
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>