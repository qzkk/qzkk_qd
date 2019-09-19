<template>
    <el-row class="header_container">
        <el-col :span="12" >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/xxx'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="8" >
        </el-col>
        <el-col :span="2" v-model="info">
            <span>{{info.type}}{{info.account}}</span>
        </el-col>
        <el-col :span="2" >

            <!--<el-dropdown menu-align='start' @command="handleCommand" >-->
            <el-dropdown menu-align='start' @command="handleCommand">
                <!--<el-dropdown @command="handleCommand" menu-align='start'>-->
                <img class="avator" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">

                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="home">首页</el-dropdown-item>
                    <el-dropdown-item command="limit">权限管理</el-dropdown-item>
                    <el-dropdown-item command="quit">退出</el-dropdown-item>
                    <!--<el-dropdown-item>首页</el-dropdown-item>-->
                    <!--<el-dropdown-item>退出</el-dropdown-item>-->
                </el-dropdown-menu>

            </el-dropdown>
        </el-col>

    </el-row>
</template>

<script>
    export default {
        name: "headTop",
        data() {
            return {
                info: {
                    account: '',
                    type: ''
                }
            }
        },

        created() {},

        mounted() {
            this.info.account = this.$store.state.ACCOUNT_NAME;

            if (this.$store.state.ACCOUNT_TYPE == '0') {
                this.info.type = "队员";
            } else if (this.$store.state.ACCOUNT_TYPE == '1') {
                this.info.type = "负责人";
            } else if (this.$store.state.ACCOUNT_TYPE == '2') {
                this.info.type = "管理员";
            } else if (this.$store.state.ACCOUNT_TYPE == '3'){
                this.info.type = "科考基地";
            } else if (this.$store.state.ACCOUNT_TYPE == '4'){
                this.info.type = "成果转化中心";
            }
        },

        methods: {
            handleCommand(command) {
                switch (command) {
                    case 'home':
                        var index='';
                        if (this.info.type=="管理员"){
                            index='/manage'
                        }else if (this.info.type=="负责人"){
                            index='/captain'
                        }else if(this.info.type=="队员"){
                            index='/member'
                        }else if (this.info.type=="科考基地"){
                            index='/manage'
                        }else if (this.info.type=="成果转化中心"){
                            index='/manage'
                        }else{
                            index='/'
                        }
                        this.$router.push(index);
                        break;
                    case 'limit':
                        this.$router.push('/limitsManage');
                        break;
                    case 'quit':
                        this.$store.commit('setEmpty');
                        this.$router.push('/');
                        break;
                }
            }
        },

        computed: {}
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .header_container{
        background-color: white;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
    }
    .avator{
    .wh(36px, 36px);
        border-radius: 50%;
        margin-right: 37px;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>