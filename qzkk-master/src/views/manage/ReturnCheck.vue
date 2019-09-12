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
                                 label="物资申请id"
                                 width="220">
                </el-table-column>
                <el-table-column v-if="false"
                                 property="goodsId"
                                 label="物资id"
                                 width="220">
                </el-table-column>
                <el-table-column v-if="false"
                                 property="teamId"
                                 label="团队id"
                                 width="220">
                </el-table-column>
                <el-table-column
                        property="goodsName"
                        label="物资名称">
                </el-table-column>
                <el-table-column
                        property="identifier"
                        label="物资编号">
                </el-table-column>
                <el-table-column
                        property="retrunNumber"
                        label="归还数量">
                </el-table-column>
                <el-table-column
                        property="teamName"
                        label="归还小队">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
                        <el-button size="mini"
                                   type="success"
                                   @click="access(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini"
                                    type="danger"
                                    @click="refuse(scope.$index, scope.row)">不通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "ReturnCheck",
        data() {
            return {
                tableData: [],
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
                this.$axios.post(this.commonVar.axiosServe + '/getRetrunApplication')
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
            access(index, row) {
                this.$confirm('是否执行该操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    this.$axios.post(this.commonVar.axiosServe + '/accessReturn', this.$qs.stringify({'gid':row.goodsId,'retrunNumber':row.retrunNumber,'tid':row.teamId,'gaId':row.gaId}))
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
            refuse(index,row){
                console.log(row.gaId);
                this.$confirm('是否执行该操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.commonVar.axiosServe + '/refuseReturn', this.$qs.stringify({'gaId':row.gaId}))
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
        }
    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>