<template>
  <div class="container">
    <table width="650" height="100%" style="margin:20px auto;"  cellspacing="0">
		<caption color:black align="center" style="padding-top: 11px;">
            <strong class="title">课堂教学和实验课程请假条
            </strong>
        </caption>
        </br>
        </br>
        <p  class="div1 font-style" colspan="7">尊敬的<input style="width:20%;"></input>老师：</p>
        <p  class="div2 font-style" colspan="7">我因<input style="width:50%;"></input>，不能参加<input style="width:5%;"></input>月<input style="width:5%;"></input>日<input style="width:5%;"></input>节</p>
        <p  class="div3 font-style" colspan="7">的<input></input>课程，特向你请假，请予批准。</p>
        <p  class="div2 font-style" colspan="7">此致</p>
        <br>
        <br>
        <p  class="div1 font-style" colspan="7">敬礼！</p>
        <p  class="div2 font-style" colspan="7">请假人：<input style="width:20%;"></input> 学 号:<input style="width:22%;"></input> 班 级：<input style="width:20%;"></input></p>
        <p  class="div4 font-style" colspan="7">201<input style="width:12%;"></input>年<input style="width:12%;"></input>月<input style="width:12%;"></input>日</p>
        <p  class="div2 font-style" colspan="7">批假老师签名：</p>
        <br>
        <p  class="div2 font-style" colspan="7">201<input style="width:5%;"></input>年<input style="width:5%;"></input>月<input style="width:5%;"></input>日</p>
        <el-row>
           <el-button type="primary" style="font-size:15px;float:right;"><router-link target="_blank" to="/node">打印</router-link></el-button>
        </el-row>
	</table>
  </div>
</template>

<script>
export default {
  name: "printTable",
  data () {
    return {
      systemDate:"",
      timer:"",
      classroom:''
    }
  },
  mounted () {
    
   
  },
  methods:{
    
  },
  created(){

	}
};
</script>

<style  media="print" scoped>
        td{
             width: 80px;
          }
        input {
            height: 25px;
            text-align: center;
            font-size: 15px;
            border:none;
            border-bottom: 1px solid #000
        }
        .container{
            height: 100%;
        }
        .f3 {
            font-family: serif;          
        }
        .title{
            font-size:21px;
            font-family:宋体;
            font-weight:bold;
        }
        .font-style {
            margin:15px;
            margin-left:80px;   
        }
        .div2{
            padding-left: 7%;
            /* padding-top:  1%; */
        }
        .div4{
            padding-left: 55%;
            /* padding-top: 40px; */
        }
        .div5{
            padding-left: 66%;
        }
        .div6 {
          width: 300px;
          border-bottom: 1px solid black;
        }    
</style>
