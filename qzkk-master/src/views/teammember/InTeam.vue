><template>
    <div class="fillcontain">
        <head-top></head-top>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="tId"
                    label="小队编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="tName"
                    label="小队名称"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="tTask"
                    label="小队任务"
                    width="500">
            </el-table-column>
            <el-table-column
                    label="操作"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="teamUserList(scope.$index)">查看小队所属人员
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="teamGoodList(scope.$index, scope.row)">查看小队物资
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>


<script>
    import headTop from '../../components/headTop'
    export default{

        created(){
            this.teamList()
        },

        methods: {
            // 小队信息 需要插入对话框
            teamList:function(){
                this.$axios.get(this.commonVar.axiosServe+'/getTeamList')
                    .then(res =>{
                        this.tableData = res.data.goods;

                    })
            },

            // 小队人员信息
            teamUserList(index,row) {
                this.$axios.post(this.commonVar.axiosServe + '/teamUserList', this.$qs.stringify(row.gId))
                    .then(res => {
                        this.tableData = res.data.goods;
                    })
            },

            // 小队物资信息
            teamGoodList(index,row){
                this.$axios.post(this.commonVar.axiosServe + '/teamGoodList', this.$qs.stringify(row.gId))
                    .then(res => {
                        this.tableData = res.data.goods;
                    })
            }
        },

        components: {
            headTop,
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