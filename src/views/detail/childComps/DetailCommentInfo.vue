<template>
  <div class="commentInfo">
    <div class="commentTitle">
      <span id="span1">用户评价</span>
      <span id="span2">更多</span>
    </div>
    <div class="userInfo">
      <img :src="commentInfo.avatar" alt="">
      <span>{{commentInfo.username}}</span>
    </div>
    <div class="comment">
        <div class="commentContent"><span>{{commentInfo.comment}}</span></div>
        <div><img v-for="(item,index) in commentInfo.images" :key="index" :src="commentInfo.images[index]" alt=""></div>
        <span class="commentTime">{{commentInfo.time|formatDate}}</span>
        <span class="commentStyle">{{commentInfo.style}}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/util.js';

export default {

    name:'DetailCommentInfo',
    props:{
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters: {
        formatDate(time) {
            time = time * 1000
            let date = new Date(time)
            //return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            return formatDate(date, 'yyyy-MM-dd')
        }
    }
}
</script>

<style scoped>
    .commentInfo{
        background: #fff;
        padding: 0px 8px 20px 8px;
        font-size: 14px;
        border-bottom: 5px solid #f2f5f8;
    }
    .commentTitle{
        display: flex;
        justify-content: space-between;
        padding: 15px 0px;
        border-bottom: 2px solid #f2f5f8;
        color: black;
    }
    .commentTitle #span1{
        font-size: 16px;
    }
    .commentTitle #span2{
        font-size: 14px;
    }
    .userInfo{
        margin: 10px 0px;
    }
    .userInfo img{
        width: 45px;
        height: 45px;
        margin-right: 10px;
        border-radius: 50%;
    }
    .userInfo span{
        font-size: 16px;
        color: black;
        display: inline-block;
        line-height: 45px;
        vertical-align: top;
    }
    .commentContent{
        margin-bottom: 10px;
    }
    .comment{
        margin-left:4px;
    }
    .comment img{
        width:30vw;
        height:30vw;
        margin-right: calc((10vw - 20px)/3.0);
        margin-bottom: calc((10vw - 20px)/3.0);
    }
    .commentTime{
        margin-right: 10px;
    }
</style>