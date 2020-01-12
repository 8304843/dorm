<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <label class="handle-label">晚归时间：</label>
                <el-time-select
                    style="width:15%;"
                    v-model="value"
                    :picker-options="{
                        start: '23:30',
                        step: '00:05',
                        end: '24:00'
                    }"
                    placeholder="默认23：00"
                ></el-time-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="class" label="班级"></el-table-column>
                <el-table-column prop="dorm_floor" label="栋号"></el-table-column>
                <el-table-column prop="dorm_num" label="宿舍"></el-table-column>
                <el-table-column prop="backtime" label="回宿舍时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
                        >详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <label class="handle_label">今天</label>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <EditUser :dialogEdit="dialogEdit" :form="form" :type="type"></EditUser>
        <!-- 编辑弹出框 -->
    </div>
</template>

<script>
import EditUser from "../common/EditUser"
import axios from "axios";
export default {
    name: 'late_recod',
    components: {
        EditUser
	},
    data() {
        return {
            type:'details',//查看详情
            currentPage: 1, //初始页
            pagesize: 10, //    每页的数据
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            dialogEdit: {
              show: false
            }, 
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            flag: 'show',
            value: '23:30',
            value2: '23:30：00',
            lastTime: '05:30:00'
        };
    },
    computed: {
      newName() {
        return this.query.name;
      }
    },
    watch: {
        value(val, newval) {
            this.value2 = val + ':00';
            this.selectTime();
        },
        newName(val) {
            if(val=='')
            {
                this.flag='show';
            }
      }
    },
    created() {
        this.initWebSocket();
    },
    methods: {
        //查看详情
        handleEdit(index, row) {
            var fd = new FormData()
            fd.append('flag','edit_info')
            fd.append('cardId',row.cardId)
            fd.append('account',localStorage.getItem('ms_username'))
            this.$axios.post(`http://localhost:8081/dormphp/src/Mes_Show.php`,fd).then(res =>{
                if(res.data.success=='error'){
                    this.$message.error('你无权操作！！！')
                }else{
                    this.dialogEdit.show = true;
                    this.form = {
                        username: row.username,
                        number: row.number,
                        sex: row.sex,
                        college: row.college,
                        dorm_floor: row.dorm_floor,
                        dorm_num:row.dorm_num,
                        class: row.class,
                        phone: row.phone,
                        cardId: row.cardId,
                        major: row.major,
                        email: row.email,
                        natives: row.natives,
                        rge_time: row.rge_time,
                        FACE_URL:'http://192.168.0.167:8380/'+row.FACE_URL
                    }
                }
            }) 
        },
        //选择时间
        selectTime() {
            var time = this.value2;
            var startHour = time.substring(0, 2);
            var startMin = time.substring(2);
            var i = 0;
            while (startHour < 24) {
                i++;
                startHour++;
            }
            var lastHour = 0;
            while (i < 6) {
                i++;
                lastHour++;
            }
            lastHour = '0' + lastHour;
            this.lastTime = lastHour + startMin;
            this.websocketonmessage();
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        },
        initWebSocket() {
            //初始化weosocket
            const wsuri = 'ws://192.168.0.133:3000/';
            this.websock = new WebSocket(wsuri);
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        },
        websocketonopen() {
            //连接建立之后执行send方法发送数据
            let actions = { send: '1' };
            console.log('连接成功！');
            this.websocketsend(JSON.stringify(actions));
        },
        websocketonerror() {
            //连接建立失败重连
            this.initWebSocket();
        },
        websocketonmessage(e) {
            //数据接收
            var fd = new FormData();
            fd.append('startTime', this.value2);
            fd.append('lastTime', this.lastTime);
            var flag=this.flag;
            if(flag=='show'){
                fd.append('flag', flag);
                this.$axios.post(`http://localhost:8081/dormphp/src/LateShow.php`, fd).then(res => {
                    if (res.data.success == 'success') {
                        this.tableData = res.data.data;
                    } else {
                        this.tableData = [];
                    }
                    let actions = { rec: this.tableData };
                    this.websocketsend(JSON.stringify(actions));
                });
            }else{
                fd.append('flag', flag);
                fd.append('name', this.query.name);
                this.$axios.post(`http://localhost:8081/dormphp/src/LateShow.php`, fd).then(res => {
                    if (res.data.success == 'success') {
                        this.tableData = res.data.data;
                    } else {
                        this.tableData = [];
                    }
                    let actions = { rec: this.tableData };
                    this.websocketsend(JSON.stringify(actions));
                });
            }
        },
        websocketsend(Data) {
            //数据发送
            this.websock.send(Data);
        },
        websocketclose(e) {
            //关闭
            console.log('断开连接', e);
        },
        handleSearch() {
            //搜索
            this.$set(this.query, 'pageIndex', 1);
            if(this.query.name!=''){
                this.flag='searchName';
            }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`推送了${str}`);
            this.multipleSelection = [];
        }
    }
};
</script>
<style scoped>
.handle-box {
    width: 50%;
    margin-bottom: 20px;
}
.handle-select {
    width:80%;
}
.handle-label{
    font-size: 15px;
}
.handle-input {
    margin-left: 30px;
    width: 30%;
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
.pagination {  
    margin-left: auto;
    width: 28%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.handle_label {
    font-size: 13px;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>