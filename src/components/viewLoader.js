import ruleComponents from "./rules/items";
import ItemTemplate from "./rules/ItemTemplate"

let loader = {};
loader.install = function (Vue, options) {
    function registerViews(components) {
        for (const key in components) {
            if (components.hasOwnProperty(key)) {
                Vue.component(key, components[key].default);
            }
        }
    }
    switch (this.editorType) {
        case "rule"://注册规则要用的vue组件
            registerViews(ruleComponents);
            Vue.component("ItemTemplate", ItemTemplate);
            break;
        case "control":
            //registerViews(import("./controls/items/index"));
            break;
        default:
            break;
    }
}

export default loader;