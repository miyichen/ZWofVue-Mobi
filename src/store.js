import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let uid = localStorage.getItem('uid')
let newmsg = localStorage.getItem('isNewmsg')
const store = new Vuex.Store({
  state:{
    sUserId:uid,
    sUserName:'',
    sUserGroup:'',
    sTaskNum:0,
    sNewMsg:true,
  },
  mutations:{
    setUid(state, n) {
      state.sUserId = n
      localStorage.setItem('uid',state.sUserId)
    },
    setTaskNum(state, n) {
      state.sTaskNum = n
    }
  }
})

export default store
