<template>
    <div class="goodsBox">
        <div class="goodsInfo" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <div class="goodsTop">
                <img :src="item.img_url" alt="">
                <h4>{{item.title}}</h4>
            </div>
            <div class="goodsBottom">
                <p>￥{{item.sell_price}}</p><span>￥{{item.market_price}}</span>
                <div>
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
   export default{
       data(){
           return{
               pageindex:1,
               goodsList:[]
           }
       },
       created(){
           this.getGoodsList()
       },
       methods:{
           getGoodsList(){
               this.$http.get('api/getgoods?'+this.pageindex).then(response=>{
                   //console.log(response.body)
                   if(response.body.status===0){
                       this.goodsList = this.goodsList.concat(response.body.message)
                   }else{
                       Toast("获取商品失败")
                   }
               })
           },
           getMore(){
               this.pageindex++
               this.getGoodsList()
           },
           goDetail(id){
               this.$router.push('/home/goodsInfo/'+id)
           }
       }
   } 
</script>
<style lang="less">
    .goodsBox{
        padding: 5px;
        display: flex;
        flex-wrap:wrap;
        .goodsInfo{
            width: 50%;
            box-shadow: 3px 3px 3px #ccc;
            padding: 4px;
            .goodsTop{
                text-align: center;
                background-color: white;
                padding:0 5px;
                img{
                    width: 100%
                }
                h4{
                    font-size: 13px;
                    height: 40px;
                    margin: 0;
                }
            }
            .goodsBottom{
                padding: 0 5px;
                p{
                    color: red;
                    display: inline-block;
                    margin-right: 12px;
                    font-weight: bolder;
                }
                >span{
                   font-size: 12px;
                   color: #8f8f94;
                   text-decoration:line-through;
                }
                div{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #8f8f94
                }
            }
        }
    }
</style>

