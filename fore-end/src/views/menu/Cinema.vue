<template>
  <div class="cinemas-list">
    <router-view></router-view>
    <div class="cityNow" ref="search">
      影院
      <p>
        {{ (cityname === '')?curCity:cityname }}
        <img src="@/images/index2.png" alt="">
      </p>
      <router-link tag="div" to="/cinemas/search" class="right">
        <img src="@/images/index3.png" alt="">
      </router-link>
    </div>
    <div>
      <div class="citySearch">
        <div class="item" @click="query" ref="allCourse" :class="{ changeColor : isTrue}">
          全程
          <img v-show="!isTrue" src="@/images/index2.png" alt="">
          <img v-show="isTrue" src="@/images/index5.png" alt="">
        </div>
        <div class="item">
          最近去过
          <img src="@/images/index2.png" alt="">
        </div>
      </div>
      <div class="cityArea" v-show="isTrue">
        <ul class="district-list">
          <li class="item all" data="district">
              全城
          </li>
          <li class="item" data="district" v-for="(item,index) in area" :key="index" @click="knowCity(item)">
              {{item}}
          </li>
        </ul>
      </div>
    </div>
    <div class="cinema-list">
      <ul class="list">
        <li v-for="(item,index) in loveArea" :key="index" class="item">
          <div class="left">
            <p>{{ item.name }}</p>
            <p>{{ item.address }}</p>
          </div>
          <div class="right">
            <p>￥{{item.lowPrice/100}}起</p>
            <p>距离未知</p>
          </div>
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Cinema',
  data () {
    return {
      area: [],
      isTrue: false,
      curCity: '深圳',
      bianfuxia: 1
    }
  },
  computed: {
    ...mapState([
      'cityname',
      'love',
      'loveArea'
    ])
  },
  methods: {
    ...mapMutations([
      'knowCity'
    ]),
    getCinema () {
      axios.get('/api/cinema/list').then(response => {
        let cityha = [];
        let result = response.data.data.films;
        if (response.data.code === 0) {
          this.film = result
          this.$store.commit('lovecity', result)
          this.$store.commit('myLoveCity', result)
        }
        result.map((item, i) => {
          if (cityha.indexOf(item.districtName) === -1) {
            cityha.push(item.districtName)
          }
        })
        this.area = cityha;
      })
    },
    query () {
      this.isTrue = !this.isTrue;
    }
  },
  created () {
    this.getCinema()
  }
};
</script>

<style lang="scss" scoped>
/* @import '../styles/common/px2rem.scss'; */
@import "@/styles/common/px2rem.scss";
.cinemas-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  .cityNow {
    width: 100%;
    border-bottom:px2rem(1) solid #eee;
    height: px2rem(44);
    text-align: center;
    position: relative;
    line-height: px2rem(44);
    font-size: px2rem(18);
    color: #191a1b;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 34;
    .right{
      position: absolute;
      right: px2rem(8);
      top: px2rem(4);
      img{
        width: px2rem(20);
        height: px2rem(20);
      }
    }
    p {
      font-size: px2rem(14);
      color: #191a1b;
      position: absolute;
      left: px2rem(15);
      top: px2rem(0);
    }
  }
  .citySearch {
    height: px2rem(49);
    display: flex;
    flex-direction: row;
    .item{
      flex: 1;
      text-align: center;
      line-height: px2rem(49);
      font-size: px2rem(14);
      img{
        width: px2rem(6);
      }
      border-bottom:px2rem(1) solid #eee;
    }
  }
  .cityArea{
    .district-list{
      padding: px2rem(10) 0 0;
      margin: 0 0 0 px2rem(10);
      .item{
        font-size: px2rem(12);
        display: inline-block;
        width: calc((100vw - 50px)/4);
        padding-bottom: px2rem(15);
        padding-right: px2rem(10);
        height: px2rem(30);
        border: px2rem(1) solid #eee;
        color: #797d82;
        border-radius: 3px;
        text-align: center;
        padding-top:px2rem(8);
        margin-bottom: px2rem(5)
      }
      & .all{
        border: px2rem(1) solid #ff5f16;
        color: #ff5f16;
      }
    }
  }
  .cinema-list{
    overflow-y: auto;
    flex: 1;
    .list{
      width: 100%;
      height: 100%;
      .item{
        padding: px2rem(15);
        height: px2rem(75);
        font-size: px2rem(14);
        .left,.right{
          float: left;
        }
        .left{
          width: 77%;
          height: 100%;
          margin-right: px2rem(23);
          p:last-of-type{
            width: 100%;
            color: #797d82;
            font-size: px2rem(12);
            margin-top: px2rem(5);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .right{
          color: #ff5f16;
          p:last-of-type{
            margin-top: px2rem(5);
            font-size:px2rem(12);
            color: #797d82;
          }
        }
      }
    }
  }
  .changeColor{
    color: #ff5f16;
  }
}
</style>
