<template>
  <div class="city" ref="content">
        <div class="cityNow">
            当前城市 - {{cityname}}
            <p @click="cancel">╳</p>
        </div>
        <div class="citySearch">
            <div class="secrchIcon">
                <i class="cityBlo">
                    *
                </i>
                <input class="cityInput" type="text" placeholder="请输入城市名或拼音">
            </div>
        </div>
        <div class="cityChina">
            <div>
            <div class="cityMenu">
                <div class="asideMenu">
                    <p v-for="(val, key) in city" :key="key" :href="val.key"  @click="lookCity(key)" ref="list">
                        {{val.key}}
                    </p>
                </div>
            </div>
            <div class="recommenCity">
                <div class="locationCity">
                    <p class="locaCity">
                        GPS定位你所在的城市
                    </p>
                    <div class="location">
                        <div class="">
                            <p>定位失败</p>
                        </div>
                    </div>
                </div>
                <div class="hotCity">
                    <p class="hotLoca">
                        热门城市
                    </p>
                    <ul class="hotTion">
                        <li class="hotItem" v-for="(item,index) in hot" :key="index"  @click="choiceCity(item.cityId)">
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
                <li  class="cityList" v-for="(val, key) in city" :key="key" ref="list">
                    <p class="cityNumber">{{val.key}}</p>
                    <ul class="citySort">
                        <li class="item"  v-for="(item, index) in val.value" :key="index"  @click="choiceCity(item.cityId)">
                            {{item.name}}
                        </li>
                    </ul>
                </li>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'city',
  data () {
    return {
      city: [],
      hot: [],
      choice: ''
    }
  },
  computed: {
    ...mapState([
      'cityname'
    ])
  },
  methods: {
    ...mapMutations([
      'choiceCity'
    ]),
    getCity () {
      axios.get('api/city/list').then(response => {
        var cityAll = response.data.data.films;
        this.$store.commit('searchCity', cityAll)
        if (response.data.code === 0) {
          let cityMap = {};
          let cityHot = [];
          cityAll.map((item) => {
            // 取得首字母
            let letter = item.pinyin[0].toUpperCase();
            if (!cityMap[letter]) {
              cityMap[letter] = [];
            }
            cityMap[letter].push(item);
            if (item.isHot === 1) {
              cityHot.push(item)
            }
          })
          this.hot = cityHot;
          // 排序
          let keys = Object.keys(cityMap)
          for (let i = 0; i < keys.length; i++) {
            for (let j = i + 1; j < keys.length; j++) {
              if (keys[i] > keys[j]) {
                let tmp = keys[i];
                keys[i] = keys[j];
                keys[j] = tmp;
              }
            }
          }
          // 组装数据
          let newData = keys.map(letter => {
            return {
              key: letter,
              value: cityMap[letter]
            }
          })
          this.city = newData;
        }
      })
    },
    cancel () {
      this.$router.go(-1);
    },
    lookCity (index) {}
  },
  created () {
    this.getCity();
  }
}
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";
.city{
        width: 100%;
        height: 100%;
        .cityNow{
            width: 100%;
            height: px2rem(44);
            text-align: center;
            position: relative;
            line-height: px2rem(44);
            font-size: px2rem(17);
            color: #191a1b;
            position: fixed;
            left: 0;
            top: 0;
            background: #fff;
            z-index: 2334;
            p{
                font-size: px2rem(28);
                color: #191a1b;;
                position: absolute;
                left: px2rem(15);
                top: px2rem(0);
            }
        }
        .citySearch{
            position: fixed;
            left: 0;
            top: px2rem(44);
            // background: #fff;
            width: 100%;
            z-index: 23334;
            height: px2rem(49);
            padding: px2rem(9.5) px2rem(15);
            background: #f4f4f4;
            .secrchIcon{
                border-radius: px2rem(2);
                background: #fff;
                width: 100%;
                height: 100%;
                text-align: center;
                position: relative;
                .cityInput{
                    position: absolute;
                    top: 0;
                    left: px2rem(33.5);
                    height: px2rem(30);
                    width: px2rem(280);
                    border-width: 0;
                    font-size: px2rem(12);
                    opacity: 0.5;
                }
                .cityBlo{
                    font-size: px2rem(20);
                    position: absolute;
                    line-height: px2rem(30);
                    left: px2rem(7);
                }
            }
        }
        .cityChina{
            padding-top: px2rem(89);
            margin-right: px2rem(17);
            overflow: auto;
            .cityMenu{
                width: px2rem(17);
                position: fixed;
                right: 0;
                height: 100%;
                .asideMenu{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    margin-top: px2rem(75);
                    font-size: px2rem(12);
                    color: #191a1b;
                    p{
                        margin-top: px2rem(8);
                        text-align: center
                    }
                }
            }
            .recommenCity{
                padding: px2rem(15) 0 0 0;
                .locationCity{
                    padding-left:px2rem(15);
                    .locaCity{
                        font-size: px2rem(13);
                        color: #797d82;
                        margin-bottom: px2rem(10);
                    }
                    .location{
                            width: calc(100%/3);
                            p{
                                text-align: center;
                                height: px2rem(30);
                                background-color: #f4f4f4;
                                line-height: px2rem(30);
                                border-radius: px2rem(3);
                                margin: 0 px2rem(7.5);
                                font-size: px2rem(14);
                                color: #191a1b;
                                flex-wrap:wrap;
                            }

                        padding-bottom: px2rem(15);
                    }
                }
                .hotCity{
                    padding-left:px2rem(15);
                    .hotLoca{
                        font-size: px2rem(13);
                        color: #797d82;
                        margin-bottom: px2rem(10);
                    }
                    .hotTion{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        .hotItem{
                            padding-bottom: px2rem(15);
                            width: calc((100%-px2rem(33))/3);
                            p{

                                text-align: center;
                                height: px2rem(30);
                                background-color: #f4f4f4;
                                line-height: px2rem(30);
                                border-radius: px2rem(3);
                                margin: 0 px2rem(7.5);
                                font-size: px2rem(14);
                                color: #191a1b;
                            }
                        }
                    }
                }
                .cityList{
                    .cityNumber{
                        background-color: #f4f4f4;
                        color: #797d82;
                        height: px2rem(30);
                        line-height: px2rem(30);
                        font-size: px2rem(12);
                        padding-left: px2rem(15);
                    }
                    .citySort{
                        padding-left: px2rem(15);
                        display: flex;
                        flex-direction: row;
                        flex: 1;
                        flex-wrap: wrap;
                        color: #191a1b;
                        .item{
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            border-bottom: px2rem(1) solid #ededed;
                            width: calc(100% / 3);
                            height: px2rem(48);
                            text-align: center;
                            line-height: px2rem(48);
                            font-size: px2rem(14);
                        }
                    }
                }
            }
        }
    }
</style>
