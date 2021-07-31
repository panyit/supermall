<template>
  <div class="recommend">
      <div v-for="item in recommends" :key="item.index" class="recommendItem">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>


export default {
    name:'RecommendView',
    props: {
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .recommend{
        display: flex;
        text-align: center;
        font-size: 12px;
        padding: 10px 0px 20px 0px;
        border-bottom: 10px solid #eee;
    }
    .recommendItem{
        flex: 1;
    }
    .recommendItem img{
        width:65px;
        height:65px;
        margin-bottom: 10px;
    }
</style>