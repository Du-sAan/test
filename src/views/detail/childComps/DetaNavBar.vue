<template>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <span 
          v-for="(item,index) of titles" 
          :key="item"
          @click="spanClick(index)"
          :class="{active : currentIndex == index ? true : false}"
        >
          {{item}}
        </span>
      </div>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name : 'DetaNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles : ['商品','参数','评论','推荐'],
      currentIndex : 0
    }
  },
  methods: {
    spanClick(index){
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    width: 100%;
    display: flex;
  }
  .title span{
    flex-grow: 1;
    font-size: 14px;
  }
  .active{
    color: red;
  }
  .left img{
    margin: 11px 19px 0 0;
    border-right: 1px solid rgba(81, 81 , 81, 0.5);
  }
</style>