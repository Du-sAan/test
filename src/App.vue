<template>
  <div id="app">
    <keep-alive :exclude="blackList">
      <router-view/>
    </keep-alive>
    <main-tabbar/>
  </div>
</template>

<script>
import MainTabbar from "components/content/MainTabbar/MainTabbar.vue"
export default {
  name: 'App',
  components :{
    MainTabbar
  },
  data () {
    return {
      blackList : []
    }
  }
} 
</script>

<style>
@import url("assets/css/base.css");
</style>
