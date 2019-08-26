<template>
    <div class="fillcontain">
        <head-top></head-top>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    align='center'
                    type="index"
                    width="100">
            </el-table-column>
            <el-table-column
                    align='center'
                    prop="tid"
                    label="小队编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    align='center'
                    prop="tname"
                    label="小队名称"
                    width="300">
            </el-table-column>
            <el-table-column
                    align='center'
                    prop="taName"
                    label="小队任务"
                    width="700">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align='center'
                    width="250"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="examineTeam(scope.$index,scope.row)">通过
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="refuseTeam(scope.$index, scope.row)">不通过
                    </el-button>
                </template>
            </el-table-column>



        </el-table>


    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default{
        data(){
            return{
                dialogVisible: false,
                tableData: [],
            }

        },

        components: {
            headTop,
        },
        created(){
            this.teamApplicationList()
        },

        methods: {
            // 小队信息
            teamApplicationList:function(){

                let postData = {
                    state: 0
                };
                console.log(postData);
                this.$axios.post(this.commonVar.axiosServe+'/getTeamLists',this.$qs.stringify(postData))
                    .then(res =>{
                        this.tableData = res.data.data;
                    })

            },

            // 通过审核
            examineTeam(index,row) {

                let postData = {
                    tId: row.tid,
                    state:1,
                };


                this.$axios.post(this.commonVar.axiosServe + '/exTeamApplication', this.$qs.stringify(postData))
                    .then(res => {
                        this.$alert("小队审核通过", "提示", {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.teamApplicationList();
                            }
                        })
                    })
            },


            // 不通过审核
            refuseTeam(index,row) {

                let postData = {
                    tId: row.tid,
                    state:-1,
                };


                this.$axios.post(this.commonVar.axiosServe + '/exTeamApplication', this.$qs.stringify(postData))
                    .then(res => {
                        this.$alert("小队审核不通过", "提示", {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.teamApplicationList();
                            }
                        })
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