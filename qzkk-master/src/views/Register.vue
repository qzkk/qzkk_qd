<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin" style="top: 30%;">
                <div class="manage_tip">
                    <p>青藏科考管理系统PC端</p>
                </div>
                <el-form :model="registerForm" :rules="rules" ref="regForm"  label-width="100px" >
                    <el-form-item label="账号名" prop="account">
                        <el-input v-model="registerForm.account" placeholder="账号名">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="psd">
                        <el-input v-model="registerForm.psd" placeholder="密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="registerForm.name" placeholder="姓名">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="registerForm.sex" placeholder="性别" style="width: 100%">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCard">
                        <el-input v-model="registerForm.idCard" placeholder="身份证号">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="workPosition">
                        <el-input v-model="registerForm.workPosition" placeholder="职位">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="工作单位" prop="workUnit">
                        <el-input v-model="registerForm.workUnit" placeholder="工作单位">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="科考主题" prop="subjectName">
                        <el-input v-model="registerForm.subjectName" placeholder="科考主题">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="科考区域" prop="researchSite">
                        <el-input v-model="registerForm.researchSite" placeholder="科考区域">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="来青时间" prop="comeDate">
                        <el-input v-model="registerForm.comeDate" placeholder="来青时间">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="离青时间" prop="backDate">
                        <el-input v-model="registerForm.backDate" placeholder="离青时间">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="服务保障需求" prop="demand">
                        <el-input v-model="registerForm.demand" placeholder="服务保障需求">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="注册级别" prop="type">
                        <el-select v-model="registerForm.type" placeholder="身份" style="width: 100%">
                            <el-option label="系统管理员" value="2"></el-option>
                            <el-option label="科考队队长" value="1"></el-option>
                            <el-option label="科考队队员" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register" class="submit_btn" >注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                registerForm: {
                    name: '郑建朝',
                    psd: '456123',
                    account: 'zjz123456 ',
                    sex: '0',
                    idCard: '430221199713130017',
                    type: '1',
                    workUnit:'xxx大学',
                    workPosition:'',
                    subjectName:'',
                    researchSite:'',
                    demand:'',
                    backDate:''

                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    psd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    account: [
                        {required: true, message: '请输入账号名', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    major: [
                        {required: true, message: '请输入专业', trigger: 'blur'},
                    ],
                    idCard: [
                        {required: true, message: '请输入身份证号', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择身份', trigger: 'blur'},
                    ],


                },
                showLogin: false,
            }
        },
        mounted() {
            this.showLogin = true;
            //this.AMessage();
        },
        methods: {
            // AMessage:function() {
            //     alert(this.$store.state.ACCOUNT_NAME);
            // },
            register: function () {
                this.$axios.post(this.commonVar.axiosServe+'/perRegistration', this.$qs.stringify(
                    this.registerForm))
                    .then(res => {
                        if (res.data.name == '') {
                            this.$alert('姓名不能为空', '提示', {
                                confirmButtonText: '确定',
                            })
                        }
                        console.log(res)
                        if (res.data.code == '403') {
                            this.$alert('用户名已存在', '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                        if (res.data.code == '500') {
                            this.$alert('登记注册错误，请重试！', '提示', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.$router.push('/register')
                                }
                            })
                        }
                        if (res.data.code == '200') {
                            this.$alert('已提交申请，请等待', '提示', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.$router.push('/')
                                }
                            })
                        }
                    })
            }
        },
        computed: {

        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #fff;
        }
    }
    .form_contianer{
        .wh(320px, 500px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
</style>

