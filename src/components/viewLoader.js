//import Vue from "vue";
//存动态的，暂时先不这样做
// const loadItemViewsAsync = function (editorType, callBack) {
//     let currentComponents = {};
//     const _this = this;
//     function registerViews(p) {
//         p.then(result => {
//             let components = result.default;
//             for (const key in components) {
//                 if (components.hasOwnProperty(key)) {
//                     Vue.component(key, components[key]);
//                 }
//             }
//         }).catch(error => {
//             console.error(error)
//         }).finally(() => {
//             callBack(_this.currentComponents);
//         });
//     }
//     switch (editorType) {
//         case "rule":
//             registerViews(import("./rules/items/index"));
//             break;
//         case "control":
//             registerViews(import("./controls/items/index"));
//             break;
//         default:
//             callBack(_this.currentComponents);
//             break;
//     }
// }

import ruleComponents from "./rules/items";
import Vue from "vue";

const loadItemViews = function (editorType) {
    
    function registerViews(components) {
        for (const key in components) {
            if (components.hasOwnProperty(key)) {
                Vue.component(key, components[key].default);
            }
        }
    }
    switch (editorType) {
        case "rule":
            registerViews(ruleComponents);
            break;
        case "control":
            //registerViews(import("./controls/items/index"));
            break;
        default:
            
            break;
    }
}

export default {
    loadItemViews
}

