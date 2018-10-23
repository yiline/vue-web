<template>
   <div class="photoInfo-Box">
      <div class="title">
          <h4>{{infoList.title}}</h4>
          <div class="subTitle">
              <span>发表时间：{{infoList.add_time}}</span>
              <span>点击：{{infoList.click}}次</span>
          </div>
          <hr>
          <div class="content" v-html="infoList.content">
          </div>
      </div>
      <comment-photo :id='id'></comment-photo>
   </div>
</template>

<script>
import commentPhoto from '../subcomponents/comments.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            infoList:{}
        }
    },
    created(){
        this.getInfo()
    },
    methods:{
        getInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(response=>{
                if(response.body.status ===0){
                    this.infoList = response.body.message[0]
                }
            })
        }
    },
    components:{
        commentPhoto
    }
}
</script>

<style scoped lang="less">
    .photoInfo-Box{
        .title{
            h4{
                color:#26a2ff;
                text-align: center;
                font-size: 15px;
                margin: 15px 0;
            }
            .subTitle{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #8f8f94
            }
            .content{
                font-size: 14px;
                line-height: 30px;
                 color: #8f8f94
            }
        }
    }
</style>

