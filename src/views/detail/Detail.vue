<template>
  <div id="detail">
    <detail-nav-bar class="detailNav" @titleClick="titleClick" ref="nav"/>

    <scroll class="content" ref="scroll" :pull-up-load="true" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <good-list :goods="recommends" ref="recommend"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import GoodList from '@/components/content/goods/GoodList.vue';
import DetailBottomBar from './childComps/DetailBottomBar.vue';

import Scroll from '@/components/common/scroll/Scroll.vue';

import {getDetail, getRecommend, Goods, Shop, GoodsParam, Comment} from '@/network/detail';
import {debounce} from '@/common/util.js';
import {itemListenerMixin, backTopMixin} from '@/common/mixin.js'

export default {
    name:'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodList,
        DetailBottomBar
    },
    data(){
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY: null,
            currentIndex: 0
        }
    },
    mixins:[itemListenerMixin, backTopMixin],
    created () {
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            const data = res.result;
            console.log(data);
            //1.获取顶部轮播图数据
            this.topImages = data.itemInfo.topImages;
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //3.获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //4.获取商品详情数据
            this.detailInfo = data.detailInfo;
            //5.获取尺寸等参数信息
            this.paramInfo =new GoodsParam(data.itemParams.info, data.itemParams.rule);
            //6.获取评论信息
            /*data.rate.list[0].then((response) => {
                this.commentInfo = new GoodsParam(response)
                }, (err) => {
                console.log(err);
            });*/
            this.commentInfo = new Comment(data.rate);

            //当前面的模板都渲染完成后，执行一次该函数;;
            //根据最新的数据，对应的dom是已经被渲染出来，但是可能图片依然没有加载完
            /*this.$nextTick(() =>{
                this.themeTopYs = []
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            })*/
        })

        //3.请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list;
        })

        //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE);
        },100)
    },
    mounted () {
        /*let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () =>{
            newRefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)*/
        //console.log('---')
    },
    destroyed () {
        this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    activated () {
        //
    },
    methods: {
        imageLoad(){
            this.$refs.scroll.refresh();

            this.getThemeTopY();
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
        },
        contentScroll(position){
            const positionY = -position.y + 44;
            //
            let length = this.themeTopYs.length;
            for(let i = 0; i < length - 1; i++){
                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1])){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }
            /*for(let i = 0; i < length; i++){
                if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && 
                positionY <this.themeTopYs[i+1]) || (i ===length -1 && positionY >=this.themeTopYs[i]))){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }*/
            //是否显示回到顶部
            this.listenShowBackTop(position)

        },
        addToCart(){
            //1.获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0];
            //product.title = this.goodsInfo.title;
            //product.desc = this.goodsInfo.desc;
            //product.price = this.goodsInfo.realPrice;
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            //console.log(product)

            //2.将商品添加到购物车里(Vuex)
            //this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product).then(res => {
                this.$toast.show(res, 2000)
                //console.log(res)
            })
        }
    }
}
</script>

<style scoped>
    #detail{
        position:relative;
        z-index:9;
        background-color: #fff;
        height: 100vh;
    }
    .detailNav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height:calc(100% - 44px - 49px);
    }
</style>