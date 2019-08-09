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
                        label="所拥有小队">
                </el-table-column>
                <el-table-column
                        v-if="false"
                        prop="tid"
                        label="小队id">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="addMemberList(scope.$index, scope.row)">添加成员
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="人员信息" :visible.sync="dialogFormVisible" width="50%">
            <div class="container ">
                <span>查询条件</span>
                <el-input v-model="condition.name" placeholder="请输入登记人员的姓名" autosize></el-input>
                <el-button type="primary" plain @click="addMemberList">查询</el-button>
            </div>
            <div class="table_container">
                <el-table
                        ref="multipleTable"
                        :data="memberTable"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            :formatter="sexFromat">
                    </el-table-column>
                    <el-table-column
                            prop="workPosition"
                            label="职位">
                    </el-table-column>
                    <el-table-column
                            prop="workUnit"
                            label="工作单位">
                    </el-table-column>

                </el-table>
                <el-button
                        size="mini"
                        type="danger"
                        @click="add">添加
                </el-button>
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
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'

    export default {
        name: "AddMember",
        data() {
            return {
                yxzData:[],
                tableData: [],
                memberTable:[],
                selectedTid:0,
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
                formLabelWidth: '80px',

            }
        },
        components: {
            headTop,
        },
        mounted(){

            this.select();
        },
        methods: {
            select() {
                location.reload();
                this.$axios.post(this.commonVar.axiosServe + '/getTeamList', this.$qs.stringify({'uid':this.$store.state.UID}))
                    .then(res => {
                        if (res.data.code == '500') {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                        if (res.data.code == '200') {
                            this.tableData = res.data.list;
                            console.log(this.tableData)
                        }
                    })
            },
            addMemberList: function (index, row) {
                if (row!=undefined){
                    this.selectedTid=row.tId;
                }
                var mListAll=this.commonVar.axiosServe+'/findAllToPage';
                var mListByc=this.commonVar.axiosServe+'/findByConditions';
                this.condition.pageOffset = this.currentPage - 1;
                this.$axios.post((this.condition.name == '' ? mListAll : mListByc),this.$qs.stringify(this.condition))
                    .then(res => {
                        if (res.data.code == '200') {
                            this.memberTable = res.data.list;
                            this.totalNum = res.data.totalNum;
                            this.dialogFormVisible=true;
                        } else {
                            this.$alert(res.data.msg, "提示", {
                                confirmButtonText: '确定'
                            })
                        }

                    })
            },
            current_change(currentPage) {  //改变当前页
                this.currentPage = currentPage;
                this.addMemberList();
            },
            handleSelectionChange(val) {
                this.yxzData = val;
                console.log(this.yxzData);

            },
            add(){
                for (var i=0;i<this.yxzData.length;i++){
                    this.yxzData[i].tid=this.selectedTid;
                }
                console.log(this.yxzData);
                this.$axios.post(this.commonVar.axiosServe+'/addUserToTeam',this.$qs.stringify({"users":this.yxzData}))
                    .then(res => {
                        this.$alert(res.data.msg, "提示", {
                            confirmButtonText: '确定'
                        })

                    })
            },
            sexFromat(row) {
                if (row.sex == "0") {
                    return "男";
                } else if (row.sex == "1") {
                    return "女";
                }
            },
        }
    }
</script>

<style scoped>

</style>