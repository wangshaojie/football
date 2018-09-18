<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import "assets/styles/global.less";
</style>

<script>
export default {
  name: 'App'
}
</script>

<style>
.underlineHover{
    color:@color;
  }
</style>
