<template>
    <div class="newsInfo-box">
        <h4>{{newsInfo.title}}</h4>
        <div class="describe">
            <span>发表时间:{{newsInfo.add_time | dataFormat}}</span>
            <span>点击:{{newsInfo.click}}次</span>
        </div>
        <hr>
        <div v-html='newsInfo.content' class="content"></div>
        <!-- 引入子组件 -->
        <comments :id="this.id"></comments>
    </div> 
</template>

<script>
    import {Toast} from 'mint-ui'
    import comments from '../subcomponents/comments.vue'
    export default{
        data(){
            return{
                newsInfo:{},
                id:this.$route.params.id
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){
                this.$http.get('api/getnew/'+this.id).then(response=>{
                    //console.log(this.$route)
                    if(response.body.status ===0){
                        this.newsInfo= response.body.message[0]
                    }else{
                        Toast('获取新闻详情失败')
                    }
                })
            }
        },
        components:{
            comments
        }
    }
</script>

<style lang="less" scoped>
    .newsInfo-box{
        padding:0 4px;
        h3{
            text-align: center;
            color:red
        }
        .describe{
            font-size: 13px;
            color:blue;
            display: flex;
            justify-content: space-between;
        }
        .content{
           /deep/ img{
                width: 100%;
            }
        }
    }
</style>

