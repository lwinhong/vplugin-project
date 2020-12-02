import Vue from 'vue';
import ViewUI from "view-design";
import 'view-design/dist/styles/iview.css';
import store from './store';
import editorUtil from "./libs/editorUtil";
import viewLoader from "./components/viewLoader";
// import VModal from 'vue-js-modal';

// Vue.use(VModal, {
//   dialog: true,
//   dynamicDefaults: {
//     draggable: true
//   }
// });
Vue.use(ViewUI);
Vue.config.productionTip = false
// Vue.config.errorHandler = (err, vm, info) => console.error(arguments);

Vue.prototype.$editorUtil = editorUtil;

const editorType = editorUtil.getEditorType();
Vue.prototype.$editorType = editorType;
viewLoader.editorType = editorType;
Vue.use(viewLoader);

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("ruleEditorStore");

import test from "./test/test";
import App from './App';
const app = new Vue({
  el: '#app',
  store,
  //router,
  components: { App },
  template: '<App ref="app"></App>',
  methods: {
    ...mapActions(["setRuleMetaDataAction", "setAllDoneAction",
      "setEditorTypeAction", "setAllDestDetailsAction", "setRuleEditorDataAction"]),
    save() {
      return this.$refs.app.save();
    },
    validate(showMsg) {
      return this.$refs.app.validate(showMsg);
    }
  },
  // computed: {
  //   ...mapState(["ruleMetaData", "ruleUserLastData"]),
  // },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("mounted")
    setTimeout(() => {
      if (window.vPlugin) {
        window.vPlugin.execute("appMounted");
      } else {
        _onLoad(test.contribution, test.newMetaData, test.userData);
        if (test.dests) {
          app.setAllDestDetailsAction(test.dests);
        }

      }
    }, 100);
  }
})

/**
 * 加载
 * @param {元数据} metaData 
 * @param {用户数据（保存数据）} userData 
 * @param {插件上下文} context 
 */
const onLoad = function (data) {
  let contribution = data.contribution ? JSON.parse(data.contribution) : {};
  let metaData = data.metaData ? JSON.parse(data.metaData) : {};
  let userData = data.userData ? JSON.parse(data.userData) : {};
  //let context = JSON.parse(data.context);

  console.log(metaData)
  _onLoad(contribution, metaData, userData);

}

/**
 * 加载(私有)
 * @param {元数据} metaData 
 * @param {用户数据（保存数据）} userData 
 * @param {插件上下文} context 
 */
const _onLoad = (contribution, metaData, userData, context) => {
  app.setEditorTypeAction(editorType)
  let init = async () => {
    let editorMeta = null;
    if (contribution && contribution.vpluginRule)
      editorMeta = contribution.vpluginRule;
    if (!editorMeta)
      editorMeta = {};
    try {
      editorUtil.mergeData(editorMeta, contribution, metaData, userData)
      app.setRuleMetaDataAction(metaData);
      app.setRuleEditorDataAction(editorMeta);
      // if (editorMeta.outputs) {
      //   let dest = await editorUtil.loadDestDetails();
      //   debugger
      //   if (dest)
      //     app.setAllDestDetailsAction(dest);
      // }

      console.log("allDone")
      if (window.vPlugin)
        window.vPlugin.execute("allDone");

    } catch (error) {
      console.error(error);
    } finally {
      app.setAllDoneAction(true);
    }
  }

  init();
}

/**
* 保存数据
*/
const save = () => {
  const result = app.save();
  let resultJson = JSON.stringify(result);
  return resultJson;
}

/**
* 数据校验
*/
const validate = (showMsg) => {
  //数据格式[{editorKey:'错误信息'}] 或者 "", ""标识检查通过
  const result = app.validate(showMsg);
  if (result && result.length > 0) {
    let resultJson = JSON.stringify(result);
    return resultJson;
  }
  return "";
}

const getSaveData = () => {
  return save();
}

export {
  onLoad, save, validate, getSaveData
}
