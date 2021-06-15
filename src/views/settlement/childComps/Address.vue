<template>
  <div class="address">
    <div class="font fa">
      <i>&#xf284;</i>
      <span></span>
    </div>
    <div class="addr">
      <div class="name"></div>
      <div class="phone"></div>
      <div class="adr"></div>
    </div>
  </div>
</template>

<script>
export default {
  name : "Address"
}
</script>

<style>
  .address{
    height: 72px;
    display: flex;
    box-shadow: 0 2px 2px rgba(100, 100, 100, 0.2);
  }
  .font{
    flex: 0 0 25px;
    padding-left: 12px;
    align-self: center;
    color : #333;

    position: relative;
    
  }
  .font i {
    font-style: normal;
  }
  .font span {
    position: absolute;
    left: 50px;
    top : -28px ;
    height: 73px;
    width: 1px;
    background: rgba(100, 100, 100, 0.3);
  }
  .addr{
    flex: 1 ;
    display:  grid;
  }
</style>