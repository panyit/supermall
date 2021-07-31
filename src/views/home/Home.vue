<template>
  <div id="home">
    <nav-bar class="homenav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" ref="tabControl1" class="tabControl" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" ref="tabControl2"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';

import NavBar from '@/components/common/navbar/NavBar';
import TabControl from '@/components/content/tabControl/TabControl.vue';
import GoodList from '@/components/content/goods/GoodList.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';

import {getHomeMultidata,
        getHomeGoods
} from "@/network/home";
import {debounce} from '@/common/util.js';
import {itemListenerMixin, backTopMixin} from '@/common/mixin.js'

export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  /*mounted () {
    //3.监听item中图片加载完成
    const newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  },*/
  activated () {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    
  },
  deactivated () {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    //事件监听相关
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position){
      //判断BackTop是否显示
      //this.isShowBackTop = (-position.y) > 1000
      this.listenShowBackTop(position)
      //决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    //网络请求相关
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .homenav{
    background-color: var(--color-tint-text);
    color: #fff;

    /*position: fixed;*/
    /*position: sticky;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  /*.tabControl{
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/
  /*.fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }*/
  .content{
    height: calc(100% - 93px);
    overflow: hidden;

    position: absolute;
    top:44px;
    bottom: 49px;
  }
  .tabControl{
    position: relative;
    z-index: 9;
  }
</style>