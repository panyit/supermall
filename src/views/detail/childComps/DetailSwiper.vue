<template>
  <div class="detailSwiper">
    <swiper class="swiperItem">
      <swiper-item v-for="item in topImages" :key="item.index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from '@/components/common/swiper/Swiper.vue'
import SwiperItem from '@/components/common/swiper/SwiperItem.vue'

export default {
    name:'DetailSwiper',
    components: {
        Swiper,
        SwiperItem,
    },
    props: {
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    .swiperItem{
        height: 200px;
        overflow: hidden;
    }
</style>