<template>
  <div class="film-detail">
    <div class="film-poster">
      <img :src="films.poster" alt="">
    </div>

    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <div class="goBack">
            <img @click="goBack" src="@/images/index.png" alt="">
          </div>
          <span class="name">{{ films.name }}</span>
          <span class="item">{{ films.item && films.item.name }}</span>
        </div>
        <div class="film-grade">
          <span class="grade">{{ films.grade }}</span>
          <span class="grade-text">分</span>
        </div>
      </div>

      <div class="film-category grey-text">
        {{ films.category }}
      </div>
      <div class="film-premiere-time grey-text">
        2018-12-07上映
      </div>
      <div class="film-nation-runtime grey-text">
        {{ films.nation }}  | {{ films.runtime }} 分钟
      </div>
      <div class="film-synopsis grey-text">
        {{ films.synopsis }}
      </div>
      <div class="toggle">
        <i class="iconfont icon-xiala"></i>
      </div>
    </div>
    <div class="detail-actor">
      <div class="actors-title-bar">
        <span class="actors-title-text">
          演职人员
        </span>
      </div>
      <div class="actor-img">
        <ul class="list">
          <li class="item" v-for="(item,index) in films.actors" :key="index">
            <img :src="item.avatarAddress" alt="">
            <p>{{ item.name }}</p>
            <p>{{ item.role }}</p>
          </li>
          <li class="right-item">
            <div></div>
          </li>
        </ul>
      </div>
      <div class="detail-photo">
        <div class="photos-title-bar">
          <span class="photos-title-text">
            剧照
          </span>
          <span class="photos-to-all">
            全部(6)
            <i class="iconfont " style="font-size: px2rem(12);"></i>
          </span>
        </div>
        <div class="img">
          <ul class="list">
            <li v-for="(item,index) in films.photos" :key="index" class="items">
              <img :src="item" alt="">
            </li>
            <li class="right-item">
              <div></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="goSchedule">
        选座购票
        <div class="child">
          <button @click.stop="addFilm(films)">
            <img src="@/images/timg.jpg" alt="">
          </button>
          <input type="text" disabled :value="findNum(films)">
          <button @click.stop="reduceFilm(films)">
            <img src="@/images/timg1.jpg" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'FilmDetail',
  data () {
    return {
      filmId: '',
      films: []
    }
  },
  computed: {
    ...mapState([
      'filmsCard'
    ])
  },
  methods: {
    ...mapMutations([
      'addFilm',
      'reduceFilm'
    ]),
    goBack () {
      this.$router.go(-1)
    },
    getFilms () {
      axios.get('/api/detail/list', {
        params: {
          id: this.filmId
        }
      }).then((response) => {
        let result = response.data;
        if (result.code === 0) {
          result.data.films[0].num = 0
          this.films = result.data.films[0];
        } else {
          alert(result.msg)
        }
      })
    },
    findNum (it) {
      let filmId = it.filmId;
      let num = 0;
      this.filmsCard.forEach(item => {
        if (item.filmId === filmId) {
          num = item.filmNum
        }
      });
      return num;
    }
  },
  created () {
    this.filmId = this.$route.params.filmId;
    this.getFilms()
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/common/px2rem.scss';
.film-detail {
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
  .film-poster {
    height: px2rem(210);
    img {
      width: 100%;
      height: 100%;
    }
  }
    .col {
      display: flex;
      align-items: center;
    }
    .film-name {
      flex: 1;
      display: flex;
      align-items: center;
      .goBack {
        height: px2rem(30);
        position: absolute;
        top: px2rem(2);
        left: px2rem(5);
        }
      .name {
        color: #191a1b;
        font-size: px2rem(18);
        height: px2rem(24);
        line-height: px2rem(24);
        margin-right: px2rem(8);
      }
      .item {
        font-size: px2rem(12);
        color: #fff;
        background-color: #d2d6dc;
        height: px2rem(14);
        line-height: px2rem(14);
        padding: 0 px2rem(2);
        border-radius: px2rem(2);
        display: inline-block;
      }
    }
    .film-grade {
      flex-shrink: 0;
      width: px2rem(100);
      text-align: right;
      color: #ffb232;
      font-size: px2rem(12);
      .grade {
        font-size: px2rem(18);
        font-style: italic;
      }
    }
    .grey-text {
      font-size: px2rem(14);
      color: #000;
      opacity: .5;
      margin-top: px2rem(6);
    }
    .film-synopsis {
      margin-top: px2rem(12);
      height: px2rem(38)!important;
      overflow: hidden;
    }
    .toggle {
      text-align: center;
      &.hide {
        i {
          transform: translate(180deg);
        }
      }
    }

}
.detail-actor{
    border-top: px2rem(10) solid #eee;
  .actors-title-bar {
    width: 100%;
    padding: px2rem(15);
    .actors-title-text {
    font-size: px2rem(16);
    text-align: left;
    color: #191a1b;
    }
  }
  .actor-img{
    width: 100%;
    .list{
      padding: 0 px2rem(20) 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow: auto;
      .item{
        margin-right: px2rem(10);
        img{
        width: px2rem(85);
        height: px2rem(85);
        }
        p{
          padding-top: px2rem(10);
          font-size: px2rem(12);
        }
        p:last-of-type{
          color: #797d82;
        }
      }
      .right-item{
        div{
          width: px2rem(15)
        }
      }
    }
  }
  .detail-photo{
    border-top: px2rem(10) solid #eee;
    .photos-title-bar{
      height: px2rem(62);
      width: 100%;
      padding: px2rem(15);
      .photos-title-text{
        font-size: px2rem(16);
        text-align: left;
        color: #191a1b;
      }
      .photos-to-all{
        font-size: px2rem(13);
        color: #797d82;
        float: right;
      }
    }
    .img{
      overflow-x: auto;
      overflow-y: hidden;
      padding: px2rem(8) 0 px2rem(20);
      .list{
        padding: 0 px2rem(20) 0;
        display: flex;
        flex-direction:row;
        width: 100%;
        overflow: auto;
        .items{
          margin-right: px2rem(10);
          img{
            width: px2rem(150);
            height: px2rem(100);
          }
        }
        .right-item{
          div{
          width: px2rem(15)
          }
        }
      }
    }
  }
  .goSchedule{
    height: px2rem(49);
    border-top: px2rem(10) solid #eee;
    padding-top: px2rem(10);
    text-align: center;
    font-size: px2rem(20);
    .child{
      font-size: pxrem(30);
      button{
        font-size: pxrem(20);
        display: relative;
        img{
          display: absolute;
          left: 0;
          top: 0;
          width: px2rem(30);
        }
      }
      input{
        height: px2rem(30);
        width: 70%;
        text-align: center;
        font-size: px2rem(30)
      }
    }
  }
}
</style>
