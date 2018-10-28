<template>
    <div class='goodsBox'>
       <h3>{{goodsComment.title}}</h3>
        <hr>
        <div v-html='goodsComment.content' class="bodyBox"></div>
    </div>
</template>
<script>
     export default{
        data(){
            return{
                id:this.$route.params.id,
                goodsComment:{}
            }
        },
        created(){
            this.getGoodsComment()
        },
        methods:{
            getGoodsComment(){
                this.$http.get('api/goods/getdesc/'+this.id).then(response=>{
                    //console.log(response.body)
                    if(response.body.status===0){
                        this.goodsComment = response.body.message[0]
                    }
                })
            }
        }
    }
</script>
<style scoped lang='less'>
     .goodsBox{
        h3{
            text-align:center;
            color: #226aff;
            font-size: 16px;
            margin: 15px 0;
        }
        /deep/.bodyBox{
            p{
                width: 100%;
                margin-bottom: 0;
                img{
                    display: block;
                }
            }
            img{
                 width: 100%;
                 vertical-align: middle;
            }
        }
    }
</style>

