<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                    :data="taskList"
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
                        property="name"
                        label="发布人">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="发布人级别"
                        :formatter="typeFromat">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="审核状态"
                        :formatter="stateFromat">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
                        <el-button
                                size="mini"
                                type="danger"
                                @click="selectTeamNotDis(scope.$index, scope.row)">分配任务</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="队伍信息" :visible.sync="dialogFormVisible" width="50%">
            <div class="table_container">
                <el-table
                        ref="multipleTable"
                        :data="teamList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="tid"
                            v-if="false"
                            label="小队id">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="小队">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="审核状态"
                            :formatter="stateFromat">
                    </el-table-column>
                    <el-table-column
                            prop="uname"
                            label="负责人">
                    </el-table-column>

                </el-table>
            </div>
            <div style="margin-top: 20px">
                <el-row :gutter="20" >
                    <el-col :span="18">
                        <div class="Pagination" style="text-align: left;margin-top: 10px;">

                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-button
                                type="primary"
                                @click="distributeTa">分配
                        </el-button>
                    </el-col>

                    <el-col :span="2">
                        <el-button
                                type="danger"
                                @click="dialogFormVisible = false">取消
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "DistributeTask",
        data() {
            return {
                teamList: [],
                taskList:[],
                yxzData:[],
                dialogFormVisible:false,
                taid:0,
            }
        },
        components: {
            headTop,
        },
        mounted(){

            this.select();
        },
        methods: {
            handleSelectionChange(val) {
                this.yxzData = val;
                console.log(this.yxzData)
            },
            select() {
                this.$axios.post(this.commonVar.axiosServe + '/getPassedTaskListByUid', this.$qs.stringify({'uid':this.$store.state.UID}))
                    .then(res => {
                        if (res.data.code == '500') {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                        if (res.data.code == '200') {
                            this.taskList = res.data.list;
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
            selectTeamNotDis: function (index, row) {
                var taksId=row.id;
                this.taid=row.id;
                this.$axios.post(this.commonVar.axiosServe + '/selectTeamNotDis',this.$qs.stringify({'taid':taksId,'uid':this.$store.state.UID}))
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
            distributeTa(){

                let reqData={
                    "teamTaskList":this.yxzData,
                    "taid":this.taid
                }
                this.$axios.post(this.commonVar.axiosServe+'/distributeTa', reqData)
                    .then(res => {
                        this.$alert(res.data.msg, "提示", {
                            confirmButtonText: '确定',
                            callback: () => {
                                location.reload();
                            }
                        })

                    })
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