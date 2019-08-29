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
                        property="gaId"
                        label="申请编号"
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
                        <el-button  v-if="scope.row.state==-1"
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
                }else{
                    return "审核被拒绝";
                }
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
                    this.$axios.post(this.commonVar.axiosServe + '/returnGoods', this.$qs.stringify({'gaid':row.gaId,'gid':row.gId,'number':row.number}))
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