<template>
    <div class="abc">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="aplyTask" :rules="rules" ref="creatTeam" label-width="10%">
                <el-form-item label ="任务名称" prop="subjectName">
                    <el-input  v-model="aplyTask.subjectName" placeholder="请输入任务名称">
                    </el-input>
                </el-form-item>
                <el-form-item label ="科考区域" prop="researchSite">
                    <el-input  v-model="aplyTask.researchSite" placeholder="请输入科考区域">
                    </el-input>
                </el-form-item>
                <el-form-item label ="任务内容" prop="subjectTask">
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入任务内容"
                            v-model="aplyTask.subjectTask">
                    </el-input>
                </el-form-item>
                <el-form-item label ="分配任务">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="selectChargedTeam()">选择负责小队</el-button>
                </el-form-item>

                <el-form-item label ="服务保障需求" prop="demand">
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入服务保障需求"
                            v-model="aplyTask.demand">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="aply" class="submit_btn">申请</el-button>
                </el-form-item>
            </el-form>
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
                                @click="dialogFormVisible = false">确定
                        </el-button>
                    </el-col>

                    <el-col :span="2">
                        <el-button
                                type="danger"
                                @click="dialogFormVisible = false;yxzData=[]">取消
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
        name: "AplyTask",
        data() {
            return {
                aplyTask: {
                    subjectName: '',
                    researchSite:'',
                    subjectTask:'',
                    demand:'',
                    uid:this.$store.state.UID
                },
                teamList: [],
                dialogFormVisible:false,
                yxzData:[],
                rules: {
                    subjectName: [
                        {required: true, message: '请填写任务名称', trigger: 'blur'},
                    ],
                    researchSite: [
                        {required: true, message: '请填写科考区域', trigger: 'blur'},
                    ],
                    subjectTask: [
                        {required: true, message: '请填写任务内容', trigger: 'blur'},
                    ],
                    demand: [
                        {required: true, message: '请填写服务保障需求', trigger: 'blur'},
                    ],
                },
            }
        },
        components: {
            headTop,
        },

        methods: {
            aply: function() {
                let reqData={
                    "teamTaskList":this.yxzData,
                    "task":this.aplyTask
                }
                this.$axios.post(this.commonVar.axiosServe+'/aplyTask', reqData)
                    .then(res => {
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: () => {
                                location.reload();
                            }
                        })

                    })
            },
            selectChargedTeam: function () {
                this.$axios.post(this.commonVar.axiosServe + '/selectChargedTeam',this.$qs.stringify({'uid':this.$store.state.UID}))
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
            handleSelectionChange(val) {
                this.yxzData = val;
                console.log(this.yxzData)
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
        }
    }
</script>

<style scoped>

</style>