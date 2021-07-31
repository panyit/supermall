<template>
  <div class="goodsItem" @click="itemClick">
    <!--<img :src="showImage" alt="" @load="imageLoad">-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goodsInfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span id="star">☆</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'GoodListItem',
    props: {
        goodsItem: {
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        itemClick(){
            this.$router.push('/detail/' + this.goodsItem.iid)
        },
        imageLoad(){
            this.$bus.$emit('itemImgLoad')
            /*if(this.$route.path.indexOf('/home')){
                this.$bus.$emit('homeItemImgLoad')
            }else if(this.$route.path.indexOf('/detail')){
                this.$bus.$emit('detailItemImgLoad')
            }*/
        }
    },
    computed: {
        showImage(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    }
}
</script>

<style scoped>
    .goodsItem{
        padding-bottom: 40px;
        position: relative;
        width: 48%;
    }
    .goodsItem img{
        width: 100%;
        border-radius: 5px;
    }
    .goodsInfo{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goodsInfo p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goodsInfo .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info #star{
        font-size: 16px !important;
    }
    .goods-info .collect {
        position: relative;
  }
    /*.goods-info .collect::before {
        content: '☆';
        position: absolute;
        background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
  }*/
</style>