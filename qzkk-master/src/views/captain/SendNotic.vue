<template>
    <div>
        <head-top></head-top>
        <el-row>
            <el-col :span="24">
                <div class="title_div">
                    <h3 class="title">标题</h3>
                    <el-row>
                        <el-col :span="6">
                            <el-input v-model="noticeData.title"></el-input>
                        </el-col>
                    </el-row>
                    <h3 class="title">类型</h3>
                    <el-select v-model="noticeData.type" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="edit_container">
                    <h3 class="title">正文</h3>
                    <div class="tinymce">
                        <Editor id="tinymce" v-model="tinymceHtml" :init="init"></Editor>
                    </div>
                </div>
                <div class="submit_btn">
                    <el-button type="primary" >提交</el-button>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'

    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/silver'
    import '../../static/tinymce/langs/zh_CN.js'
    export default {
        name: "SendNotic",
        components: {
            headTop,
            Editor,
        },
        data(){
            return {
                noticeData: {
                    title: '',
                    type: '',
                    content: '',
                },
                options: [
                    {
                        value: '0',
                        label: '紧急通知'
                    }, {
                        value: '1',
                        label: '外出科考通知'
                    }, {
                        value: '2',
                        label: '科考结束通知'
                    },
                ],
                tinymceHtml: '',
                init:{
                    language_url:'/static/tinymce/langs/zh_CN.js',  //导入语言文件
                    language: "zh_CN",//语言设置
                    skin_url: '/static/tinymce/skins/ui/oxide',
                    height:500, //高度
                },
            }
        },
        mounted () {
            tinymce.init({})
        },
        computed: {

        },
        created(){
            //在页面加载时读取localStorage里的状态信息
            localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));

            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload",()=>{
                localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
            })
        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import '../../style/mixin';
    @import '../../static/tinymce/skins/ui/oxide/skin.css';
    @import '../../static/tinymce/skins/ui/oxide/content.min.css';
    .edit_container{
        padding: 0px 40px 40px;
        margin-bottom: 40px;
    }
    .editor{
        height: 350px;
    }
    .submit_btn{
        text-align: center;
    }
    .title_div {
        padding: 40px 40px 0;
    }
    h3{
        margin: 10px 0 10px;
    }
</style>