import ruleComponents from "./rules/items";
import RuleSettingItemTemplate from "./rules/RuleSettingItemTemplate"

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
        case "rule":
            registerViews(ruleComponents);
            Vue.component("ItemTemplate", RuleSettingItemTemplate);
            break;
        case "control":
            //registerViews(import("./controls/items/index"));
            break;
        default:
            break;
    }
}

export default loader;