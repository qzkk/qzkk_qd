<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        v-if="false"
                        prop="uId"
                        label="uid"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="tname"
                        label="所属小队">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delTeamMember(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            <div class="Pagination" style="text-align: left;margin-top: 10px;">-->
<!--                <el-pagination-->
<!--                        :page-size="10"-->
<!--                        :pager-count="6"-->
<!--                        layout="prev, pager, next"-->
<!--                        @current-change="current_change"-->
<!--                        :current-page.sync="currentPage"-->
<!--                        :total="totalNum">-->
<!--                </el-pagination>-->
<!--            </div>-->
        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "MemberList",
        data(){
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
        methods: {
            select() {
                this.$axios.post(this.commonVar.axiosServe + '/getMemberAboutTeam', this.$qs.stringify({'uid': this.$store.state.UID}))
                    .then(res => {
                        if (res.data.code == '500') {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                        if (res.data.code == '200') {
                            this.tableData = res.data.list;
                        }
                    })
            },
            delTeamMember(index,row){
                this.$confirm('是否执行该操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.commonVar.axiosServe + '/delTeamMember', this.$qs.stringify({'uid':row.uId}))
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