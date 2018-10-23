<template>
    <div>
       <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for='item in newList' :key =item.id>
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.add_time | dataFormat()}}</span>
                            <span>点击: {{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
    export default {
       data(){
           return {
               newList:[]
           }
       },
       created(){
           this.getNewsList()
       },
       methods:{
          getNewsList(){
               this.$http.get('api/getnewslist').then(response=>{
               if(response.body.status ===0){
                   this.newList = response.body.message
               }else{
                   Toast('获取新闻信息失败')
               }
           })
          }
       }
    }
</script>

<style scoped lang='less'>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #0094ff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

