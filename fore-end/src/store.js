// 引入vue
import Vue from 'vue';
// 引入vuex
import Vuex from 'vuex';

Vue.use(Vuex);

// 实例化 store 对象
const store = new Vuex.Store({
  state: {
    filmsCard: localStorage.getItem('filmsCard') ? JSON.parse(localStorage.getItem('filmsCard')) : [],
    city: [],
    cityname: '',
    loveArea: '',
    love: [],
    myLove: '',
    searchCinema: ''
  },
  // 类似计算属性
  getter: {

  },
  // 修改数据
  mutations: {
    // 添加电影
    addFilm (state, payload) {
      let filmId = payload.filmId;
      let index = -1;
      let isZai = state.filmsCard.some((item, i) => {
        if (item.filmId === filmId) {
          index = i;
          return true;
        }
        return false;
      });
      if (isZai) {
        state.filmsCard[index].filmNum++
      } else {
        state.filmsCard.push({
          filmId: payload.filmId,
          filmName: payload.name,
          filmPrice: parseInt(Math.random(10, 20) * 100),
          filmNum: 1
        })
      }
      console.log(JSON.stringify(state.filmsCard))
      localStorage.setItem('filmsCard', JSON.stringify(state.filmsCard))
    },
    // 删除电影
    reduceFilm (state, payload) {
      let filmId = payload.filmId;
      let index = -1;
      state.filmsCard.forEach((item, i) => {
        if (item.filmId === filmId) {
          index = i
        }
      });
      console.log(index)
      if (index !== -1) {
        let film = state.filmsCard[index]
        if (film.filmNum > 1) {
          film.filmNum--
        } else {
          state.filmsCard.splice(index, 1);
        }
      }
      localStorage.setItem('filmsCard', JSON.stringify(state.filmsCard))
    },
    searchCity (state, payload) {
      state.city = payload
    },
    choiceCity (state, payload) {
      console.log(payload)
      state.city.map((item) => {
        if (item.cityId === payload) {
          state.cityname = item.name;
          console.log(state.cityname)
        }
      })
    },
    lovecity (state, payload) {
      state.loveArea = payload
    },
    knowCity (state, payload) {
      console.log(payload)
      state.love = [];
      state.myLove.map((item) => {
        if (item.districtName === payload) {
          state.love.push(item)
        }
      })
      state.loveArea = state.love
    },
    myLoveCity (state, payload) {
      state.myLove = payload;
    }
  },
  // 异步
  actions: {

  },
  // 拆分store
  modules: {

  }
})
// 暴露实例对象
export default store;
