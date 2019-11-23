import Vuex from 'vuex'
import {
  Message
} from 'element-ui'
import _ from 'lodash'
import request from '../plugins/axios'


const store = () => new Vuex.Store({
  state: {
    user_info: null,
    settings: null,
    setting: [],
    banners: [],
    informations: [],
    helpList:[],
    content: '',
    categoryList: [],
    orderList: [],
    currentCategoryId: 1,
    aboutus:'',
    orderTypes: [{
      id: 1,
      name: '待确认'
    }, {
      id: 2,
      name: '服务中'
    }, {
      id: 3,
      name: '待付款'
    }, {
      id: 4,
      name: '已付款'
    }, {
      id: 5,
      name: '服务完成'
    }, {
      id: 9,
      name: '关闭'
    }],
  },
  getters: {
    is_login: state => state.user_info !== null,
    recommandList: state => state.categoryList.filter(item => item.is_recommend === 1),
    getName: state => type => {
      return state.setting.length > 0 ?
        state.setting.find(i => i.config_code === type) ?
          state.setting.find(i => i.config_code === type).config_value ||
          state.setting.find(i => i.config_code === type).config_img :
          '' :
        ''
    },
    getList: state => type => {
      return state.setting.length > 0 ?
        state.setting.find(i => i.code === type) ?
          state.setting.filter(
            item =>
              item.parent_id === state.setting.find(i => i.code === type).id
          ) : [] : []
    },
    filterOrderList: (state, getters) => order_status_id => {
      const result = state.orderList.filter(item => item.order_status === order_status_id)
      return result
    },
    typeOrderList: (state, getters) => {
      return state.orderTypes.map(item => {
        return {
          ...item,
          loadingType: 'noMore',
          orderList: getters.filterOrderList(item.id)
        }
      })
    },
    orderDetailById: (state, getters) => order_id => {
      return state.orderList.find(item => item.order_id === order_id)
    }
  },
  mutations: {
    logout(state){
      state.user_info=null
      localStorage.removeItem('token')
    },
    setData(state, obj) {
      Object.keys(obj).forEach(item => {
        state[item] = obj[item]
      })
    },
  },
  actions: {
    async nuxtServerInit ({dispatch}, { params, route, req }) {
      console.log('nuxtServerInit')
    },
    async asyncFetchOrder({
      state,
      dispatch
    }, order_id) {
      if (!state.user_info) return
      await dispatch('initMyOrder')
      return state.orderList.find(item => item.order_id === order_id)
    },
    async asyncWeixinScan({
      state
    }, payLoad) {
      if (!state.user_info) return
      const result = await request('order_pay', payLoad, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      return result
    },
    async asyncAddOrder({
      state,
      commit,
      dispatch,
      rootState
    }, postData) {
      if (!state.user_info) return

      let { order_id } = await request('order_add', postData)
      console.log('order_id', order_id)
      await dispatch('initMyOrder')
      return Promise.resolve(order_id)
    },
    async asyncGetOrderInput({ }, payLoad) {
      return await request('order_input', payLoad)
    },
    async asyncFetchGood({
      commit
    }, payLoad) {
      return await request('product_find', payLoad)
    },
    async initSetting({
      commit
    }) {
      const setting = await request('config_select')
      commit('setData', {
        setting
      })
    },
    async initHelp({
      commit
    }){
      const helpList = await request('helper_directory')
      commit('setData',{
        helpList
      })
    },
    async initInformation({
      commit
    }) {
      const informations = await request('information_select')
      commit('setData', {
        informations
      })
    },
    async initBanner({
      commit
    }) {
      const banners = await request('banner_select')
      commit('setData', {
        banners
      })
    },
    async initAboutUs({
      commit
    }) {
      const {
        content
      } = await request('about_us')
      commit('setData', {
        aboutus: content
      })
    },
    async asyncFetchCategory({
      state,
      commit,
      rootState,
      dispatch,
      getters
    }) {
      const categoryList = await request('product_service')
      commit('setData', {
        categoryList,
        currentCategoryId: categoryList[0].service_id
      })
    },
    async asyncLogin({
      commit,
      dispatch
    }, {
      member_account,
      password
    }) {
      const {
        token,
        user
      } = await request('member_login', {
        member_account,
        password
      })
      localStorage.setItem('token', token);
      commit('setData', {
        user_info: user,
      })
      dispatch('initMyOrder')
      dispatch('initSetting')
      dispatch('asyncFetchCategory')
      dispatch('initBanner')
    },
    async asyncCheckLogin({
      state,
      commit,
      dispatch
    }) {
      try{
        const {
          token,
          user
        } = await request('member_check_login')
        localStorage.setItem('token', token);
        commit('setData', {
          user_info: user,
        })
        dispatch('initMyOrder')
        dispatch('initSetting')
        dispatch('asyncFetchCategory')
        dispatch('initBanner')
        return Promise.resolve()
      }catch(e){
        return Promise.reject()
      }
      
    },
    async asyncSendMessage({
      commit
    }, payLoad) {
      await request('member_send_code', payLoad)
    },
    async asyncRegister({
      commit,
      dispatch
    }, payLoad) {
      const {
        token,
        user
      } = await request('member_register', {
        ...payLoad,
        phone: payLoad.mobile
      })
      localStorage.setItem('token', token);
      commit('setData', {
        token,
        user_info: user
      })
    },
    async initMyOrder({
      commit,
      state,
    }) {
      if (!state.user_info) {
        commit('setData', {
          orderList: []
        })
        return;
      }
      const orderList = await request('order_select', {
        member_id: state.user_info.member_id
      })
      commit('setData', {
        orderList
      })

    },
    async asyncCancelOrder({
      state,
      commit,
      dispatch,
      rootState
    }, orderItem) {
      if (!state.user_info) return
      await request('order_update_status', orderItem)
      await dispatch('initMyOrder')
    },
  }

})


export default store
