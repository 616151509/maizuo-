<template>
  <div class="films-list">
    <banner></banner>
    <!-- /定位城市 -->
    <div class="city-fixed">
      <router-link tag="span" to="/city">
        {{ (cityname === '')?curCity:cityname }}
      </router-link>
      <i class="iconfont icon-xiala"></i>
    </div>
    <!-- /定位城市 -->
    <!-- tab-bar -->
    <div class="tab-bar-wrapper">
      <ul class="tab-bar">
       <li :class="{'z-act': $route.path === '/films/nowPlaying'}" @click="switchList('now')">
          <span>正在热映</span>
        </li>
        <li :class="{'z-act': $route.path === '/films/comingSoon'}" @click="switchList('soon')">
          <span>即将上映</span>
        </li>
      </ul>
    </div>
    <!-- /tab-bar -->
    <router-view></router-view>
  </div>
</template>

<script>

// 引入banner
import Banner from '@/components/Banner';
import { mapState } from 'vuex';
export default {
  name: 'Films',
  components: {
    Banner
  },
  data () {
    return {
      curCity: ''
    }
  },
  computed: {
    ...mapState([
      'cityname'
    ])
  },
  methods: {
    // 获取地图城市
    getCityName () {
      /* eslint-disable*/
        let myCity = new BMap.LocalCity();
        myCity.get((result) => {
          var cityName = result.name;
          this.curCity = cityName;
        });
    },
    switchList (type) {
      if (type === 'now') {
        // this.$router.push('/films/nowPlaying');
        this.$router.push({
          name: 'nowPlaying'
        })
      } else {
        this.$router.push('/films/comingSoon');
      }
    }
  },
  created () {
    this.getCityName();
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
/* @import '../styles/common/px2rem.scss'; */
@import '@/styles/common/px2rem.scss';

.films-list {
  flex: 1;
  overflow-y: auto;
}
.city-fixed {
  position: absolute;
  top: px2rem(18);
  left: px2rem(8);
  z-index: 999;
  height: px2rem(30);
  line-height: px2rem(30);
  font-size: px2rem(14);
  color: #fff;
  border-radius: px2rem(15);
  text-align: center;
  padding: 0 px2rem(5);
  background: rgba(0, 0, 0, 0.2);
}
.tab-bar-wrapper {
  position: sticky;
  z-index: 999;
  top: px2rem(0);
  height: px2rem(50);
  border-bottom: px2rem(1) solid #ededed;
  background: #fff;
  .tab-bar {
    display: flex;
    height: px2rem(50);
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      font-size: px2rem(14);
      span {
        padding: 0 px2rem(10);
      }
      &.z-act {
        color: #ff5f16;
      }
    }
  }
}
</style>
