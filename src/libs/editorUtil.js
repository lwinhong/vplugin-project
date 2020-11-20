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
 * item是否使用文本类型编辑器
 * @param {item数据} obj 
 */
editorUtil.IsTextEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "string" && !obj.editor;
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
editorUtil.IsDateTimeEditor = function (obj) {
    //const obj = _getEditorConfig(editorConfigData);
    if (obj) {
        return obj.type == "dateTime" && !obj.editor;
    }
    return false;
}

/**
 * 是否为下拉选择
 * @param {} obj 
 */
editorUtil.IsSelectEditor = function (obj) {
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
        return obj.editor == "expression";
    }
    return false;
}

/**
 * 是否为表达式编辑器
 * @param {*} obj 
 */
editorUtil.IsEntityEditor = function (obj) {
    //const obj = _getEditorConfig(obj);
    if (obj) {
        return obj.editor == "entity";
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
editorUtil.mergeData = function (editorMeta, userData) {
    if (editorMeta) {
        let index = 0;
        for (const key in editorMeta) {
            if (editorMeta.hasOwnProperty(key)) {
                const meta = editorMeta[key];
                if (userData && userData.hasOwnProperty(key)) {
                    meta.userData = userData[key]
                }
                meta.index = index;
                meta.editorKey = key;
                index++;
            }
        }
    }
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

export default editorUtil;