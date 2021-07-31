<template>
  <div class="bottomBar">
    <div class="checkContent">
      <check-button class="checkButton" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import checkButton from '@/components/content/checkButton/CheckButton.vue'
export default {
    name:'CartBottomBar',
    components: {
        checkButton
    },
    computed: {
        totalPrice(){
            return '¥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            if (this.$store.state.cartList.length === 0) return false
            //1.使用filter
            //return !(this.$store.state.cartList.filter(item => !item.checked).length)
            //2.使用find
            //return !this.$store.state.cartList.find(item => !item.checked)
            //3.普通遍历
            for(let item of this.$store.state.cartList){
                if(!item.checked){
                    return false
                }
            }
            return true
        }
    },
    methods: {
        checkClick(){
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => item.checked = false)
            }else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick(){
            //if(!this.isSelectAll){
            if(this.checkLength === 0){
                this.$toast.show('请选择购买的商品', 2000)
            }
        }
    }
}
</script>

<style scoped>
    .bottomBar{
        display: flex;
        height: 40px;
        background-color: #eee;
        position: relative;
        line-height: 40px;
    }
    .checkContent{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width:60px;
    }
    .checkButton{
        width: 20px;
        height: 20px;
        line-height: 20px;
    }
    .price{
        margin-left: 20px;
        flex: 1;
    }
    .calculate{
        width:90px;
        background-color: var(--color-high-text);
        color: #fff;
        text-align: center;
    }
</style>