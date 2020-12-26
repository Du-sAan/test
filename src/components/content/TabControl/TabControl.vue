<template>
  <div class="tab-control">
    <div v-for="(item,index) of titles"
     :key="item"
     class="tab-control-item"
     :class="setActive(index)"
     @click="itemClick(index),type(index)">

      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name : "TabControl",
  props : {
    titles : {
      type : Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      index : 0,
    }
  },
  methods : {
    setActive(index){
      // this.index = index
      return (index == this.index) ? "active" : ''
    },
    itemClick(index){
      this.index = index
    },
    type(index){
      // if(index == 0){
      //   this.$emit('type','pop')
      // }else if(index == 1){
      //   this.$emit('type','new')
      // }else{
      //   this.$emit('type','sell')
      // }
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;

    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;

    background-color: white;
  }
  .tab-control-item{
    flex-grow: 1;
  }
  .active{
    color : var(--color-high-text);
  }
  .active span{
    padding: 5px;
    border-bottom: 3px solid var(--color-high-text);
  }
</style>