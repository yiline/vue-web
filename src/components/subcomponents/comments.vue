<template>
   <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model='content'></textarea>

    <mt-button type="primary" size="large" @click='postMoments'>发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentInfo" :key="index">
        <div class="cmt-title">
          第{{index+1}}楼{{index+1}}用户:{{item.user_name}}发表时间:{{item.add_time | dataFormat}}
        </div>
        <div class="cmt-body">
            {{item.content =="undefined" ?'此用户未评论':item.content }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click='getMore'>加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
    export default{
        data(){
          return{
              pageindex:1,
              commentInfo:[],
              content:'',
          }
        },
        created(){
            this.getcomment()
        },
        methods:{
            getcomment(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(response=>{
                    if(response.body.status ===0){
                        //console.log( response.body)
                        this.commentInfo =this.commentInfo.concat(response.body.message)
                    }else{
                        Toast('获取评论列表失败')
                    }
                })
            },
            getMore(){
                this.pageindex++
                this.getcomment()
            },
            postMoments(){
                if(this.content.trim().length ==0){
                    return Toast("评论内容不能为空")
                }
                this.$http.post('api/postcomment/'+this.id,{content:this.content}).then(response=>{
                    if(response.body.status ==0){
                        var com = {
                            add_time:Date.now(),
                            content:this.content,
                            user_name:'匿名用户'
                        }
                         this.commentInfo.unshift(com);
                         this.content=''
                    }else{
                        Toast("评论提交失败")
                    }
                })
            }
        },
        props:['id']
    }
</script>
<style lang='less' scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>


