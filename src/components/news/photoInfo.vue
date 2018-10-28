<template>
   <div class="photoInfo-Box">
      <div class="title">
          <h4>{{infoList.title}}</h4>
          <div class="subTitle">
              <span>发表时间：{{infoList.add_time}}</span>
              <span>点击：{{infoList.click}}次</span>
          </div>
          <hr>
           <vue-preview :slides="slide1" ></vue-preview>
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
            infoList:{},
            slide1:[]
        }
    },
    created(){
        this.getInfo()
        this.getImage()
    },
    methods:{
        getInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(response=>{
                if(response.body.status ===0){
                    this.infoList = response.body.message[0]
                }
            })
        },
        getImage(){
            this.$http.get('api/getthumimages/'+this.id).then(response=>{
                console.log(response.body)
                response.body.message.forEach(value=>{
                    value.msrc = value.src
                    value.w = 600
                    value.h = 400
                })
                this.slide1 = response.body.message
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
        padding: 4px;
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
        /deep/ .my-gallery{
            display: inline-block;
            display: flex;
            flex-wrap: wrap;
            figure{
                margin: 0;
                width: 33.33%;
                padding: 4px;
                img{
                    width: 100%;
                }
            }
        } 

    }
</style>

