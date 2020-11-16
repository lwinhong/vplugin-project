import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import modules from './modules'

export default new Vuex.Store({
    modules,
    // state,
    // mutations,
    // actions,
    strict: process.env.NODE_ENV !== 'production'
})
