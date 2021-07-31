<template>
  <div class="cart">
    <nav-bar class="navBar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

export default {
  components: { NavBar, CartList, CartBottomBar },
  name: 'Cart',
  computed: {
    //mapGetters两种语法
    //...mapGetters(['cartLength'],['cartList']),
    ...mapGetters({
      length:'cartLength',
      //list:'cartList'
    })
  }
}
</script>

<style scoped>
  .cart{
    height:100vh;
  }
  .navBar{
    background-color: var(--color-tint-text);
    color: #fff;
  }
</style>