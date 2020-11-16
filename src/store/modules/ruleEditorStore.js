const state = {
    userDataChanged: false,
    ruleMetaData: {},//元数据
    ruleUserLastData: {},//用户上一次配置的数据
    currentItemIndex: -1,
    editorType: "", // rule/control/fuction
    allDone: false //是否加载完成
}

const getters = {
    getUserDataChanged(state, rootState) {
        return state.userDataChanged
    },
    getRuleMetaData(state, rootState) {
        return state.ruleMetaData
    },
    getRuleUserLastData(state, rootState) {
        return state.ruleUserLastData
    }
}

const mutations = {
    setUserDataChanged(state, value) {
        state.userDataChanged = value;
    },
    setRuleMetaData(state, value) {
        state.ruleMetaData = value;
    },
    setRuleUserLastData(state, value) {
        state.ruleUserLastData = value;
    },
    setCurrentItemIndex(state, value) {
        state.currentItemIndex = value;
    },
    setEditorType(state, value) {
        state.editorType = value;
    }, 
    setAllDone(state, value) {
        state.allDone = value;
    }
}

const actions = {
    setRuleMetaDataAction({ commit }, value) {
        commit('setRuleMetaData', value)
    },
    setRuleUserLastDataAction({ commit }, value) {
        commit('setRuleUserLastData', value)
    },
    setUserDataChangedAction({ commit }, value) {
        commit('setUserDataChanged', value)
    },
    setCurrentItemIndexAction({ commit }, value) {
        commit('setCurrentItemIndex', value)
    },
    setEditorTypeAction({ commit }, value) {
        commit('setEditorType', value)
    },
    setAllDoneAction({ commit }, value) {
        commit('setAllDone', value)
    },
}


const codeEditorStore = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

export default codeEditorStore