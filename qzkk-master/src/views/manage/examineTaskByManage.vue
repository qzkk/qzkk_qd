<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
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
                        label="任务名称" width="120px">
                </el-table-column>
                <el-table-column
                        property="rs"
                        label="科考区域" width="120px">
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
                        label="开始时间" width="100px">
                </el-table-column>
                <el-table-column
                        prop="ed"
                        label="结束时间" width="100px">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="申请人" width="75px">
                </el-table-column>
                <el-table-column width="79px"
                        label="负责队伍">
                    <template slot-scope="scope">
                        <el-button  size="mini"
                                    type="primary"
                                    @click="viewTeams(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作"
                                 fixed="right"
                                width="250">
                    <template slot-scope="scope">
                        <el-button  size="mini"
                                    type="success"
                                    @click="operateTask(scope.$index, scope.row,1)">同意</el-button>
                        <el-button  size="mini"
                                    type="danger"
                                    @click="operateTask(scope.$index, scope.row,-1)">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                            prop="tid"
                            label="小队id" v-if="false">
                    </el-table-column>
                    <el-table-column
                            prop="uid"
                            label="队长id" v-if="false">
                    </el-table-column>
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
        name: "examineTaskByManage",
        data() {
            return {
                tableData: [],
                dialogFormVisible:false,
                dialogFormVisible1:false,
                teamList:[],
                userList:[]

            }
        },
        components: {
            headTop,
        },
        created(){
            this.select();
        },
        methods:{
            select() {
                this.$axios.post(this.commonVar.axiosServe + '/getTaskListByExamine')
                    .then(res => {
                        if (res.data.code == '500') {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                        if (res.data.code == '200') {
                            this.tableData = res.data.list;
                            console.log(this.tableData);
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
            operateTask: function (index, row,state) {
                var taksId=row.id;
                this.$axios.post(this.commonVar.axiosServe + '/operateTask',this.$qs.stringify({'taid':taksId,'state':state}))
                    .then(res => {
                        if (res.data.code == '200') {
                            this.$alert(res.data.msg, "提示", {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.select()
                                }
                            })
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
                    return "审核中";
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
</style>