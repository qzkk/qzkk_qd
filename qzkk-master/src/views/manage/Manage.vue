<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive"
                         style="min-height: 100%;"
                         background-color="#324057"
                         text-color="#bfcbd9"
                         active-text-color="#ffd04b"
                         router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>人员管理</template>
                        <el-menu-item index="userList">查看人员</el-menu-item>
                        <el-menu-item index="userVerify">登记审核</el-menu-item>
                    </el-submenu>
                    <!--<el-submenu index="2">-->
                        <!--<template slot="title"><i class="el-icon-document"></i>数据管理</template>-->
                        <!--<el-menu-item index="userList">用户列表</el-menu-item>-->
                        <!--<el-menu-item index="shopList">商家列表</el-menu-item>-->
                        <!--<el-menu-item index="foodList">食品列表</el-menu-item>-->
                        <!--<el-menu-item index="orderList">订单列表</el-menu-item>-->
                        <!--<el-menu-item index="adminList">管理员列表</el-menu-item>-->
                    <!--</el-submenu>-->
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>物资管理</template>
                        <el-menu-item index="goodList">查看物资</el-menu-item>
                        <el-menu-item index="addGoods">物资录入</el-menu-item>
                        <el-menu-item index="goodVerify">物资审批</el-menu-item>
                        <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>小队管理</template>
                        <el-menu-item index="teamList">查看小队</el-menu-item>
                        <el-menu-item index="teamVerify">小队审批</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>任务管理</template>
                        <el-menu-item index="examineTaskByManage">审批任务</el-menu-item>
                        <el-menu-item index="viewTaskByManage">查看任务</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="limitsManage"><i class="el-icon-setting"></i>权限管理</el-menu-item>
<!--                    <el-submenu index="4">-->
<!--                        <template slot="title"><i class="el-icon-plus"></i>信息吧班干部v 服务</template>-->
<!--                        <el-menu-item index="noticeDeliver">发布通知</el-menu-item>-->
<!--                        <el-menu-item index="noticeVerify">删除通知</el-menu-item>-->
<!--                    </el-submenu>-->
<!--                    <el-submenu index="6">-->
<!--                        <template slot="title"><i class="el-icon-star-on"></i>数据分析</template>-->
<!--                        <el-menu-item index="visitor">图表分析</el-menu-item>-->
<!--                        &lt;!&ndash; <el-menu-item index="newMember">用户数据</el-menu-item> &ndash;&gt;-->
<!--                    </el-submenu>-->
                    <!--<el-submenu index="7">-->
                        <!--<template slot="title"><i class="el-icon-warning"></i>说明</template>-->
                        <!--<el-menu-item index="explain">说明</el-menu-item>-->
                    <!--</el-submenu>-->
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
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