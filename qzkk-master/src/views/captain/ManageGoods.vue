<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-button
                    size="small"
                    type="primary"
                    @click="handleInitApplication">申请物资</el-button>
        </div>
        <el-dialog title="物资申请" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="applicationData">
                <el-form-item label="物资种类" :label-width="formLabelWidth">
                    <el-select v-model="applicationData.gId" placeholder="请选择物资种类" @change="getNum($event)">
                        <el-option v-for="goodItem in goodData"  :label="goodItem.name" :value="goodItem.gId" :key="goodItem.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物资数量" :label-width="formLabelWidth">
                    <el-input-number v-model="applicationData.number" @change="" :min="1" :max="maxNumber" label="描述文字"></el-input-number>
                    (最多选择{{maxNumber}}{{specification}})
                </el-form-item>
                <el-form-item label="选择科考小队" :label-width="formLabelWidth">
                    <el-select v-model="applicationData.teamId" placeholder="请选择需要申请的小队">
                        <el-option v-for="teamItem in teamData"  :label="teamItem.name" :value="teamItem.tid" :key="teamItem.name"></el-option>
                    </el-select>
                    (列表为已审核通过的小队)
                </el-form-item>
                <el-form-item label="选择科考任务" :label-width="formLabelWidth">
                    <el-select v-model="applicationData.taskId" placeholder="请选择科考任务">
                        <el-option v-for="taskItem in taskData"  :label="taskItem.sn" :value="taskItem.id" :key="taskItem.name"></el-option>
                    </el-select>
                    (列表为已审核通过的任务)
                </el-form-item>
                <el-form-item label="申请理由" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 8}"
                            placeholder="请输入内容"
                            v-model="applicationData.description">
                    </el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlePostApplication">确 定</el-button>
            </div>
        </el-dialog>
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
                        property="gaId"
                        label="申请编号"
                        width="220">
                </el-table-column>
                <el-table-column v-if="false"
                                 property="tid"
                                 label="团队id"
                                 width="220">
                </el-table-column>
                <el-table-column v-if="false"
                                 property="gid"
                                 label="物资id"
                                 width="220">
                </el-table-column>
                <el-table-column
                        property="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        property="identifier"
                        label="编号">
                </el-table-column>
                <el-table-column
                        property="number"
                        label="申请数量">
                </el-table-column>
                <el-table-column
                        property="tname"
                        label="申请小队">
                </el-table-column>
                <el-table-column
                        property="sn"
                        label="任务名称">
                </el-table-column>
                <el-table-column
                        property="description"
                        label="申请理由"
                        width="220">
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
                                @click="abandonApply(scope.$index, scope.row)" v-if="scope.row.state==0">取消申请</el-button>
                        <el-button v-if="scope.row.state==1"
                                size="mini"
                                type="success"
                                @click="returnGoods(scope.$index, scope.row)">归还物资</el-button>
                        <el-button v-if="scope.row.state==2"
                                   size="mini"
                                   type="primary"
                                   @click="abandonReturn(scope.$index, scope.row)">取消归还</el-button>
                        <el-button v-if="scope.row.state==3"
                                   size="mini"
                                   type="warning"
                                   @click="returnGoods(scope.$index, scope.row)">重新归还</el-button>
                        <el-button  v-if="scope.row.state==-1||scope.row.state==4"
                                   size="mini"
                                   type="danger"
                                   @click="deleteApply(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "ManageGoods",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                formLabelWidth: '80px',
                goodData: [],
                dialogFormVisible: false,
                //申请表单的数据
                applicationData: {
                    gId: '',
                    uId: '',
                    number: '',
                    description: '',
                    teamId:'',
                    taskId:''
                },
                goodData: [],
                teamData:[],
                taskData:[],
                maxNumber: 0,
                specification: '',

            }
        },
        components: {
            headTop,
        },
        created(){
            this.select();
        },
        methods:{
            stateFromat(row) {
                if (row.state == "0") {
                    return "审核中";
                } else if (row.state == "1") {
                    return "审核通过";
                }else if (row.state == "-1") {
                    return "审核不通过";
                }else if (row.state == "2") {
                    return "正在归还";
                }else if (row.state == "3") {
                    return "归还不通过";
                }else if (row.state == "4") {
                    return "归还成功";
                }
            },
            setEmpty() {
                this.applicationData.description = "";
                this.applicationData.gId = "";
                this.applicationData.number = "";
                this.applicationData.uId = ""
            },
            handlePostApplication() {
                console.log(this.applicationData);
                this.$axios.post(this.commonVar.axiosServe+'/addGoodApplication', this.$qs.stringify(this.applicationData))
                    .then(res => {
                        if(res.data.code == "200") {
                            this.$confirm('提交成功', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success',
                                center: true,
                                callback: () => {
                                    location.reload();
                                }
                            })
                        } else if(res.data.code == "500") {
                            this.$confirm('提交失败，服务器错误', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'error',
                                center: true
                            })
                        } else if(res.data.code == "501") {
                            this.$confirm('提交失败，申请的数量过多', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'error',
                                center: true
                            })
                        }
                    });
                this.setEmpty();
                this.dialogFormVisible = false;
            },
            handleInitApplication() {
                this.dialogFormVisible = true;
                this.goodData = [];
                this.$axios.get(this.commonVar.axiosServe+'/getGoodTypes')
                    .then(res => {
                        //console.log(res);
                        if(res.data.code == "200") {
                            for(var i = 0; i < res.data.data.length; i++) {
                                let tempData = {
                                    name : res.data.data[i].name,
                                    gId : res.data.data[i].gId,
                                    number : res.data.data[i].number - res.data.data[i].usingNumber - res.data.data[i].applyingNumber,
                                    specification : res.data.data[i].specification
                                }
                                this.goodData.push(tempData);
                            }
                        }
                    });
                this.$axios.post(this.commonVar.axiosServe+'/teamListOfAccessByUid',this.$qs.stringify({'uid': this.$store.state.UID}))
                    .then(res => {
                        //console.log(res);
                        if(res.data.code == "200") {
                            this.teamData=res.data.list;
                        }
                    });
                this.$axios.post(this.commonVar.axiosServe+'/getTaskListOfAccessByUid',this.$qs.stringify({'uid': this.$store.state.UID}))
                    .then(res => {
                        //console.log(res);
                        if(res.data.code == "200") {
                            this.taskData=res.data.list;
                            console.log(this.taskData)
                        }
                    });
                this.applicationData.uId = this.$store.state.UID;
            },
            select() {
                this.$axios.post(this.commonVar.axiosServe + '/getGoodAplyByUid', this.$qs.stringify({'uid':this.$store.state.UID}))
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
            abandonApply(index, row) {
                this.$confirm('是否执行该操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    this.$axios.post(this.commonVar.axiosServe + '/abandonApply', this.$qs.stringify({'gaid':row.gaId,'gid':row.gid,'number':row.number}))
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
            abandonReturn(index, row) {
                this.$confirm('是否执行该操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    this.$axios.post(this.commonVar.axiosServe + '/abandonReturn', this.$qs.stringify({'gaid':row.gaId}))
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
            deleteApply(index,row){
                this.$confirm('是否执行该操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.commonVar.axiosServe + '/deleteApply', this.$qs.stringify({'gaid':row.gaId}))
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
                                        this.select();
                                    }
                                })
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            returnGoods(index,row){
                this.$confirm('是否执行该操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.commonVar.axiosServe + '/returnGoods', this.$qs.stringify({'goodsId':row.gid,
                        'goodsName':row.name, 'identifier':row.identifier,'retrunNumber':row.number,
                        'teamId':row.tid,'teamName':row.tname,'gaId':row.gaId}))
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
                                        this.select();
                                    }
                                })
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>