<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
@import 'stylus/index.styl';

header {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 0.8rem;
  background: #fff;
  padding: 0.1rem 0;
  align-items: center;
  color: #666;
}

header .left {
  text-align: center;
  font: 0.2rem / 0.4rem '微软雅黑';
}

header .center {
  flex: 1;
  font: bold 0.4rem / 0.8rem '微软雅黑';
}

header .left, header .right {
  width: 1rem;
}
</style>