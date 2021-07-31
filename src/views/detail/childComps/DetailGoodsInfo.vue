<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goodsInfo">
    <div class="infoDesc clearFix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="infoKey">{{detailInfo.detailImage[0].key}}</div>
    <div class="infoList">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
export default {
    name:'DetailGoodsInfo',
    props: {
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            counter: 0,
            imagesLength: 0
        }
    },
    methods: {
        imgLoad(){
            if(++this.counter === this.imagesLength){
                this.$emit('imageLoad')
            }
        }
    },
    watch: {
        detailInfo(){
            this.imagesLength = this.detailInfo.detailImage[0].list.length;
        }
    }
}
</script>

<style scoped>
    .goodsInfo{
        padding: 20px 0;
        border-bottom: 5px solid #f2f5f8;
    }
    .start{
        width:100px;
        border-top:1px solid #666;
        margin-left: 8px;
    }
    .desc{
        margin: 15px 8px;
        font-size: 14px;
    }
    .end{
        position: absolute;
        width:100px;
        border-top:1px solid #666;
        margin-right: 8px;
        right:0%;
    }
    .infoKey{
        font-size: 15px;
        margin: 15px 8px;
    }
    .infoList{
        margin: 0px 8px;
    }
    .infoList img{
        width: 100%;
        margin-top: 5px;
    }
</style>