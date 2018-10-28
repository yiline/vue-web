<template>
    <div class="PhotoBox">
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id==0?'mui-active':'']" data-wid="tab-top-subpage-1.html" @click="getAllPhoto(item.id)" v-for="item in navList" :key="item.id">
							{{item.title}}
						</a>
					</div>
				</div>
		</div>
		<ul class="photo-list">
			<router-link v-for="item in photoList" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h5>{{item.title}}</h5>
					<div class="info-body">
						{{item.zhaiyao}}
					</div>
				</div>
			</router-link>
		</ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import mui from'../../assets/mui/js/mui.min.js'
export default {
  data() {
    return {
	  navList: [],
	  photoList:[]
    };
  },
  created() {
	this.getAllTitle();
	this.getAllPhoto(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllTitle() {
      this.$http.get("api/getimgcategory").then(response => {
        //console.log(response.body)
        if (response.body.status === 0) {
          response.body.message.unshift({ title: "全部", id: 0 });
          this.navList = response.body.message;
        }else{
			Toast("获取列表失败")
		}
      });
	},
	getAllPhoto(id){
		this.$http.get('api/getimages/'+id).then(response=>{
			//console.log(response.body)
			if(response.body.status===0){
				this.photoList = response.body.message
			}else{
				Toast("图片加载失败")
			}
		})
	},
  }
};
</script>
<style scoped lang="less">
* {
  touch-action: pan-y;
}
.photo-list{
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li{
		background-color:#ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow:  0 0 9px #999;
		position: relative;
		img{
			width: 100%;
			vertical-align: middle;
		}
		.info{
			position: absolute;
			bottom: 0;
			color: white;
			text-align: left;
			background: rgba(0, 0, 0, 0.4);
			height: 84px;
			h5{
				font-size: 14px;
				color: white;
			}
			.info-body{
				font-size: 13px;
			}
		}
		img[lazy=loading] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
	}
	
}
</style>

