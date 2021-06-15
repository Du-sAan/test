<template>
  <div id="settlement">
    <nav-bar class="nav-bar fa">
      <div slot="left">&#xf060;</div>
    </nav-bar>
    <Address/>
    <PayMethod/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import PayMethod from "./childComps//payMethod"
import Address from "./childComps/Address"
export default {
  name: "Settlement",
  components: {
    NavBar,
    Address,
    PayMethod
  }
};
</script>

<style scoped>
#settlement {
  height: calc(100vh - 44px - 49px);
  margin-top: 44px;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  font-size : 1.5rem;
}
</style>