<template>
    <div class="fillcontain">
        <head-top></head-top>

        <div class="table_container">
            <div class="container " style="margin-bottom: 20px">
                <el-row :gutter="20" >
                    <el-col :span="2" style="line-height: 40px; font-family: 'Microsoft Yahei', sans-serif"><span>查询条件:</span></el-col>
                    <el-col :span="4"><el-input v-model="condition.name" placeholder="请输入登记人员的姓名" :sapn="4"></el-input></el-col>
                    <el-col :span="4"><el-input v-model="condition.subjectName" placeholder="请输入登记人员的科考主题" autosize></el-input></el-col>
                    <el-col :span="4"><el-input v-model="condition.workUnit" placeholder="请输入登记人员的工作单位" autosize></el-input></el-col>
                    <el-col :span="4"><el-button type="primary" plain @click="select">查询</el-button></el-col>
                </el-row>
            </div>
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
                        prop="type"
                        label="级别"
                        width="100"
                        :formatter="typeFormat">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="50"
                        :formatter="sexFromat">
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
                        prop="subjectName"
                        label="科考主题"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="researchSite"
                        label="科考地点"
                        width="150">
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
                        width="200">
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        width="250">
                    <template slot-scope="scope">
                        <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index)">查看账号信息
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delUser(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                        :page-size="10"
                        layout="prev, pager, next"
                        @current-change="current_change"
                        :current-page.sync="currentPage"
                        :total="totalNum">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="人员信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :disabled="true">
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="账号名" :label-width="formLabelWidth">
                    <el-input v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.psd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="form.idCard" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "UserList",
        data() {
            return {
                tableData: [],
                currentPage: 1,
                totalNum: 0,
                form: {},
                condition: {
                    name: '',
                    workUnit: '',
                    subjectName: '',
                    pageOffset: 1,
                    pageSize: 10
                },
                dialogFormVisible: false,
                formLabelWidth: '80px'
            }
        },
        components: {
            headTop,
        },
        created() {
            // this.initData();
            this.select();
        },
        methods: {
            typeFormat(row) {
                if (row.type == '0') {
                    return "队员";
                } else if (row.type == '1') {
                    return "队长";
                } else if (row.type == '2') {
                    return "管理员";
                }
            },
            sexFromat(row) {
                if (row.sex == "0") {
                    return "男";
                } else if (row.sex == "1") {
                    return "女";
                }
            },
            handleEdit(index) {
                this.dialogFormVisible = true;
                this.form = this.tableData[index];
            },
            current_change(currentPage) {  //改变当前页
                this.currentPage = currentPage;
                this.select();
            },
            delUser: function (index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let postData = {
                        uid: row.uid
                    };
                    this.$axios.post(this.commonVar.axiosServe + '/delUser', this.$qs.stringify(postData))
                        .then(res => {
                            if (res.data.code == '200') {
                                this.$alert(res.data.msg, "提示", {
                                    confirmButtonText: '确定',
                                    callback: () => {
                                        this.tableData.pop(row);
                                    }
                                })
                            } else {
                                this.$alert(res.data.msg, "提示", {
                                    confirmButtonText: '确定'
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
            select() {
                var findall = this.commonVar.axiosServe + '/findAllToPage';
                var findByConditions = this.commonVar.axiosServe + '/findByConditions';
                this.condition.pageOffset = this.currentPage - 1;
                console.log(this.condition);

                this.$axios.post((this.condition.workUnit == '' && this.condition.name == '' && this.condition.subjectName == '' ? findall : findByConditions), this.$qs.stringify(this.condition))
                    .then(res => {
                        if (res.data.code == '500') {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                        if (res.data.code == '200') {
                            this.tableData = res.data.list;
                            this.totalNum = res.data.totalNum;
                        }
                    })
            },
        },

    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';

    .table_container {
        padding: 20px;
    }

    .el-h4 {
        line-height: 40px;
    }

</style>