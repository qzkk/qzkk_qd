<template>
    <div class="captain_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive"
                         style="min-height: 100%;"
                         background-color="#324057"
                         text-color="#bfcbd9"
                         active-text-color="#ffd04b"
                         router>
                    <el-menu-item index="captain"><i class="el-icon-menu"></i>首页</el-menu-item>
<!--                    <el-submenu index="2">-->
<!--                        <template slot="title"><i class="el-icon-document"></i>人员管理</template>-->
<!--                        <el-menu-item index="MemberList">查看队员</el-menu-item>-->
<!--                        <el-menu-item index="MbeVerify">队员审核</el-menu-item>-->
<!--                    </el-submenu>-->
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
<!--                        <el-menu-item index="ViewGoods">查看物资</el-menu-item>-->
<!--                        <el-menu-item index="ReturnGoods">归还物资</el-menu-item>-->
                        <el-menu-item index="ManageGoods">管理物资</el-menu-item>
                        <el-menu-item index="AplyGoods">申请物资</el-menu-item>
                        <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>小队管理</template>
                        <el-menu-item index="CreatTeam">申请小队</el-menu-item>
                        <el-menu-item index="AddMember">添加成员</el-menu-item>
                        <el-menu-item index="memberlist">查看和删除队员</el-menu-item>
<!--                        <el-menu-item index="SendNotic">解散小队</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>科考任务管理</template>
                        <el-menu-item index="ViewTask">查看任务</el-menu-item>
                        <el-menu-item index="AplyTask">申请任务</el-menu-item>
                        <el-menu-item index="DistributeTask">分配任务</el-menu-item>
                    </el-submenu>
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
        name: "Captain",
        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>