<template>
  <div class="main">
    <!-- <div class="table"> -->
     <table width="650" height="680" align="center" cellspacing="0">
		<caption color:black style="padding-top: 11px;padding-left:90px"><strong style="font-size:21px;font-family:宋体;">课堂教学和实验课程请假条</strong></caption>
		
	</table>
      <!-- <hr style="border:1 dashed #987cb9" width="100%  padding-bottom:5px;" color=black SIZE=1> -->
      <p  align='center'><strong>新生住宿凭条</strong></p>
  <p class="div1">
    <b class="f3">
        电子信息学院&nbsp;<u>{{this.$route.query.zy}}</u>专业&nbsp;<u>{{this.$route.query.classmate}}</u>班级<u>{{this.$route.query.name}}</u>同学入住&nbsp;<u>{{this.$route.query.building}}</u>幢<u>{{this.$route.query.dorm}}</u>号宿舍<u>{{this.$route.query.bed}}</u>床。管理员凭条发放钥匙：新生入住后签《入住协议》。办理住宿卡（交寸照一张）。请前往{{this.classroom}}课室报道
  </b>
  <img  width="210px" height="190px" style='position:absolute;top:779px;left:255px;'>
</p>
<p class="div2">
  
</p>
<p class="div4">
    <b>&nbsp;二级学院(盖章)</b>
</p>
<p class="div5">
  <b>经办人签名:林冬芝</b> 
</p>
<p class="div5">
  <b>{{systemDate}}</b> 
</p>
    <!-- </caption> -->
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
    getTime(){
      let nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      this.systemDate = date.year + '-'  + date.month + '-' + date.date;         
		}
  },
  created(){
    if(this.$route.query.classmate=='电子19A班'||this.$route.query.classmate=='电子19B班'||this.$route.query.classmate=='通信19（2+2）'){
      this.classroom='A103'
    }else if(this.$route.query.classmate=='电子19C班'||this.$route.query.classmate=='电子19D班'||this.$route.query.classmate=='电科19（2+2）'){
      this.classroom='A104'
    }else{
      this.classroom='A105'
    }
    this.getTime();
    clearTimeout(this.timer);  //清除延迟执行 
    this.timer = setTimeout(()=>{   //设置延迟执行
      window.print();
    },100)
	}
};
</script>

<style >
td{
		width: 80px;
	}
        .f3 {
            font-family: serif;
            
        }
        .div2{
            padding-left: 7%;
            padding-top:  1%;
        }
        .div4{
            padding-left: 65%;
            padding-top: 40px;
        }
        .div5{
            padding-left: 66%;
        }
        .div6 {
    width: 300px;
    border-bottom: 1px solid black;
}



  
</style>
