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
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
                        <el-button
                                size="mini"
                                @click="deleteTask(scope.$index, scope.row)" v-if="scope.row.state==0">取消申请</el-button>
                        <el-button  v-if="scope.row.state==-1"
                                    size="mini"
                                    type="danger"
                                    @click="deleteTask(scope.$index, scope.row)">删除</el-button>
                        <el-button type="success" v-if="scope.row.state==1" icon="el-icon-check" size="mini" ></el-button>
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

                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "ViewTask",
        data() {
            return {
                tableData: [],
                dialogFormVisible:false,
                teamList:[]

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
                this.$axios.post(this.commonVar.axiosServe + '/getTaskListByUid', this.$qs.stringify({'uid':this.$store.state.UID}))
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
            deleteTask(index, row) {
                this.$confirm('是否执行该操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    this.$axios.post(this.commonVar.axiosServe + '/deleteTask', this.$qs.stringify({'id':row.id}))
                        .then(res => {
                            if (res.data.code == '500') {
                                this.$alert(res.data.msg, '提示', {
                                    confirmButtonText: '确定'
                                })
                            }
                            if (res.data.code == '200') {
                                this.$alert(res.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: () => {
                                        this.select()
                                    }
                                })
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消该操作'
                    });
                });

            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>