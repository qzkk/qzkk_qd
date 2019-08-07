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
                        property="username"
                        label="用户名"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="account"
                        label="账号"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="sex"
                        label="性别">
                </el-table-column>
                <el-table-column
                        property="pro"
                        label="专业">
                </el-table-column>
                <el-table-column
                        property="idcard"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        property="identity"
                        label="身份">
                </el-table-column>
                <el-table-column
                        property="registe_time"
                        label="注册日期"
                        width="220">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
<!--        第一个表格-->
        <el-dialog title="人员信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :disabled="true" >
                <el-form-item label="账号名" :label-width="formLabelWidth">
                    <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
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
<!--                对话框表单-->

            </el-form>
        </el-dialog>
<!--        对话框-->
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "MemberList",
        data(){
            return {
                tableData: [{
                    account: 'AC1',
                    username: 'username1',
                    registe_time: '2016-05-02',
                    sex: '男',
                    pro: 'pro1',
                    idcard: '1242546734567',
                    identity: '队员',
                }],
                form: {
                    registe_time: '',
                    username: '',
                    city: ''
                },
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                dialogFormVisible: false,
                formLabelWidth: '120px'
            }
        },
        components: {
            headTop,
        },
        created(){
            // this.initData();
            //在页面加载时读取localStorage里的状态信息
            localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));

            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload",()=>{
                localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
            })
        },
        methods: {
            // async initData(){
            //     try{
            //         const countData = await getUserCount();
            //         if (countData.status == 1) {
            //             this.count = countData.count;
            //         }else{
            //             throw new Error('获取数据失败');
            //         }
            //         this.getUsers();
            //     }catch(err){
            //         console.log('获取数据失败', err);
            //     }
            // },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            // async getUsers(){
            //     const Users = await getUserList({offset: this.offset, limit: this.limit});
            //     this.tableData = [];
            //     Users.forEach(item => {
            //         const tableData = {};
            //         tableData.username = item.username;
            //         tableData.registe_time = item.registe_time;
            //         tableData.city = item.city;
            //         this.tableData.push(tableData);
            //     })
            // }
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.form = this.tableData[index];
                console.log(index, row);
                console.log(this.form);
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('该用户将移除小队, 是否继续?', '提示', {
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
            }
        },

    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }

</style>