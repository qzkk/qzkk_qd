<template>
    <div class="member_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4"  style="min-height: 100%;width:200px;background-color: #324057;">
                <el-menu :default-active="defaultActive"
                         style="min-height: 100%;"
                         background-color="#324057"
                         text-color="#bfcbd9"
                         active-text-color="#ffd04b"
                         router>
                    <el-menu-item index="Member"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>任务管理</template>
                        <el-menu-item index="viewTaskByMember">查看任务</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>团队管理</template>
                        <el-menu-item index="teamListByMember">查看团队</el-menu-item>
                        <el-menu-item index="teamListByMember">我的团队</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-document"></i>物资管理</template>
                        <el-menu-item index="inTeam">查看物资</el-menu-item>
                        <el-menu-item index="inTeam">申请物资</el-menu-item>
                    </el-submenu>


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
        name: "Member",
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