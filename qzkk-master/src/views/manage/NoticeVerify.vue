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
                <el-table-column
                        property="title"
                        label="标题"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="pubDate"
                        label="发布日期"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="type"
                        label="类型"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="publisher"
                        label="发布者"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="content"
                        label="内容"
                        width="350">
                </el-table-column>
                <el-table-column label="操作"
                                 fixed="right"
                                 width="250">
                    <template slot-scope="scope">
                        <el-button
                                type="success"
                                size="mini"
                                @click="handleSee(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="count">
                </el-pagination>
            </div>
        </div>

        <el-dialog
                title="通知"
                :visible.sync="dialogVisible"
                width="30%"
                v-model="showMsg">
            <div>标题：{{showMsg.title}}</div>
            <div>发布日期：{{showMsg.pubDate}}</div>
            <div>类型：{{showMsg.type}}</div>
            <div>发布者：{{showMsg.publisher}}</div>
            <div>正文：{{showMsg.content}}</div>

        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "NoticeVerify",
        data(){
            return {
                tableData: [{
                    title: 'AC1',
                    pubDate: 'username1',
                    publisher: '2016-05-02',
                    type: '紧急通知',
                    content: '男',
                }],
                form: {
                    registe_time: '',
                    username: '',
                    city: ''
                },
                showMsg: {},
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                dialogVisible: false
            }
        },
        components: {
            headTop,
        },
        created(){},
        methods: {
            handleSee(index, row) {
                console.log(index, row);
                this.showMsg = this.tableData[index];
                this.dialogVisible = true;
                // this.$confirm('通过该申请, 是否继续?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     this.$message({
                //         type: 'success',
                //         message: '审核成功!'
                //     });
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '已取消审核'
                //     });
                // });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
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