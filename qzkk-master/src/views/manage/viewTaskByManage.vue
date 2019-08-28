<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <div class="container " style="margin-bottom: 20px">
                <el-row :gutter="16" >
                    <el-col :span="2" style="line-height: 40px; font-family: 'Microsoft Yahei', sans-serif"><span>查询条件:</span></el-col>
                    <el-col :span="4"><el-input v-model="selectTaskCondition.tname" placeholder="请输入任务名称" :sapn="4"></el-input></el-col>
                    <el-col :span="4"><el-input v-model="selectTaskCondition.uname" placeholder="请输入申请人" autosize></el-input></el-col>
                    <el-col :span="4">
                        <el-select v-model="selectTaskCondition.state" placeholder="审核状态" style="width: 100%">
                            <el-option label="所有状态" value="2"></el-option>
                            <el-option label="待审核" value="0"></el-option>
                            <el-option label="审核通过" value="1"></el-option>
                            <el-option label="审核被拒绝" value="-1"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4"><el-button type="primary" plain @click="select1">查询</el-button></el-col>
<!--                    <el-col :span="10">-->
<!--                        <span>审核状态:</span>-->
<!--                        <template>-->
<!--                            <el-checkbox-group v-model="checkList" @change="stateChange()">-->
<!--                                <el-checkbox label="待审核"></el-checkbox>-->
<!--                                <el-checkbox label="审核通过"></el-checkbox>-->
<!--                                <el-checkbox label="审核被拒绝"></el-checkbox>-->
<!--                            </el-checkbox-group>-->
<!--                        </template>-->
<!--                    </el-col>-->
                </el-row>
            </div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="100">
                </el-table-column>
                <el-table-column v-if="false"
                                 property="id"
                                 label="任务id"
                                 width="220">
                </el-table-column>
                <el-table-column
                        property="sn"
                        label="任务名称">
                </el-table-column>
                <el-table-column
                        property="rs"
                        label="科考区域">
                </el-table-column>
                <el-table-column
                        property="st"
                        label="任务内容">
                </el-table-column>
                <el-table-column
                        property="demand"
                        label="服务保障需求">
                </el-table-column>
                <el-table-column
                        property="sd"
                        label="开始时间">
                </el-table-column>
                <el-table-column
                        prop="ed"
                        label="结束时间">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="申请人">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="审核状态"
                        :formatter="stateFromat">
                </el-table-column>
                <el-table-column
                        label="负责队伍">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="viewTeams(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-row :gutter="20" >
                    <el-col :span="21">
                        <div class="Pagination" style="text-align: left;margin-top: 10px;">
                            <el-pagination
                                    :page-size="10"
                                    layout="prev, pager, next"
                                    @current-change="current_change"
                                    :current-page.sync="currentPage"
                                    :total="totalNum">
                            </el-pagination>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-button  size="mini"
                                    type="primary"
                                    @click="exportTask()">导出</el-button>
                    </el-col>

                </el-row>
            </div>
        </div>
        <el-dialog title="小队信息" :visible.sync="dialogFormVisible" width="50%">
            <!--            <div class="container ">-->
            <!--                <span>查询条件</span>-->
            <!--                <el-input v-model="condition.name" placeholder="请输入登记人员的姓名" autosize></el-input>-->
            <!--                <el-button type="primary" plain @click="addMemberList">查询</el-button>-->
            <!--            </div>-->
            <div class="table_container">
                <el-table
                        :data="teamList"
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="tname"
                            label="小队">
                    </el-table-column>
                    <el-table-column
                            prop="uname"
                            label="小队负责人">
                    </el-table-column>
                    <el-table-column
                            prop="tid"
                            label="小队id" v-if="false">
                    </el-table-column>
                    <el-table-column
                            prop="uid"
                            label="队长id" v-if="false">
                    </el-table-column>
                    <el-table-column
                            label="队伍成员">
                        <template slot-scope="scope">
                            <el-button  size="mini"
                                        type="primary"
                                        @click="viewMemeber(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </el-dialog>
        <el-dialog title="成员信息" :visible.sync="dialogFormVisible1" width="50%">
            <!--            <div class="container ">-->
            <!--                <span>查询条件</span>-->
            <!--                <el-input v-model="condition.name" placeholder="请输入登记人员的姓名" autosize></el-input>-->
            <!--                <el-button type="primary" plain @click="addMemberList">查询</el-button>-->
            <!--            </div>-->
            <div class="table_container">
                <el-table
                        :data="userList"
                        border
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="name"
                            label="姓名" width="80px">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="级别"
                            :formatter="typeFromat" width="70px">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            :formatter="sexFromat" width="55px">
                    </el-table-column>
                    <el-table-column
                            prop="idCard"
                            label="身份证号" width="170px">
                    </el-table-column>
                    <el-table-column
                            prop="wp"
                            label="职位" width="100px">
                    </el-table-column>
                    <el-table-column
                            prop="wu"
                            label="工作单位">
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "viewTaskByManage",
        data() {
            return {
                tableData: [],
                dialogFormVisible:false,
                teamList:[],
                dialogFormVisible1:false,
                userList:[],
                selectTaskCondition:{
                    tname:'',
                    uname:'',
                    state:'2',
                    pageOffset: 1,
                    pageSize: 10
                },
                totalNum: 0,
                currentPage: 1,
                checkList: ['审核通过','审核被拒绝','待审核'],
                dsh:0,
                shtg:0,
                shjj:0


            }
        },
        components: {
            headTop,
        },
        created(){
            this.select1();
        },
        methods:{
            exportTask(){
                var taskList=this.tableData
                taskList=JSON.stringify(taskList);
                taskList=taskList.replace(/\[/g,"%5B");
                taskList=taskList.replace(/]/g,"%5D");
                taskList=taskList.replace(/{/g,"%7B");
                taskList=taskList.replace(/}/g,"%7D");
                location.href=this.commonVar.axiosServe + '/exportTask?taskList='+taskList;
            },
            stateChange(){
            },
            select1() {
                this.selectTaskCondition.pageOffset = this.currentPage - 1;
                this.$axios.post(this.commonVar.axiosServe + '/getTaskListToPage', this.$qs.stringify(this.selectTaskCondition))
                    .then(res => {
                        console.log(res.data.list)
                        if (res.data.code == '200') {
                            this.tableData = res.data.list;
                            this.totalNum = res.data.totalNum;
                        }
                        if (res.data.code == '500') {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
            },
            viewTeams: function (index, row) {
                var taksId=row.id;
                this.$axios.post(this.commonVar.axiosServe + '/viewTeamsByTaskId',this.$qs.stringify({'taid':taksId}))
                    .then(res => {
                        if (res.data.code == '200') {
                            this.teamList = res.data.list;
                            // if (this.teamList.length==0){
                            //     this.$alert("暂无数据", '提示', {
                            //         confirmButtonText: '确定'
                            //     })
                            // }
                            this.dialogFormVisible=true;
                        } else {
                            this.$alert(res.data.msg, "提示", {
                                confirmButtonText: '确定'
                            })
                        }

                    })
            },
            viewMemeber: function (index, row) {
                var tid=row.tid;
                this.$axios.post(this.commonVar.axiosServe + '/viewMemeberByTid',this.$qs.stringify({'tid':tid}))
                    .then(res => {
                        if (res.data.code == '200') {
                            this.userList = res.data.list;
                            this.dialogFormVisible1=true;
                        } else {
                            this.$alert(res.data.msg, "提示", {
                                confirmButtonText: '确定',
                                callback: () => {
                                    location.reload()
                                }
                            })
                        }

                    })
            },
            current_change(currentPage) {  //改变当前页
                this.currentPage = currentPage;
                this.select1();
            },
            typeFromat(row) {
                if (row.type == "0") {
                    return "队员";
                } else if (row.state == "1") {
                    return "队长";
                }else{
                    return "管理员";
                }
            },
            stateFromat(row) {
                if (row.state == "0") {
                    return "待审核";
                } else if (row.state == "1") {
                    return "审核通过";
                }else{
                    return "审核被拒绝";
                }
            },
            sexFromat(row) {
                if (row.sex == "0") {
                    return "男";
                } else if (row.sex == "1") {
                    return "女";
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';

    .table_container {
        padding: 20px;
    }

    .el-h4 {
        line-height: 40px;
    }

</style>