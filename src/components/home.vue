<template>
  <div id="homeBox">
    <mt-swipe :auto="4000" id="swiper">
      <mt-swipe-item v-for= '(item, index) in list' :key='index'>
        <img :src="item.img" alt="">
      </mt-swipe-item>
      <!-- <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item> -->
    </mt-swipe>

     <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li class="mui-table-view-cell mui-media mui-col-xs-4 ">
            <router-link to="/home/newsList">
              <img src="../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div>
            </router-link>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/home/photoList">
              <img src="../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
              <img src="../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></a></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
              <img src="../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
              <img src="../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></a></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
              <img src="../images/menu2.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
      </ul> 
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      this.$http.get("api/getlunbo").then(response => {
        if (response.body.status == 0) {
          //console.log(response.body)
          this.list = response.body.message;
        } else {
          Toast("轮播图获取图片失败");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
#homeBox {
  #swiper {
    height: 200px;
    .mint-swipe-item {
      &:nth-child(1) {
        background-color: pink;
      }
      &:nth-child(2) {
        background-color: skyblue;
      }
      &:nth-child(3) {
        background-color: green;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .mui-table-view.mui-grid-view {
    background-color: #fff;
    li {
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border-right: 0;
    border-bottom: 0;
    font-size: 14px;
  }
}
</style>
