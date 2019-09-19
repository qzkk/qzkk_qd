<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">

            <el-row>

                <el-col style ="padding: 30px;background-color: white">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="100">
                </el-table-column>

                <el-table-column
                        property="gid"
                        label="物资编号">
                </el-table-column>

                <el-table-column
                        property="gname"
                        label="物资名称">
                </el-table-column>
                <el-table-column
                        property="tname"
                        label="申请小队">
                </el-table-column>
                <el-table-column
                        property="number"
                        label="申请数量">
                </el-table-column>
                <el-table-column
                        property="taName"
                        label="任务名称">
                </el-table-column>
                <el-table-column
                        property="applicationTime"
                        label="申请时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        property="description"
                        label="申请理由"
                        width="120">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleEdit(scope.$index, scope.row)">通过</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">不通过</el-button>
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
                </el-col>

            </el-row>

        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default{
        name:"GoodVerify",
        data() {
            return {
                tableData: [{
                    gId:'',
                    gName:'',
                    tName:'',
                    number:'',
                    taName:'',
                }],
            }
        },

        components: {
            headTop,
        },

        created(){
            this.select();
        },

        methods:{
            select(){
                this.$axios.get(this.commonVar.axiosServe +  '/getGoodApplicationList')
                    .then(res =>{
                        console.log("AAAA"+res.data);
                        this.tableData =res.data.data;
                        }
                    )
            },

            handleEdit(index, row){
               var formData = {
                    gaId: row.gaId
                }
                this.$axios.post(this.commonVar.axiosServe + '/examineGoodApplication',this.$qs.stringify(formData))
                    .then(res =>{
                        if(res.data.code == '200'){
                            this.$alert(res.data.msg,'物资审批通过', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.tableData = [];
                                    this.select();
                                }
                            })
                        }
                    })
            },

            handleDelete(index,row){
                var formData = {
                    gaId: row.gaId
                }
                this.$axios.post(this.commonVar.axiosServe + '/refuseGoodApplication',this.$qs.stringify(formData))
                    .then(res =>{
                        if(res.data.code == '201'){
                            this.$alert(res.data.msg,'物资审批不通过', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.tableData = [];
                                    this.select();
                                }
                            })
                        }
                    })
            },

        }

    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .table_container{
        padding: 30px;
        /*border: red;*/
        background-color: #EFF3F4;

    }
</style>