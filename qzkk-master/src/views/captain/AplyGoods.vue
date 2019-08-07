<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-button
                    size="small"
                    type="primary"
                    @click="handleInitApplication">申请物资</el-button>
        </div>
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
                        property=""
                        label="申请人"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="name"
                        label="申请物资"
                        width="200">
                </el-table-column>
                <el-table-column
                        property="account"
                        label="申请时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        property="idcard"
                        label="描述"
                        width="500">
                </el-table-column>
                <el-table-column
                        property="type"
                        label="审核人"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="usetime"
                        label="审核状态"
                        width="120">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
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

        <el-dialog title="物资申请" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="applicationData">
                <el-form-item label="物资种类" :label-width="formLabelWidth">
                    <el-select v-model="applicationData.gId" placeholder="请选择物资种类" @change="getNum($event)">
                        <el-option v-for="goodItem in goodData"  :label="goodItem.name" :value="goodItem.gId" :key="goodItem.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物资数量" :label-width="formLabelWidth">
                    <el-input-number v-model="applicationData.number" @change="" :min="1" :max="maxNumber" label="描述文字"></el-input-number>
                    最多选择{{maxNumber}}{{specification}}
                </el-form-item>
                <el-form-item label="申请理由" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 8}"
                            placeholder="请输入内容"
                            v-model="applicationData.description">
                    </el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlePostApplication">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        data(){
            return {
                //表格数据
                tableData: [{}],
                //分页相关
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,

                //表单相关
                dialogFormVisible: false,
                formLabelWidth: '120px',

                goodData: [],
                maxNumber: 0,
                specification: '',
                //申请表单的数据
                applicationData: {
                    gId: '',
                    uId: '',
                    number: '',
                    description: '',
                }
            }
        },
        components: {
            headTop,
        },
        created(){},
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },

            handleEdit(index, row) {
                console.log(index, row);
                this.$confirm('通过该申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '审核成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },

            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('拒绝通过该申请, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已拒绝审核!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },

            //初始化表单相关数据
            handleInitApplication() {
                this.dialogFormVisible = true;
                this.goodData = [];
                this.$axios.get(this.commonVar.axiosServe+'/getGoodTypes')
                    .then(res => {
                        //console.log(res);
                        if(res.data.code == "200") {
                            for(var i = 0; i < res.data.data.length; i++) {
                                let tempData = {
                                    name : res.data.data[i].name,
                                    gId : res.data.data[i].gId,
                                    number : res.data.data[i].number - res.data.data[i].usingNumber - res.data.data[i].applyingNumber,
                                    specification : res.data.data[i].specification
                                }
                                this.goodData.push(tempData);
                            }
                        }
                    });
                this.applicationData.uId = this.$store.state.UID;
            },

            handlePostApplication() {
                console.log(this.applicationData);
                this.$axios.post(this.commonVar.axiosServe+'/addGoodApplication', this.$qs.stringify(this.applicationData))
                    .then(res => {
                        if(res.data.code == "200") {
                            this.$confirm('提交成功', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success',
                                center: true
                            })
                        } else if(res.data.code == "500") {
                            this.$confirm('提交失败，服务器错误', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'error',
                                center: true
                            })
                        } else if(res.data.code == "501") {
                            this.$confirm('提交失败，申请的数量过多', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'error',
                                center: true
                            })
                        }
                    });
                this.setEmpty();
                this.dialogFormVisible = false;
            },

            getNum(args) {
                for(var t in this.goodData) {
                    if(args === this.goodData[t].gId) {
                        this.maxNumber = this.goodData[t].number;
                        this.specification = this.goodData[t].specification;
                    }
                }
            },

            setEmpty() {
                this.applicationData.description = "";
                this.applicationData.gId = "";
                this.applicationData.number = "";
                this.applicationData.uId = ""
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