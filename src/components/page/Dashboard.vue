<template>
  <div>
    <el-row :gutter="2">
      <el-col :span="16" style="width: 66.5%;height: 440px;float: left;">
        <el-card shadow="hover" style="height: 440px;">
          <tabs></tabs><!-- tabs选项卡组件 -->
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 33.5%;height: 440px;float: right;">
        <el-card shadow="hover" >
          <schart style="width: 100%;height: 420px; float: left;" canvasId="pie" :data="data2" type="pie" :options="options3"></schart><!-- 组件 -->
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="2" style="margin: 0;padding: 0;">
        <div  style="background-color: #FFFFFF;width: 33.33%;height: 450px; float: left;">
          <el-select v-model="value" placeholder="请选择" @change="seld()">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
              :label="item.lable">
            </el-option>
          </el-select>
          <schart class="schart" style="width: 100%; float: left;" canvasId="bar" :data="data3" type="pie" :options="options1"></schart>
        </div>
        <div  style="width: 33%;height: 450px; float: left;">
          <schart class="schart" style="width: 100%;height: 450px; float: left;" canvasId="line" :data="data1" type="line" :options="options2"></schart>
        </div>
        <div  style="width: 33.33%;height: 450px; float: right;margin-left: 1px;">
          <schart class="schart" style="width: 100%;height: 450px; float: right;" canvasId="ring" :data="data2" type="ring" :options="options4"></schart>
        </div>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import axios from "axios";
export default {
  name: "dashboard",
  components: {
    Tabs: require("./Tabs.vue").default,
    Schart
  },
  data() {
    return {
       options: [],
        value: '',
      data1: [
        { name: "1月", value: 220 },
        { name: "2月", value: 200 },
        { name: "3与", value: 120 },
        { name: "4月", value: 100 }
      ],
      options1: {
        title: "学生晚归记录统计",
        bgColor: "#FFFFFF",
        titleColor: "#000000",
        legendColor: "#000000",
        radius: 120
      },
      options2: {
        title: "学生不归记录统计",
        bgColor: "#D5E4EB",
        titleColor: "#00887C",
        fillColor: "red",
        contentColor: "rgba(46,199,201,0.3)"
      },
      options4: {
        title: "违规统计",
        bgColor: "#829daa",
        titleColor: "#ffffff",
        legendColor: "#ffffff",
        radius: 120,
        innerRadius: 80
      },
      data2: [{ name: "-", value: 2 }],
      data3: [{ name: "-", value: 1 }],
      options3: {
        title: "学生未出记录统计",
        bgColor: "#FFFFFF",
        titleColor: "#000000",
        legendColor: "#000000",
        radius: 120
      }
    };
  },
  created() {
    // axios.post(`${this.baseURL}/dashboard.php`).then(res => {
    //   this.options = res.data.data
    // });

    // axios.post(`${this.baseURL}/echarts.php`).then(response => {
    //   this.data2 = response.data;
    // });
  },
  methods: {
   seld(){
     var fd = new FormData()
         fd.append("fid",this.value)
     axios.post(`${this.baseURL}/partisfinish.php`,fd).then(res => {
      this.data3 = res.data
      console.log(res.data)
    });
    }
  },
  computed: {
  }
};
</script>


<style scoped>
/* .el-row {
        margin-bottom: 20px;
    } */
.elcol_first {
	height: 450px;
	background-color: #0000FF;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.schart-box {
  margin: 1px;
}
.schart {
  /* width: 500px; */
  height: 420px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
