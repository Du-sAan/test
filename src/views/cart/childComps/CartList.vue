<template>
  <scroll>
    <div>
      <cart-list-item 
        v-for="item in goodList" 
        :key="item.iid" 
        :item-info="item">
      </cart-list-item>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/bscroll/Bscroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    props: {
		  goodList: {
		    type: Array,
        default() {
		      return []
        }
      }
    }
	}
</script>

<style scoped>

</style>
