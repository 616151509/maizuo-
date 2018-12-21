<template>
  <div class="home">
    <!-- 是指切换 子路由， films/  center/ cinemasS -->
    <transition
      mode="out-in"
      appear
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
      >
      <router-view></router-view>
    </transition>
    <nav-bar></nav-bar>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar';
export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
