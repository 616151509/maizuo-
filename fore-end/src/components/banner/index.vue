<template>
  <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="@/images/pic-1.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="@/images/pic-1.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="@/images/pic-2.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="@/images/pic-3.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="@/images/pic-4.jpg" alt="">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- /轮播图 -->
</template>

<script>
// 引入 Swiper
import Swiper from 'swiper';

export default {
  mounted () {
    new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../styles/common/px2rem.scss';

@import 'swiper/dist/css/swiper.min.css';

.swiper-container {
  height: px2rem(210);
  .swiper-pagination-bullet {
    width: px2rem(10);
    height: px2rem(10);
  }
  .swiper-pagination-bullet-active {
    background: yellowgreen;
  }
}
</style>
