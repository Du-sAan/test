<template>
  <div class="Toast">

  </div>
</template>

<script>
export default {
  name : "Toast",
  props : {
    message : String
  }
}
</script>

<style>
  .Toast{
    width: 150px;
    height: 100px;
    border: 3px solid salmon;
  }
</style>