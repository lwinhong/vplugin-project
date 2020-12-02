const state = {
    userDataChanged: false,
    ruleMetaData: {},//元数据
    ruleEditorData: {},
    ruleUserLastData: {},//用户上一次配置的数据
    currentItemIndex: -1,
    editorType: "", // rule/control/fuction
    allDone: false, //是否加载完成
    allDestDetails: null
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
    },
    getDestDetails(state, rootState) {
        let items = state.allDestDetails;
        let returnValue = [];
        if (items) {
            for (const key in items) {
                if (items.hasOwnProperty(key)) {
                    const item = items[key];
                    returnValue.push({ name: item.text, value: key, details: item.value });
                }
            }
        }
        return returnValue;
    },
    getInputMetaInfo:(state, getters)=>(metaCode)=>{
       return getters.getMetaInfo("inputs",metaCode);
    },
    getOutputMetaInfo:(state,getters)=>(metaCode)=>{
        return getters.getMetaInfo("outputs",metaCode);
     },
    getMetaInfo: (state) => (inputOutputKey, metaCode) => {
        let items = state.ruleMetaData.metaData;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                if (element.metaProperty == inputOutputKey) {
                    let metaValueObjetct = element.metaValue;
                    for (let x = 0; x < metaValueObjetct.length; x++) {
                        const codeInfo = metaValueObjetct[x];
                        if (codeInfo.code == metaCode) {

                            return codeInfo;
                        }
                    }

                }
            }
        }
    },

}

const mutations = {
    setUserDataChanged(state, value) {
        state.userDataChanged = value;
    },
    setRuleMetaData(state, value) {
        state.ruleMetaData = value;
    },
    setRuleEditorData(state, value) {
        state.ruleEditorData = value;
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
    },
    setAllDestDetails(state, value) {
        state.allDestDetails = value;
    }
}

const actions = {
    setRuleEditorDataAction({ commit }, value) {
        commit('setRuleEditorData', value)
    },
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
    setAllDestDetailsAction({ commit }, value) {
        commit('setAllDestDetails', value)
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