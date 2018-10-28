<template>
  <div class="shoppingCarBox">
    <div class="goods-list" v-for="(item,i) in carList" :key='item.id'>
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getCarSelected[item.id]"
            @change="selectedChange(item.id,$store.getters.getCarSelected[item.id])"
            >
            </mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h5>{{item.title}}</h5>
              <div>
                  <span>￥{{item.sell_price}}</span>
                  <div class="mui-numbox"  data-numbox-min='0' data-numbox-max='100'>
                      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                      <input class="mui-numbox-input" type="number" :value="$store.getters.getCarCount[item.id]"/>
                      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                  </div>
                  <a href="#" @click.prevent='removeCar(item.id,i)'>删除</a>
              </div>
            </div>
					</div>
				</div>
			</div>
    </div>
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner buy">
            <div>
              <p>总计(不含运费)</p>
              <p>已勾选商品<span>{{$store.getters.countAllGoods.count}}</span>件,总价<span>￥{{$store.getters.countAllGoods.amount}}</span></p>
            </div>
            <mt-button type="danger" size="small">立即购买</mt-button>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
import mui from '../assets/mui/js/mui.min.js'
export default {
   data(){
     return{
       carList:[]
     }
   },
   created(){
     this.getGoodsList()
   },
   updated(){
    mui('.mui-numbox').numbox()
  },
   methods:{
     getGoodsList(){
      var idArr = []
      this.$store.state.car.forEach(item=>{
        idArr.unshift(item.id)
      })
       
      this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(response=>{
        if(response.body.status ==0){
          this.carList = response.body.message
          //console.log(response.body)
        }
       })
     },
     removeCar(id,index){
       this.carList.splice(index,1)
       this.$store.commit('removeFromCar',id)
     },
     selectedChange(id,selected){
       this.$store.commit('updateSelected',{id,selected})
     }
   }
}
</script>

<style scoped lang='less'>
  .goods-list{
    .mui-card-content-inner{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info{
        h5{
          font-size: 13px;
          font-weight: bold;
          color: black;
        }
        >div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          >span{
            color: red;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      img{
        width: 60px;
        height: 60px;
      }
    }
  }
  .buy{
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      color: red;
      padding: 3px;
      font-size: 16px;
    }
  }
</style>
