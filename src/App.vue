<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /* 提示框 */
  .tipPopup {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 540px;
  }
  .tipPopup div {
    color: gainsboro;
    font-size: 24px;
  }
  .tipPopup img {
    width: 30px;
  }
</style>
