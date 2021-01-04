import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

import { actions } from "./actions"
import { mutations, state, getters } from "./mutations"
import comments from "./modules/comments"
import index from "./modules/index"

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        comments,
        index
    }
})