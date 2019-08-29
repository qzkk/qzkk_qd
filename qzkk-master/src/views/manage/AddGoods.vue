<template>
    <div>
        <head-top></head-top>
        <div class="table_container">
            <el-button
                    size="small"
                    type="primary"
                    @click="handleInitApplication">录入物资</el-button>
        </div>
        <div align=center class="demo-input-size">
            <!--新物资提交-->
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
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">增加</el-button>
                        </template>

                    </el-table-column>
                </el-table>
                <div class="Pagination" style="text-align: left;margin-top: 10px;">
                    <el-pagination
                            :page-size= "10"
                            layout="prev, pager, next"
                            @current-change="current_change"
                            :current-page.sync="currentPage"
                            :total="totalNum">
                    </el-pagination>
                </div>
            </div>

            <!--页面显示物资-->
            <el-dialog title="该物资增加数量" :visible.sync="dialogAddNumberFormVisible" class="addgoodsnumber" width="20%" >
                <el-form :model="form" :disabled="false" :rules="rules" >
                        <template slot-scope="scope" >
                            <el-form-item label ='编号'>
                                <el-input v-model="form.identifier" :disabled="true" autocomplete="off" placeholder="增加数量"></el-input>
                            </el-form-item>
                            <el-form-item label ='数量'  prop="addnumber">
                                <el-input-number v-model="form.addnumber" @change="" :min="0" :max="maxNumber"></el-input-number>
                            </el-form-item>
                            <el-button type="primary" @click="addGoodsNumber" class="submit_btn">提交</el-button>
                        </template>
                </el-form>
            </el-dialog>
<!--            对话框-->

        </div>

        <el-dialog title="物资申请" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="newgoods" :rules="rules" ref="regForm"  label-width="150px">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label ='新类型物资编号'  prop="identifier" >
                            <el-input  v-model="newgoods.identifier" placeholder="新类型物资编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label ='新类型物资名称'  prop="name" >
                            <el-input  v-model="newgoods.name" placeholder="新类型物资名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label ='新增数量'  prop="number">
                            <el-input-number v-model="newgoods.number" @change="" :min="0" :max="maxNumber" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label ='物资描述'  prop="description" >
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 6, maxRows: 8}"
                                    placeholder=""
                                    v-model="newgoods.description">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" plain @click="addNewGoods">录入</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "AddGoods",
        props: ['msg'],
        data(){
            return {
                tableData: [],
                currentPage: 1,
                totalNum: 1,
                pageSize:10,
                newgoods: {
                    identifier: '',
                    number:'',
                    name:'',
                    description:'',
                },
                form: {
                    addnumber:"10",
                },
                rules:{
                    addnumber: [{required: true,message:'增加数量不能为空', trigger:'blur'}],
                    identifier:[{required: true,message:'新类型物资编号不能为空', trigger:'blur'}],
                    number:[{required: true,message:'新增数量不能为空', trigger:'blur'}],
                    description:[{required: true,message:'物资描述不能为空', trigger:'blur'}],
                    //specification:[{required: true,message:'规格不能为空', trigger:'blur'}],
                    name:[{required: true,message:'新类型物资名称', trigger:'blur'}],
                },

                maxNumber: 200,

                dialogFormVisible: false,
                dialogAddNumberFormVisible: false,
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

            handleInitApplication() {
                this.dialogFormVisible = true;
            },

            //页面初始化显示已有的物资
            getgoods:function(){

                this.$axios.get(this.commonVar.axiosServe+'/getGoodList')
                // this.$axios.post(this.commonVar.axiosServe+'/getGoodList')
                    .then(res => {
                        console.log(res);
                        this.tableData = res.data.goods;
                        // this.count = res.data.length;
                        this.totalNum = res.data.length;
                    })
            },

            //分页显示
            handleSizeChange(val) {
                console.log("bbbb"+val);
                this.PageSize=val;
                this.currentPage=1;
                // console.log(`每页 ${val} 条`);
            },

            //进行对话框选择
            handleEdit(index, row) {
                this.dialogAddNumberFormVisible = true;
                this.form = this.tableData[index];
            },

            addNewGoods(){
                this.$axios.post(this.commonVar.axiosServe+'/addGood', this.$qs.stringify(
                    this.newgoods))
                    .then(res => {
                        if (res.data.code == "404"){
                            this.$alert('该物资已经录入', '提示', {
                                confirmButtonText: '确定',
                            })
                    }
                        if (res.data.code == "200"){
                            this.$alert('录入成功', '提示', {
                                confirmButtonText: '确定',
                                callback:()=>{
                                    location.reload();
                                }
                            })
                        }
                    })
            },
            //分页
            current_change(currentPage) {  //改变当前页
                this.currentPage = currentPage;
                this.getgoods();
            },

            //增加物资的方法
            addGoodsNumber() {
                this.dialogAddNumberFormVisible = true;
                console.log(this.form);
                this.$axios.post(this.commonVar.axiosServe+'/addGoodsNumber', this.$qs.stringify(this.form))
                    .then(res => {
                        this.$alert("物资录入成功", "提示", {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.dialogAddNumberFormVisible = false;
                                this.tableData = [];
                                this.getgoods();
                            }
                        })

                    });
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

