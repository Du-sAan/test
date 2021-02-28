<template>
  <div class="Toast" v-show="show">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: String,
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.Toast {
  border: 3px solid salmon;
  padding: 20px;
  font-weight: 600;
  color: rgb(3, 3, 3);
  transition: all 1s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(189, 126, 81);
  opacity: 0.7;
  box-shadow: 0 0 4px red;

  z-index: 9;
}
</style>