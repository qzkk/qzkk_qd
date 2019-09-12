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
                        property="account"
                        label="账号名"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="name"
                        label="用户姓名"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="sex"
                        label="性别"
                        :formatter="sexFromat">
                </el-table-column>
                <el-table-column
                        property="major"
                        label="专业">
                </el-table-column>
                <el-table-column
                        property="idCard"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        property="type"
                        label="身份"
                        :formatter = "typeFormat">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="examinePass(scope.row, scope.$index)">通过</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="examineFail(scope.row, scope.$index)">不通过</el-button>
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
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "MbeVerify",
        data(){
            return {
                tableData: [{
                    account: '',
                    name: '',
                    sex: '',
                    major: '',
                    idCard: '',
                    type: '',
                    examine: '',
                    psd: '',
                    state: '',
                    uId: ''
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
        components: {
            headTop,
        },
        created(){
            //this.initData();
            this.getUnexamineUsers();
            //在页面加载时读取localStorage里的状态信息
            localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));

            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload",()=>{
                localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
            })
        },
        methods: {
            //页面初始化时获取未审核通过的用户列表
            getUnexamineUsers: function() {
                this.$axios.get(this.commonVar.axiosServe+'api/getUnexamineUsers')
                    .then(res => {
                        this.tableData = res.data.users;
                        this.count = res.data.length;
                    })
            },
            //通过审核
            examinePass:function(row) {
                let postData = {
                    uid: row.uId,
                    account: row.account,
                }
                console.log(postData);
                this.$axios.post(this.commonVar.axiosServe+'api/examinationPassed', this.$qs.stringify(postData))
                    .then(res => {
                        this.$alert("审核成功", "提示", {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.tableData.pop(row);
                                console.log(this.tableData);
                                this.count--;
                            }
                        })
                    })

            },
            //审核不过
            examineFail:function(row, index){
                let postData = {
                    uid: row.uId,
                    account: row.account,
                }
                console.log(postData);
                this.$axios.post(this.commonVar.axiosServe+'/unexaminationPassed', this.$qs.stringify(postData))
                    .then(res => {
                        this.$alert("不通过审核", "提示", {
                            confirmButtonText: '确定',
                            callback: () => {

                                this.tableData.splice(index, index+1);
                                console.log(index);
                                console.log(this.tableData);
                                this.count--;
                            }
                        })
                    })

            },


            typeFormat(row) {
                if (row.type == '0') {
                    return "队员";
                } else if (row.type == '1') {
                    return "负责人";
                } else if (row.type == '2') {
                    return "管理员";
                }else if (row.type == '3') {
                    return "科考基地";
                }else if (row.type == '4') {
                    return "成果转化中心";
                }
            },

            sexFromat(row) {
                if(row.sex == "0") {
                    return "男";
                } else if(row.sex == "1") {
                    return "女";
                }
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
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