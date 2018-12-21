<template>
  <!-- list -->
    <div class="film-list-content">
      <ul>
        <li
          v-for="(item,index) in films"
          :key="index"
          @click="goDetail(item.filmId)">
          <div class="img">
            <img :src="item.poster" alt="">
          </div>
          <div class="info">
            <div>
              <span class="name">{{ item.name }}</span>
              <span class="type">{{ item.filmType.name }}</span>
            </div>
            <div>
              <span class="label">观众评分</span>
              <span class="grade">{{ item.grade }}</span>
            </div>
            <div>
              <span class="label">主演： {{ actorsList(item.actors) }}</span>
            </div>
            <div>
              <span class="label">{{ item.nation }} | {{ item.runtime }}分钟</span>
            </div>
          </div>
          <div class="buy">预约</div>
        </li>
      </ul>
      <div class="load-more" @click="loadMore">{{ loadMoreText }}</div>
    </div>
    <!-- /list -->
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      films: [],
      loadMoreText: '点击，加载下一页',
      pageNum: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  methods: {
    getFilms () {
      axios.get('/api/film/list', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          type: 2
        }
      }).then((response) => {
        let result = response.data;
        // 总页数
        this.totalPage = Math.ceil(result.data.total / this.pageSize);
        // 达到最大页数改变loadMoreText
        if (this.pageNum >= this.totalPage) {
          this.loadMoreText = ' 没有更多了朋友 ';
        }
        if (result.code === 0) {
          this.films = this.films.concat(result.data.films);
        } else {
          alert(result.msg)
        }
      })
    },
    actorsList (list) {
      let arr = [];
      if (list) {
        arr = list.map(item => {
          return item.name
        })
      }
      return arr.join(' ')
    },
    /**
     * 加载更多
     */
    loadMore () {
      // 对当前页码加1
      if (this.pageNum < this.totalPage) {
        this.pageNum++;
        this.getFilms();
      }
    },
    goDetail (id) {
      this.$router.push({
        name: 'filmDetail',
        params: {
          filmId: id
        }
      })
    }
  },
  created () {
    this.getFilms();
  }
}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';
.film-list-content {
  li {
    display: flex;
    margin: 0 px2rem(15);
    padding: px2rem(15) 0;
    border-bottom: px2rem(1) solid #ededed;
  }

  .img {
    flex-shrink: 0;
    width: px2rem(66);
    height: px2rem(94);
    img {
      width: 100%;
    }
  }

  .info {
    min-width: 100px;
    padding: 0 px2rem(10);
    font-size: px2rem(14);
    &>div {
      width: 100%;
      height: px2rem(22);
      line-height: px2rem(22);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      color: #797d82;
      margin-right: px2rem(2);
    }
    .name {
      font-size: px2rem(16);
      color: #191a1b;
    }
    .type {
      font-size: px2rem(12);
      color: #fff;
      background: #d2d6dc;
      padding: 0 px2rem(2);
    }
    .grade {
      color: #ffb232;
    }
  }

  .buy {
    flex-shrink: 0;
    align-self: center;
    width: px2rem(50);
    height: px2rem(26);
    line-height: px2rem(26);
    font-size: px2rem(14);
    color: #ff5f16;
    border: px2rem(1) solid #ff5f16;
    text-align: center;
    border-radius: px2rem(4);
  }
  .load-more {
  height: px2rem(30);
  line-height: px2rem(30);
  text-align: center;
  font-size: px2rem(20);
  }
}
</style>
