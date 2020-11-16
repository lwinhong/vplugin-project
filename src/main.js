// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ViewUI from "view-design";
import 'view-design/dist/styles/iview.css';
import store from './store';
import editorUtil from "./libs/editorUtil";

Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  console.error(arguments)
}
Vue.prototype.$editorUtil = editorUtil;

import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState } = createNamespacedHelpers("ruleEditorStore");
const qs = editorUtil.getQueryString();
const editorType = qs.editorType || "rule";

import viewLoader from "./components/viewLoader";
viewLoader.loadItemViews(editorType);

//import router from './router'
//import test from "./test/test";
import App from './App';
const app = new Vue({
  el: '#app',
  store,
  //router,
  components: { App },
  template: '<App ref="app"></App>',
  methods: {
    ...mapActions(["setRuleMetaDataAction", "setAllDoneAction", "setEditorTypeAction"]),
    save() {
      return this.$refs.app.save();
    },
    validate(showMsg) {
      return this.$refs.app.validate(showMsg);
    }
  },
  computed: {
    ...mapState(["ruleMetaData", "ruleUserLastData"]),
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("mounted")
    setTimeout(() => {
      //_onLoad(test.metaData, test.userData);
      if (window.vPlugin) {
        window.vPlugin.execute("appMounted");
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
  let metaData = JSON.parse(data.metaData);
  let userData = JSON.parse(data.userData);
  //let context = JSON.parse(data.context);

  console.log(metaData)
  _onLoad(metaData, userData);
}

/**
 * 加载(私有)
 * @param {元数据} metaData 
 * @param {用户数据（保存数据）} userData 
 * @param {插件上下文} context 
 */
const _onLoad = (metaData, userData, context) => {

  app.setEditorTypeAction(editorType)
  let init = () => {
    let editorMeta = null;
    if (metaData && metaData.configuration)
      editorMeta = metaData.configuration.properties;
    if (!editorMeta)
      editorMeta = {};
    try {
      editorUtil.mergeData(editorMeta, userData)
      app.setRuleMetaDataAction(editorMeta);

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

export {
  onLoad, save, validate
}
