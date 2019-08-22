<template>
    <div class="abc">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="aplyTask" :rules="rules" ref="creatTeam" label-width="10%">
                <el-form-item label ="任务名称" prop="subjectName">
                    <el-input  v-model="aplyTask.subjectName" placeholder="请输入任务名称">
                    </el-input>
                </el-form-item>
                <el-form-item label ="科考区域" prop="researchSite">
                    <el-input  v-model="aplyTask.researchSite" placeholder="请输入科考区域">
                    </el-input>
                </el-form-item>
                <el-form-item label ="任务内容" prop="subjectTask">
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入任务内容"
                            v-model="aplyTask.subjectTask">
                    </el-input>
                </el-form-item>

                <el-form-item label ="服务保障需求" prop="demand">
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入服务保障需求"
                            v-model="aplyTask.demand">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="aply" class="submit_btn">申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "AplyTask",
        data() {
            return {
                aplyTask: {
                    subjectName: '',
                    researchSite:'',
                    subjectTask:'',
                    demand:'',
                    uid:this.$store.state.UID
                },
                rules: {
                    subjectName: [
                        {required: true, message: '请填写任务名称', trigger: 'blur'},
                    ],
                    researchSite: [
                        {required: true, message: '请填写科考区域', trigger: 'blur'},
                    ],
                    subjectTask: [
                        {required: true, message: '请填写任务内容', trigger: 'blur'},
                    ],
                    demand: [
                        {required: true, message: '请填写服务保障需求', trigger: 'blur'},
                    ],
                },
            }
        },
        components: {
            headTop,
        },

        methods: {
            aply: function() {
                this.$axios.post(this.commonVar.axiosServe+'/aplyTask', this.$qs.stringify(this.aplyTask))
                    .then(res => {
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: () => {
                                location.reload();
                            }
                        })

                    })
            },
        }
    }
</script>

<style scoped>

</style>