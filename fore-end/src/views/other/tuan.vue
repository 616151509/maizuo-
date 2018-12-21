<template>
  <div class="tuan-list">
    <div class="tuan-list">
      <ul class="list">
        <li class="item" v-for="(item,index) in shop" :key="index">
          <div class="timg">
            <img
              :src="item.activeBannerUrl"
              alt
            >
          </div>
          <div class="tbot">
            <div class="top"><span>{{item.masterTitle}}</span></div>
            <div
              class="center"
            >{{ item.slaveTitle }}</div>
            <div class="bto">
              <div class="left">
                <div class="lele">
                  <span class="now">￥{{ item.price/100 }}</span>
                  <span class="old">原价{{ item.marketPrice/100 }}</span>
                </div>
                <div class="riri">
                  <i class="icon" v-for="(it,index) in item.userList" :key="index">
                    <img :src="it.icon" alt="">
                  </i>
                </div>
              </div>
              <div class="right">
                <div class="cen">去拼单</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'tuan',
  data () {
    return {
      shop: []
    };
  },
  methods: {
    getShop () {
      axios.get('../../static/api/ss.json').then(response => {
        var list = response.data.data.list;
        if (response.data.status === 0) {
          this.shop = list;
        }
      });
    }
  },
  created () {
    this.getShop();
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/px2rem.scss";
.tuan-list {
  flex: 1;
  width: 100%;
  .list{
    .item{
      border-bottom:px2rem(10) solid #eee;
      .timg {
    img {
      width: 100%;
    }
  }
  .tbot {
    min-height: px2rem(85);
    margin: px2rem(15);
    margin-bottom: 0;
    .top{
      font-size: px2rem(15);
      height: px2rem(21);
      line-height: px2rem(21);
      color: #191a1b;
    }
    .center {
      margin-top: px2rem(3);
      overflow: hidden;
      max-height: px2rem(58);
      margin-bottom: px2rem(7);
      word-wrap: break-word;
      font-size: px2rem(13);
      color: #797d82;
      span{
        height: px2rem(19);
        line-height: px2rem(19);
      }
    }
    .bto {
      height: px2rem(33);
      .left {
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 72%;
        .lele{
          .now{
            line-height: px2rem(38);
            font-size: px2rem(20);
            color: #c03131;
          }
          .old{
            margin-left: px2rem(3);
            font-size: px2rem(11);
            text-decoration: line-through;
            color: #bdc0c5;
          }
        }
        .riri{
          display: flex;
          .icon{
            display: block;
            overflow: hidden;
            width: px2rem(30);
            height: px2rem(30);
            border-radius: px2rem(23);
            box-sizing: content-box;
            img{
              width: px2rem(30);
              height: px2rem(30);
            }
          }
          .icon:last-of-type{
            margin-left:- px2rem(10);
            z-index: -2;
          }
        }
      }
      .right {
        float: right;
        .cen {
          width: px2rem(90);
          height: px2rem(33);
          font-size: px2rem(12);
          background-color: #c03131;
          color: #fff;
          border-radius: 3px;
          text-align: center;
          line-height: px2rem(33);
        }
      }
    }
  }
    }
  }
}
</style>
