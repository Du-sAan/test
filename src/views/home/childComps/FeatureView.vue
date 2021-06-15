<template>
  <div class="home-feature">
    <a href="javascript:;">
      <img :src="img" alt="蘑菇街">
    </a>
    
  </div>
  
</template>

<script>
import {popular} from "network/home_request.js"
export default {
  name : "Fearture",
  data (){
    return {
      img : ""
    }
  },
  created(){
    let p = popular();
    p.then( res => {
      console.log(res)
      this.img = res ? res.image : "~assets/img/home/Feature_view.jpg"
    })
  }
}
</script>

<style>
  .home-feature a{
    display: inline-block;
    height: 100%;
    width:100%;
  }
  .home-feature img{
    width: 100%;
  }
</style>