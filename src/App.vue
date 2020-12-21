<template>
  <div id="app">
    <router-view/>
    <MainTabbar/>
  </div>
</template>

<script>
import MainTabbar from "components/content/MainTabbar/MainTabbar.vue"
export default {
  name: 'App',
  components :{
    MainTabbar
  }
} 
</script>

<style>
@import url("assets/css/base.css");
</style>
