<template>
    <div>
        <head-top></head-top>
        <div align=center class="demo-input-size">
            <div class="container ">
                <span>查询条件</span>
                <el-input  v-model="condition.name" placeholder="请输入登记人员的姓名" autosize></el-input>
                <el-input v-model="condition.subject" placeholder="请输入登记人员的科考主题" autosize></el-input>
                <el-input v-model="condition.workUnit" placeholder="请输入登记人员的工作单位" autosize></el-input>
                <el-button type="primary" plain @click="select">查询</el-button>
            </div>

            <el-table
                    :data="tableData"
                    style="width: 90%"
                    height="538">
                <el-table-column
                        fixed
                        prop="name"
                        label="姓名"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="workPosition"
                        label="职位"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="workUnit"
                        label="工作单位"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="subject"
                        label="专题名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="researchSite"
                        label="科考地点"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="comeDate"
                        label="来青时间"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="backDate"
                        label="离青时间"
                        width="130">
                </el-table-column>
                <el-table-column
                        prop="demand"
                        label="服务保障需求"
                        width="300">
                </el-table-column>
            </el-table>
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
        </div>
    </div>

</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        data() {
            return {
                tableData: [],
                currentPage:1,
                totalNum:0,
                condition: {
                    name: '',
                    workUnit:'',
                    subjectName:'',
                    pageOffset:1,
                    pageSize:10
                }
            }
        },
        components: {
            headTop,
        },
        methods:{
            current_change(currentPage){  //改变当前页
                this.currentPage = currentPage;
                this.select();
            },
            select(){
                var findall=this.commonVar.axiosServe+'/findAllToPage';
                var findByConditions=this.commonVar.axiosServe+'/findByConditions';
                this.condition.pageOffset=this.currentPage-1;

                this.$axios.post((this.condition.workUnit==''&&this.condition.name==''&&this.condition.subjectName==''?findall:findByConditions), this.$qs.stringify(this.condition))
                    .then(res => {
                        console.log(this.condition.pageOffset);
                        if (res.data.code == '500') {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                        if (res.data.code == '200') {
                            for(var i=0;i<res.data.list.length;i++){
                                res.data.list[i].sex=(res.data.list[i].sex==0?'男':'女');
                            }
                            this.tableData = res.data.list;
                            this.totalNum=res.data.totalNum;
                        }
                    })
            }


        },


    }
</script>

