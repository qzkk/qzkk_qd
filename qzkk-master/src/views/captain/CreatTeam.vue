<template>
    <div class="abc">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="creatTeam" :rules="rules" ref="creatTeam" label-width="10%">
            <el-form-item label ="团队名称" prop="name">
                <el-input  v-model="creatTeam.name" placeholder="团队名称">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login" class="submit_btn">创建</el-button>
            </el-form-item>
                </el-form>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    export default {
        name: "CreatTeam",
        data() {
            return {
                creatTeam: {
                     name: '一队',
                     uId:this.$store.state.UID
                },
                rules: {
                    name: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                },
                showLogin: true,
                user:{},
            }
        },
        components: {
            headTop,
        },

        methods: {
            //登录
            login: function() {
                console.log(this.creatTeam);
                this.$axios.post(this.commonVar.axiosServe+'/creatTeam', this.$qs.stringify(this.creatTeam))
                    .then(res => {
                        // funtion res = {};
                        // console.log("login "+this.$store.getters.getName);

                        if (res.data.code == "401") {
                            this.$alert('重复提交或队伍名已经占用', '提示', {
                                confirmButtonText: '确定',
                            })
                        }
                        if (res.data.code == "200") {
                            this.$alert('申请团队成功', '提示', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    location.reload();
                                }
                            })
                        }
                    })
            },
            //注册
            register: function() {
                this.$router.push('/register');
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