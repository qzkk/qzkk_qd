<template>
    <div>
        <head-top></head-top>
        <div align=center class="demo-input-size">
<!--            新物资录入-->
                <div class="container ">
                    <span>新物资录入</span>
                    <el-form :model="newgoods" :rules="rules" ref="regForm"  label-width="150px" >
                        <el-form-item label ='新类型物资编号'  prop="identifier" >
                             <el-input  v-model="newgoods.identifier" placeholder="新类型物资编号" autosize></el-input>
                        </el-form-item>
                        <el-form-item label ='新类型物资名称'  prop="name" >
                    <el-input  v-model="newgoods.name" placeholder="新类型物资名称" autosize></el-input>
                        </el-form-item>
                        <el-form-item label ='新增数量'  prop="number" >
                    <el-input v-model="newgoods.number" placeholder="新增数量" autosize></el-input>
                        </el-form-item>
                        <el-form-item label ='物资描述'  prop="description" >
                    <el-input v-model="newgoods.description" placeholder="物资描述" autosize></el-input>
                        </el-form-item>
                        <el-form-item label ='规格'  prop="specification" >
                    <el-input v-model="newgoods.specification" placeholder="规格" autosize></el-input>
                        </el-form-item>
                    <el-button type="primary" plain @click="addnewgoods">录入</el-button>
                    </el-form>
                </div>

<!--            新物资提交-->
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
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="20"
                            layout="total, prev, pager, next"
                            :total="count">
                    </el-pagination>
                </div>
            </div>

<!--            页面显示物资-->
            <el-dialog title="该物资增加数量" :visible.sync="dialogFormVisible" class="addgoodsnumber" width="30%" >
                <el-form :model="form" :disabled="false" :rules="rules" >
                        <template slot-scope="scope" >
                            <el-form-item label ='编号'>
                                <el-input v-model="form.identifier" :disabled="true" autocomplete="off" placeholder="增加数量"></el-input>
                            </el-form-item>
                            <el-form-item label ='数量' prop="addnumber">
                                <el-input  v-model="form.addnumber" :disabled="false" autocomplete="on"></el-input>
                            </el-form-item>
                            <el-button type="primary" @click="addgoodsnumber" class="submit_btn">提交申请</el-button>
                        </template>
                </el-form>
            </el-dialog>
<!--            对话框-->
            <div class="block" align="center">
                <el-pagination
                        :page-size="10"
                        :pager-count="6"
                        layout="prev, pager, next"
                        @current-change="current_change"
                        :current-page.sync="currentPage"
                        :total="totalNum">
                </el-pagination>
            </div>
<!--            分页-->
        </div>
    </div>

</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "AddGoods",
        props: ['msg'],
        data(){
            return {
                tableData: [{
                    gId: '1',
                    name: '卡车',
                    identifier: 'KC',
                    number: '200',
                    usingNumber: '80',
                    applyingNumber: '20',
                    images: '',
                    description: '运输车辆',
                    specification: '',
                }],
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
                    specification:[{required: true,message:'规格不能为空', trigger:'blur'}],
                    name:[{required: true,message:'新类型物资名称', trigger:'blur'}],
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
            //页面初始化显示已有的物资
            getgoods:function(){
                console.log('res')
                this.$axios.get(this.commonVar.axiosServe+'/getGoodList')
                    .then(res =>{
                        this.tableData = res.data.goods;
                        this.count = res.data.length;
                        // console.log(this.res)
                    })
            },
            //分页显示
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            //进行对话框选择
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.form = this.tableData[index];
            },
            addnewgoods(){
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
                            })
                        }
                    })
            },
            //增加物资的方法
            addgoodsnumber() {
                this.dialogFormVisible = true;
                console.log(this.form);
                this.$axios.post(this.commonVar.axiosServe+'/addGoodsNumber', this.$qs.stringify(this.form))
                    .then(res => {
                        this.$alert("物资录入成功", "提示", {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.$router.go(0)
                                // 刷新页面
                            }
                        })
                    })
            },
        },
    }
</script>

