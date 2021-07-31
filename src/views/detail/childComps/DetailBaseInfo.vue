<template>
  <div v-if="Object.keys(goods).length !== 0" class="baseInfo">
    <div class="infoTitle">{{goods.title}}</div>
    <div class="infoPrice">
      <span class="nPrice">{{'¥' + goods.realPrice}}</span>
      <span class="oPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="infoOther">
      <span id="left">{{goods.columns[0]}}</span>
      <span id="center">{{goods.columns[1]}}</span>
      <span id="right">{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="infoService">
      <span class="infoServiceItem" v-for="index in goods.services.length-1" :key="index">
        <img v-if="goods.services[index-1].icon" :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
    name:'DetailBaseInfo',
    props: {
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
  .infoTitle{
    font-size: 18px;
    font-weight: bold;
    margin:10px 6px 10px 6px;
    color: black;
  }
  .infoPrice{
    margin-bottom: 24px;
  }
  .nPrice{
    font-size: 22px;
    margin:0px 4px 10px 6px;
    color: var(--color-high-text);
  }
  .oPrice{
    font-size: 14px;
    margin:0px 4px 10px 0px;
    text-decoration-line:line-through;
  }
  .discount{
    vertical-align: top;
    font-size: 14px;
    margin:0px 4px 10px 0px;
    color: #fff;
    background-color: var(--color-high-text);
    padding: 2px 4px 2px 4px;
    border-radius: 6px 6px;
  }
  .infoOther{
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    margin:0px 6px 4px 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid #f2f5f8;
  }
  .infoOther span{
    font-size: 15px;
  }
  .infoServiceItem{
    justify-content:space-between;
    margin:0px 6px 0px 6px;
  }
  .infoServiceItem img{
    width:16px;
    height:16px;
  }
  .infoService{
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
    font-size: 14px;
    padding:18px 0px 18px 0px;
    border-bottom:5px solid #f2f5f8;
  }
</style>