import util from "../libs/util";

let editorUtil = {};

const _getEditorConfig = function (editorConfigData) {
    const objKey = util.getObjectFirstKey(editorConfigData);
    if (objKey) {
        return editorConfigData[objKey];
    }
    return null;
}

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

editorUtil.getEditorType = () => {
    const qs = editorUtil.getQueryString();
    return qs.editorType || "rule";
}

editorUtil.getObjectFirstKey = function (obj) {
    return util.getObjectFirstKey(obj);
}

editorUtil.getObjectFirstObj = function (obj) {
    const key = util.getObjectFirstKey(obj);
    if (key)
        return obj[key];
    return null;
}

editorUtil.IsTextEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "string";
    }
    return false;
}

editorUtil.IsBooleanEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "boolean";
    }
    return false;
}

editorUtil.IsDateTimeEditor = function (obj) {
    //const obj = _getEditorConfig(editorConfigData);
    if (obj) {
        return obj.type == "dateTime";
    }
    return false;
}

editorUtil.IsSelectEditor = function (obj) {
    //const obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "string" && obj.dropdownData;
    }
    return false;
}

editorUtil.IsNumberEditor = function (obj) {
    //obj = _getEditorConfig(obj);
    if (obj) {
        return obj.type == "integer";
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
        return obj.type == "string" && obj.editor == "expression";
    }
    return false;
}

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
                meta.editorType = key;
                index++;
            }
        }
    }
}

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