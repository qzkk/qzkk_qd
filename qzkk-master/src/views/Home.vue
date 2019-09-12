<template>
    <div>
        <head-top></head-top>
        <section class="data_section" v-if="this.$store.state.ACCOUNT_TYPE >= '2'">
            <header class="section_title">功能列表</header>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">人员管理</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span>查看人员</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 登记审核</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">物资管理</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 查看物资</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 物资录入</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 物资审批</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">任务管理</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 审批任务</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 查看任务</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">权限管理</span></div></el-col>
            </el-row>
        </section>

        <section class="data_section" v-if="this.$store.state.ACCOUNT_TYPE == '1'">
            <header class="section_title">功能列表</header>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">物资管理</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span>管理物资</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 申请物资</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">小队管理</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 申请小队</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 添加成员</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 查看和删除队员</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">科考任务管理</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 查看任务</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 申请和分配任务</div></el-col>
            </el-row>
        </section>

        <section class="data_section" v-if="this.$store.state.ACCOUNT_TYPE == '0'">
            <header class="section_title">功能列表</header>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">信息管理</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span>查看所属队伍</div></el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        name: "Home",
        data(){
            return {
                userCount: null,
                orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
                sevenDay: [],
                sevenDate: [[],[],[]],
            }
        },
        components: {
            headTop,
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .data_section{
        padding: 20px;
        margin-bottom: 40px;
    .section_title{
        text-align: center;
        font-size: 30px;
        margin-bottom: 10px;
    }
    .data_list{
        text-align: center;
        font-size: 14px;
        color: #666;
        border-radius: 6px;
        background: #E5E9F2;
    .data_num{
        color: #333;
        font-size: 26px;

    }
    .head{
        border-radius: 6px;
        font-size: 22px;
        padding: 4px 0;
        color: #fff;
        display: inline-block;
    }
    }
    .today_head{
        background: #FF9800;
    }
    .all_head{
        background: #20A0FF;
    }
    }
    .wan{
    .sc(16px, #333)
    }
</style>