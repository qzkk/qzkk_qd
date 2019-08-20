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
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
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
<!--        <el-dialog title="物资信息" :visible.sync="dialogFormVisible" width="30%">-->
<!--            <el-form :model="form" :disabled="true" >-->
<!--                <el-form-item label='gId' :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.gId" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="名称" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.name" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="编号" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.identifier" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="总数量" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.number" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="使用中的数量" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.usingNumber" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="申请中的数量" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.applyingNumber" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="物资图片" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.images" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="描述" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.description" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="规格" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.specification" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--        </el-dialog>-->
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
                    leftNumber:0

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
            this.getgoods();
        },
        methods: {
            getgoods:function(){
                console.log('res')

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