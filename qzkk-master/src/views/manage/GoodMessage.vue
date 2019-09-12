<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                    :data="tableData"

                    style="width: 100%">
                <el-table-column
                        type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                        property="name"
                        label="名称"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="identifier"
                        label="编号"
                        width="220">
                </el-table-column>
                <el-table-column
                        property="number"
                        label="总数量">
                </el-table-column>
                <el-table-column
                        property="usingNumber"
                        label="使用中数量">
                </el-table-column>
                <el-table-column
                        property="applyingNumber"
                        label="申请中数量">
                </el-table-column>
                <el-table-column
                        property="leftNumber"
                        label="剩余数量">
                </el-table-column>
                <el-table-column
                        property="description"
                        label="描述"
                        width="220">
                </el-table-column>
                <el-table-column
                        fixed="right"    
                        label="操作">
                    <template slot-scope="scope">

                        <el-button
                                size="mini"
                                type="danger"

                                @click="message(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <el-dialog title="使用详情" :visible.sync="dialogTableVisible">
                <el-table :data="gridData">
                    <el-table-column property="gname" label="物资名称" ></el-table-column>
                    <el-table-column property="tname" label="申请团队"></el-table-column>
                    <el-table-column property="state" label="状态"></el-table-column>
                    <el-table-column property="number" label="使用/申请数量"></el-table-column>
                    <el-table-column property="description" label="需求描述"></el-table-column>
                    <el-table-column property="application_time" label="申请时间"></el-table-column>
                    <el-table-column property="end_time" label="预计返还时间"></el-table-column>
                </el-table>
            </el-dialog>



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
        name: "GoodList",

        data(){
            return {
                tableData: [{
                    gId: '',
                    name: '',
                    identifier: '',
                    number: '',
                    usingNumber: '',
                    applyingNumber: '',
                    images: '',
                    description: '',
                    specification: '',
                    leftNumber: 0

                }],
                gridData: [{
                    gName: '长安奔奔',
                    tName: '长江一号队',
                    state:'使用中',
                    description: '拉人',
                    number: '300',
                    applicationTime:'2019-9-11',
                    endTime:'2019-12-12'


                }],

                dialogTableVisible: false,

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
            this.getgoods();
        },

        methods: {
            getgoods:function(){
                this.$axios.get(this.commonVar.axiosServe+'/getGoodList')
                    .then(res =>{
                        this.tableData = res.data.goods;
                        this.count = res.data.length;
                        for (var i=0;i<this.count;i++){
                            this.tableData[i].leftNumber=this.tableData[i].number-this.tableData[i].usingNumber
                        }
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

           message(index, row) {
                this.dialogTableVisible = true;
               var formData = {
                   identifier: row.identifier
               }
               this.$axios.post(this.commonVar.axiosServe+'/goodMessage',this.$qs.stringify(formData))
                   .then(res =>{
                       this.gridData = res.data.list;
                   })
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