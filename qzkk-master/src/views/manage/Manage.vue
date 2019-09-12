<template>
    <div class="manage_page fillcontain">
        <el-row   style="height: 100%;">
            <el-col :span="4"  style="min-height: 100% ;background-color: #324057;">
                <el-menu :default-active="defaultActive"
                         style="min-height: 100%;"
                         background-color="#324057"
                         text-color="#bfcbd9"
                         active-text-color="#ffd04b"
                         router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>

                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i>任务管理</template>
                        <el-menu-item index="examineTaskByManage" v-if="this.$store.state.ACCOUNT_TYPE == 4||this.$store.state.ACCOUNT_TYPE == 2">审批任务</el-menu-item>
                        <el-menu-item index="viewTaskByManage">查看任务</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-setting"></i>小队管理</template>
                        <el-menu-item index="teamList">查看小队</el-menu-item>
<!--                        <el-menu-item index="teamVerify">小队审批</el-menu-item>-->
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>物资管理</template>
                        <el-menu-item index="goodList">查看物资</el-menu-item>
                        <el-menu-item index="returnCheck" v-if="this.$store.state.ACCOUNT_TYPE == 2||this.$store.state.ACCOUNT_TYPE == 3">归还审核</el-menu-item>
                        <el-menu-item index="addGoods" v-if="this.$store.state.ACCOUNT_TYPE == 2||this.$store.state.ACCOUNT_TYPE == 3">物资录入</el-menu-item>
                        <el-menu-item index="goodVerify" v-if="this.$store.state.ACCOUNT_TYPE == 2||this.$store.state.ACCOUNT_TYPE == 3">物资审批</el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-document"></i>人员管理</template>
                        <el-menu-item index="userList">查看人员</el-menu-item>
                        <el-menu-item index="userVerify">登记审核</el-menu-item>
                    </el-submenu>

                    <el-menu-item index="limitsManage" v-if="this.$store.state.ACCOUNT_TYPE == 2||this.$store.state.ACCOUNT_TYPE == 3"><i class="el-icon-setting"></i>权限管理</el-menu-item>

                </el-menu>
            </el-col>
            <el-col :span="20"  style="height: 100%;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Manage",
        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .manage_page{

    }
</style>