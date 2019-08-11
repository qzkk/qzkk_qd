<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row :gutter="20">
            <el-col :span="14" :offset="5">
                <div class="grid-content bg-purple">

                    <div style="margin: 20px;"></div>
                    <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="小队名称">
                            <el-input v-model="formData.TeamName"></el-input>
                        </el-form-item>
                        <el-form-item label="科考任务">
                            <el-input v-model="formData.Task"></el-input>
                        </el-form-item>
                        <el-form-item label="科考内容">
                            <el-input v-model="formData.Content"></el-input>
                        </el-form-item>
                        <el-form-item label="科考地点">
                            <el-input v-model="formData.Site"></el-input>
                        </el-form-item>
                        <el-form-item label="科考队员">
                            <div v-for="m in formData.members">
                                {{m}}
                            </div>
                        </el-form-item>
                        <el-form-item label="科考物资">
                            <div v-for="g in formData.goods">
                                {{g.number}}{{g.specification}}{{g.name}}

                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "ViewTeamInfo",
        components: {
            headTop,
        },
        data() {
            return {
                labelPosition: 'right',
                formData: {
                    TeamName: '',
                    Task: '',
                    Content: '',
                    Site: '',
                    members: [],
                    goods: [],
                }
            }
        },
        methods: {
            getTeamInfo: function() {
                var postData = {
                    uid : this.$store.state.UID
                }
                this.$axios.post(this.commonVar.axiosServe+'/getTeamInfo', this.$qs.stringify(postData))
                    .then(res => {
                        console.log(res);
                        console.log(res.data.TeamName);
                        this.formData = res.data;


                    })
            }
        },
        mounted() {
            this.getTeamInfo();
        },
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
</style>