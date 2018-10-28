<template>
    <div class="goodsInfo">
        <transition name='aaa'
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
        >
            <div class="ball" v-show='flag' ref='ball'></div>
        </transition>
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :list="listLunbo" :class="isfull"></swiper>
					</div>
				</div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品名称</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                       市场价:<del class="mark_price">￥ {{goodsInfo.market_price}}</del>
                       销售价:<span class="sell_price">￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <div>购买数量：
                        <div class="mui-numbox"  data-numbox-min='0' data-numbox-max='100'>
                            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                            <input class="mui-numbox-input" type="number" value="1" ref="name"/>
                            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                        </div>
                    </div>
                    <p class="buyButton">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click='goCar'>加入购物车</mt-button>
                    </p>
                </div>
            </div>
            
        </div>
         <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsInfo.goods_no}}</p>
                    <p>库存情况:{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间:{{goodsInfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click='goodsIntroduce'>图文介绍</mt-button>
                <mt-button class="button" type="danger" size="large" plain @click='goodsComment(id)'>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import swiper from "../subcomponents/swiper.vue"
    import mui from'../../assets/mui/js/mui.min.js'
    export default{
        components:{
            swiper
        },
        data(){
            return{
                id:this.$route.params.id,
                listLunbo:[],
                goodsInfo:{},
                isfull:false,
                flag:false,
                count:1,
            }
        },
        created(){
            this.getLunbo(),
            this.getGoodsInfo()
        },
        mounted(){
             mui('.mui-numbox').numbox()
        },
        methods:{
            getLunbo(){
                this.$http.get("api/getthumimages/"+this.id).then(response=>{
                    //console.log(response.body)
                    if(response.body.status ===0){
                        this.listLunbo = response.body.message
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get("api/goods/getinfo/"+this.id).then(response=>{
                    //console.log(response.body)
                    if(response.body.status==0){
                        this.goodsInfo = response.body.message[0]
                    }
                })
            },
            goodsIntroduce(){
                this.$router.push({name:'goodsIntroduce',params:{id:this.id}})
            },
            goodsComment(id){
                this.$router.push({name:'goodsComment',params:{id}})
            },
            goCar(){
                this.flag = !this.flag
                //获取购买数量
                this.count = parseInt(this.$refs.name.value)
                var goodsDetail = {id:this.id, count:this.count, price:this.goodsInfo.sell_price, selected:true}
                this.$store.commit('addGoods',goodsDetail)
            },
            beforeEnter(el) {
                el.style.transform = 'translate(0,0)'
            },
            enter(el, done) {
                el.offsetWidth
                const balldest = this.$refs.ball.getBoundingClientRect()
                const bagdest = document.getElementById('badge').getBoundingClientRect()
                const X = bagdest.left -  balldest.left
                const Y = bagdest.top -  balldest.top
                el.style.transform = `translate(${X}px,${Y}px)`
                el.style.transition = 'all 0.5s ease'
                done()
            },
            afterEnter(el) {
               this.flag = !this.flag
            },
        }
    }
</script>

<style scoped lang="less">
   .goodsInfo{
        .sell_price{
        color: red;
        font-size: 16px;
        font-weight: 800;
        padding-left: 10px;
        }
        .mark_price{
            padding-right: 10px;
        }
        .mui-card-footer{
            display: block;
        .button{
                margin-top:10px;
            }
        }
        .buyButton{
            margin-top:10px;
        }
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            z-index: 999;
            position: absolute;
            left: 150px;
            top: 390px;
        }
   }
</style>