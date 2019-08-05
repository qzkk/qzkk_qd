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
                        label="姓名"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="workPosition"
                        label="职位"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="workUnit"
                        label="工作单位"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="subject"
                        label="专题名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="researchSite"
                        label="科考地点"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="comeDate"
                        label="来青时间"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="backDate"
                        label="离青时间"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="demand"
                        label="服务保障需求"
                        width="300">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">查看账号信息</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                        :page-size="10"
                        :pager-count="6"
                        layout="prev, pager, next"
                        @current-change="current_change"
                        :current-page.sync="currentPage"
                        :total="totalNum">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="人员信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :disabled="true" >
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号名" :label-width="formLabelWidth">
                    <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业" :label-width="formLabelWidth">
                    <el-input v-model="form.pro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="form.idcard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份" :label-width="formLabelWidth">
                    <el-input v-model="form.identity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册日期" :label-width="formLabelWidth">
                    <el-input v-model="form.registe_time" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "UserList",
        data(){
            return {
                tableData: [],
                currentPage:1,
                totalNum:0,
                condition: {
                    name: '',
                    workUnit:'',
                    subjectName:'',
                    pageOffset:1,
                    pageSize:10
                },
                dialogFormVisible: false,
                formLabelWidth: '120px'
            }
        },
        components: {
            headTop,
        },
        created(){
            // this.initData();
            this.getUsers();
        },
        methods: {
            //从服务器获取用户数据
            getUsers: function() {

                this.$axios.get(this.commonVar.axiosServe+'/getUsers')
                    .then(res => {
                        console.log(res)
                        this.tableData = res.data.users;
                        this.count = res.data.length;
                        console.log(this.res)
                    })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.form = this.tableData[index];
                console.log(index, row);
                console.log(this.form);
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            sexFromat(row) {
                if(row.sex == "0") {
                    return "男";
                } else if(row.sex == "1") {
                    return "女";
                }
            },
            typeFormat(row) {
                if(row.type == '0') {
                    return "队员";
                } else if(row.type == '1') {
                    return "队长";
                } else if(row.type == '2') {
                    return "管理员";
                }
            },
        },

    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }

</style>