<template>
  <div class="search">
    <div class="toop">
      <div class="left">
        <span>*</span>
        <input type="text" placeholder="输入影城名称" class="search-input" v-model="searchCinema">
      </div>
      <div class="right">
        取消
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'searchCinema'
    ])
  },
  methods: {
    cancle () {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";
.search {
  position: fixed;
  background: #fff;
  z-index: 56;
  width: 100%;
  height: 100%;
  .toop{
    display: flex;
    height: px2rem(49);
    border-bottom: px2rem(1) solid #eee;
    padding: px2rem(10) px2rem(15);
    .left{
      width: 70%;
      position: relative;
      span{
        position:absolute;
        left: px2rem(5);
        top: px2rem(5);
        font-size: px2rem(30);
      }
      .search-input{
        outline: none;
        width: 100%;
        height: 100%;
        font-size: px2rem(12);
        padding-left:px2rem(30);
        border:0;
        background: #eee;
        color: green;
      }
    }
    .right{
      flex:1;
      padding-right: px2rem(15);
      text-align: right;
      line-height: px2rem(29);
      font-size: px2rem(14);
    }
  }
}
</style>
