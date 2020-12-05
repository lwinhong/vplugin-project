import util from "../libs/util";

let editorUtil = {};

/**
 * 获取url的参数
 * @returns {} 
 */
editorUtil.getQueryString = function () {
    var qs = location.search.substr(1), // 获取url中"?"符后的字串  
        args = {}, // 保存参数数据的对象
        items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
        item,
        len = items.length

    for (var i = 0; i < len; i++) {
        item = items[i].split("=")
        var name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1])
        if (name) {
            args[name] = value
        }
    }
    return args
}

/**
 * 获取编辑器类型（从url的 get 参数中获取）
 */
editorUtil.getEditorType = () => {
    const qs = editorUtil.getQueryString();
    return qs.editorType || "rule";
}

/**
 * 获取目标对象的第一个子对象的key
 * @param {目标对象} obj 
 */
editorUtil.getObjectFirstKey = function (obj) {
    return util.getObjectFirstKey(obj);
}

/**
 * 获取目标对象的第一个子对象
 * @param {目标对象} obj 
 */
editorUtil.getObjectFirstObj = function (obj) {
    const key = util.getObjectFirstKey(obj);
    if (key)
        return obj[key];
    return null;
}

/**
 * item是否使用长文本类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsTextEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "text" && !obj.editor;
    }
    return false;
}

/**
 * item是否使用文本类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsCharEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "char" && !obj.editor;
    }
    return false;
}

/**
 * item是否使用布尔类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsBooleanEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "boolean" && !obj.editor;
    }
    return false;
}

/**
 * item是否使用日期类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsDateEditor = function (obj) {
    //const obj = _getEditorConfig(editorConfigData);
    if (obj) {
        return obj.type == "date" && !obj.editor;
    }
    return false;
}

/**
 * item是否使用日期类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsLongDateEditor = function (obj) {
    //const obj = _getEditorConfig(editorConfigData);
    if (obj) {
        return obj.type == "longDate" && !obj.editor;
    }
    return false;
}

/**
 * 是否为下拉选择
 * @param {} obj 
 */
editorUtil.IsDropdownEditor = function (obj) {
    //const obj = _getEditorConfig(obj);
    if (obj) {
        //return obj.type == "string" && obj.dropdownData;
        return obj.editor == "dropdown"
    }
    return false;
}

/**
 * item是否使用数字类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsNumberEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "number" && !obj.editor;
    }
    return false;
}

/**
 * item是否使用数字类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsIntegerEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "integer" && !obj.editor;
    }
    return false;
}

/**
 * 是否为表达式编辑器
 * @param {*} obj 
 */
editorUtil.IsExpressionEditor = function (obj) {
    //const obj = _getEditorConfig(obj);
    if (obj) {
        return obj.editor == "inputCopy" && obj.type != "entity";
    }
    return false;
}

// /**
//  * 是否为表达式编辑器
//  * @param {*} obj 
//  */
// editorUtil.IsEntityEditor = function (obj) {
//     //const obj = _getEditorConfig(obj);
//     if (obj) {
//         return obj.editor == "entity";
//     }
//     return false;
// }

/**
* 是否为表达式编辑器
* @param {*} obj 
*/
editorUtil.IsInputEntityEditor = function (obj) {
    //const obj = _getEditorConfig(obj);
    if (obj) {
        return obj.editor == "inputCopy" && obj.type == "entity";
    }
    return false;
}

/**
* 是否为表达式编辑器
* @param {*} obj 
*/
editorUtil.IsOutEntityEditor = function (obj) {
    //const obj = _getEditorConfig(obj);
    if (obj) {
        return obj.editor == "outCopy";
    }
    return false;
}

/**
 * 是否为表达式编辑器
 * @param {*} obj 
 */
editorUtil.IsCustomEditor = function (obj) {
    //const obj = _getEditorConfig(obj);
    if (obj) {
        return obj.editor == "customEditor";
    }
    return false;
}

/**
 * 将用户配置数据合并元数据
 * @param {元数据} editorMeta 
 * @param {用户配置数据} userData 
 */
editorUtil.mergeData = function (contribution, editorMeta, metaData, userData) {
    if (!contribution)
        return;

    let index = 0;
    let buildUserData = (data, nodekey) => {
        let tmp = {}
        if (data) {
            data.forEach(d => {
                if (nodekey == "ruleInputParams")
                    tmp[d.paramCode] = d;
                else if (nodekey == "ruleOutputParams") {
                    tmp[d.srcCode] = d;
                }
            });
        }
        return tmp;
    };

    const merage = (data, user, nodekey) => {
        let newUserData = buildUserData(user, nodekey);
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const meta = data[key];
                if (newUserData && newUserData.hasOwnProperty(key)) {
                    meta.userData = newUserData[key]
                }
                meta.index = index;
                meta.editorKey = key;
                index++;
            }
        }
    }
    merage(contribution.inputs, userData ? userData.ruleInputParams : null, "ruleInputParams");
    merage(contribution.outputs, userData ? userData.ruleOutputParams : null, "ruleOutputParams");
}

/**
 * 值校验
 * @param {校验描述信息} valueValidation 
 * @param {校验值} targetValue 
 */
editorUtil.validate = (valueValidation, targetValue) => {
    if (valueValidation) {
        for (let i = 0; i < valueValidation.length; i++) {
            const validation = valueValidation[i];
            if (validation.regex) {
                let reg = new RegExp(validation.regex, "g");
                if (!reg.test(targetValue)) {
                    return validation.message;
                }
            }
        }
    }
    return null;
}

editorUtil.saveSimpleCommon = (itemData, value) => {
    let result = {
        paramCode: itemData.editorKey,
        paramSourceType: "expression",
        paramSourceValue: value,
    };
    return result;
}

editorUtil.loadDestDetails = () => {
    return new Promise((resolve, reject) => {
        if (window.vPlugin) {
            window.vPlugin.execute(
                "getDestDetails",
                (value) => {
                    console.log(value);
                    let details = JSON.parse(value);
                    resolve(details)
                }
            );
        } else {
            resolve({});
        }
    })
}

editorUtil.loadInputSourceDetails = () => {
    return new Promise((resolve, reject) => {
        if (window.vPlugin) {
            window.vPlugin.execute(
                "getInputSourceDetails",
                (value) => {
                    resolve(JSON.parse(value))
                }
            );
        } else {
            resolve(null);
        }
    })
}

editorUtil.getEntityFields = (sourceType, entityCode) => {
    return new Promise((resolve, reject) => {
        if (window.vPlugin) {
            window.vPlugin.execute(
                "getEntityFields", sourceType, entityCode,
                (value) => {
                    resolve(JSON.parse(value))
                }
            );
        } else {
            resolve(null);
        }
    })
}


// editorUtil.getDestDetails = (destType) => {
//     let _this = this;

//     if (_this.DestDetails) {
//         if (destType) {
//             return _this.DestDetails[destType];
//         }
//         return _this.DestDetails;
//     }

//     if (window.vPlugin) {
//         window.vPlugin.execute(
//             "getDestDetails",
//             (value) => {
//                 console.log(value);
//                 _this.DestDetails = JSON.parse(value);
//                 if (callBack) {
//                     callBack(_this.DestDetails)
//                 }
//             }
//         );
//     }
// }

editorUtil.itemStyle = {
    itemInputSize: "small"
}

editorUtil.deepCopy = util.deepClone;

export default editorUtil;