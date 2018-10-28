<template>
    <div>
        <mt-swipe :auto="4000" id="swiper">
            <mt-swipe-item v-for= '(item, index) in list' :key='index'>
                <img :src="item.img ? item.img:item.src" alt="" :class="{isfull:isfull}">
            </mt-swipe-item>
        <!-- <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item> -->
        </mt-swipe>
    </div>
</template>
<script>
    export default{
        props:['list','isfull']
    }
</script>
<style lang="less">
 #swiper {
    height: 200px;
    .mint-swipe-item {
        text-align: center;
    //   &:nth-child(1) {
    //     background-color: pink;
    //   }
    //   &:nth-child(2) {
    //     background-color: skyblue;
    //   }
    //   &:nth-child(3) {
    //     background-color: green;
    //   }
      img {
        //width: 100%;
        height: 100%;
      }
      .isfull{
          width: 100%;
      }
    }
  }
</style>

