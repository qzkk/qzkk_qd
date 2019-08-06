<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>青藏科考管理系统PC端</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="lofinForm">
                    <el-form-item prop="account">
                        <el-input v-model="loginForm.account" placeholder="用户名">
                            <span>啦啦啦</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="psd">
                        <el-input v-model="loginForm.psd" placeholder="密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" class="submit_btn">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register" class="submit_btn">注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>
<script>

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    account: 'sanyi2',
                    psd: '123456',
                },
                rules: {
                    account: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    psd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                },
                showLogin: false,
                user:{},
            }
        },
        mounted() {
            this.showLogin = true;
        },
        created(){
            // //在页面加载时读取localStorage里的状态信息
            // localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
            //
            // //在页面刷新时将vuex里的信息保存到localStorage里
            // window.addEventListener("beforeunload",()=>{
            //     localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
            // })
        },
        methods: {
            //登录
            login: function() {
                // console.log(this.commonVar.axiosServe);
                this.$axios.post(this.commonVar.axiosServe+'/login', this.$qs.stringify(this.loginForm))
                    .then(res => {
                        this.$store.commit('setState', res)
                        // console.log("login "+this.$store.getters.getName);


                        if (this.$store.state.ACCOUNT_TYPE == 0 && res.data.code == 200) {
                            this.$router.push('/member');
                        }
                        if (this.$store.state.ACCOUNT_TYPE == 1 && res.data.code == 200) {
                            this.$router.push('/captain');
                        }
                        if (this.$store.state.ACCOUNT_TYPE == 2 && res.data.code == 200) {
                            this.$router.push('/manage');
                        }
                        if (res.data.code == "401") {
                            this.$alert('密码错误', '提示', {
                                confirmButtonText: '确定',
                            })
                        }
                        if (res.data.code == "400") {
                            this.$alert('找不到用户名', '提示', {
                                confirmButtonText: '确定',
                            })

                        }
                        if (res.data.code == "402") {
                            this.$alert('没有被验证', '提示', {
                                confirmButtonText: '确定',
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
        .wh(320px, 225px);
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

