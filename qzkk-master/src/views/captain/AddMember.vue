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
                <el-row :gutter="20" >
                    <el-col :span="3" style="line-height: 40px; font-family: 'Microsoft Yahei', sans-serif; font-size: 16px">
                        <span>查询条件</span>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="condition.name" placeholder="请输入登记人员的姓名" autosize></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" plain @click="addMemberList">查询</el-button>
                    </el-col>
                </el-row>
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


                <div style="margin-top: 20px">
                    <el-row :gutter="20" >
                        <el-col :span="18">
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
                        </el-col>
                        <el-col :span="3">
                            <el-button
                                    type="primary"
                                    @click="add">添加
                            </el-button>
                        </el-col>

                        <el-col :span="2">
                            <el-button
                                    type="danger"
                                    @click="dialogFormVisible = false">取消
                            </el-button>
                        </el-col>
                    </el-row>
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
                this.$axios.post(this.commonVar.axiosServe + '/teamListOfAccessByUid', this.$qs.stringify({'uid':this.$store.state.UID}))
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
            addMemberList: function (index, row) {
                if (row!=undefined){
                    this.selectedTid=row.tid;
                }
                var mListAll=this.commonVar.axiosServe+'/findAllToPage1';
                var mListByc=this.commonVar.axiosServe+'/findByConditions1';
                this.condition.pageOffset = this.currentPage - 1;
                if (this.condition.name == ''){
                    this.$axios.post(mListAll,this.$qs.stringify({
                        "tid":this.selectedTid,
                        "pageOffset":this.currentPage - 1
                    }))
                        .then(res => {
                            console.log(res.data.list)
                            if (res.data.code == '200') {
                                this.memberTable = res.data.list;
                                //这个是uid，后台实体类是uId，因为不同，所以处理
                                for (var i=0;i<res.data.list.length;i++){
                                    this.memberTable[i].uId=res.data.list[i].uid;
                                }
                                console.log(this.memberTable);
                                this.totalNum = res.data.totalNum;
                                this.dialogFormVisible=true;
                            } else {
                                this.$alert(res.data.msg, "提示", {
                                    confirmButtonText: '确定'
                                })
                            }

                        })
                }else{
                    let reqData={
                        "tid":this.selectedTid,
                        "condition":this.condition
                    }
                    this.$axios.post(mListByc,this.$qs.stringify({
                        "tid":this.selectedTid,
                        "pageOffset":this.currentPage - 1,
                        "name":this.condition.name
                    }))
                        .then(res => {
                            console.log(res.data.list)
                            if (res.data.code == '200') {
                                this.memberTable = res.data.list;
                                //这个是uid，后台实体类是uId，因为不同，所以处理
                                for (var i=0;i<res.data.list.length;i++){
                                    this.memberTable[i].uId=res.data.list[i].uid;
                                }
                                console.log(this.memberTable);
                                this.totalNum = res.data.totalNum;
                                this.dialogFormVisible=true;
                            } else {
                                this.$alert(res.data.msg, "提示", {
                                    confirmButtonText: '确定'
                                })
                            }

                        })
                }

            },
            current_change(currentPage) {  //改变当前页
                this.currentPage = currentPage;
                this.addMemberList();
            },
            handleSelectionChange(val) {
                this.yxzData = val;

            },
            add(){
                for (var i=0;i<this.yxzData.length;i++){
                    this.yxzData[i].tId=this.selectedTid;
                }
                let reqData={
                        "userList":this.yxzData
                }
                this.$axios.post(this.commonVar.axiosServe+'/addUserToTeam', reqData)
                    .then(res => {
                        this.$alert(res.data.msg, "提示", {
                            confirmButtonText: '确定',
                            callback: () => {
                                location.reload();
                            }
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

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>