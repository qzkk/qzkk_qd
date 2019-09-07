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
                    <el-menu-item index="Core"><i class="el-icon-menu"></i>首页</el-menu-item>

                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i>任务管理</template>
                        <el-menu-item index="viewTaskByCore">查看任务</el-menu-item>
                        <el-menu-item index="examineTaskByCore">审批任务</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-setting"></i>团队管理</template>
                        <el-menu-item index="teamListByCore">查看团队</el-menu-item>
                    </el-submenu>



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
        name: "Core",
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