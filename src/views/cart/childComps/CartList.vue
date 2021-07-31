<template>
  <div class="cartList">
    <scroll class="content" :pull-up-load="true" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue';
import {mapGetters} from 'vuex';
import CartListItem from './CartListItem.vue';

export default {
    components: { Scroll, CartListItem },
    name:'CartList',
    computed: {
        ...mapGetters(['cartList'])
    },
    activated () {
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
    .cartList{
        height:calc(100vh - 44px - 49px - 40px);
    }
    .content{
        height:100%;
        overflow: hidden;
    }
</style>