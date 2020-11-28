const metaData = {
    configuration: {
        title: "属性配置信息",
        type: "object",
        properties: {
            integerType: {
                type: "integer",
                name: "你就是整数",
                default: 123456789,
                description: "银行卡卡号",
            },
            booleanType: {
                type: "boolean",
                name: "你就是布尔",
                default: null,
                description: "确定是否要生成是劳动法卡开房记录缝即可了",
            },
            dropdownType: {
                type: "string",
                editor: "dropdown",
                dropdownData: [
                    { value: "good", display: "好" },
                    { value: "bad", display: "坏" },
                ],
                default: "good",
                name: "选择这个是好人还是坏人",
                description: "你是下拉类型",
            },
            dateType: {
                type: "dateTime",
                default: "2020-11-09",
                name: "选择启动时间",
                description: "选择启动时间，到时间就会启动的，知道吗",
            },
            stringType: {
                type: "string",
                default: "请如实输入你的指向",
                name: "请如实输入你的指向",
                description: "你是字符串类型",
                valueValidation: [{
                    regex: "^abc$",
                    message: "值必须是abc"
                }]
            },
            expressionType: {
                type: "string",
                default: "我是表达式",
                editor: "expression",
                name: "我是表达式",
                description: "你是字符串类型",
            },
            entityType: {
                type: "string",
                default: "实体",
                editor: "entity",
                name: "我是实体",
                description: "我是实体",
            },
        }
    }

};

const userData = {
    "inputNumber": 10.1,
    "inputInteger": 100,
    "inputBoolean": true,
    "dropdownString": "bad",
    "dateType": "2020-12-11",
    "inputEntity": "这是值",
    "expressionType": "a==b"
};

const newMetaData = {
    "configuration": {},
    "vpluginRule": {
        "inputs": {
            "inputNumber": {
                "name": "小数",
                "remark": "小数",
                "type": "number",
                "dropdownData": null,
                "default": "",
                "editor": ""
            },
            "inputInteger": {
                "name": "整数",
                "remark": "测试整型",
                "type": "integer", //默认数据类型作为编辑器(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型,entity (都会对应默认的显示模式)
                "dropdownData": null,
                "default": "",
                /* 说明 这里是标识交互弹出哪种界面如果没有设置信息则默认使用原生的交互模式，，inputCopy说明当是实体的时候需要弹出映射
                    配置界面，如果是非实体的话弹出表达式界面  */
                "editor": "" //dropdown ，inputCopy
            },
            "inputEntity": {
                "name": "实体",
                "remark": "输入实体",
                "type": "entity",
                "dropdownData": null,
                "default": "132",
                "editor": "inputCopy" //实体默认就是这个编辑器暂时不让选择
            },
            "inputBoolean": {
                "name": "布尔类型",
                "remark": "输入布尔",
                "type": "boolean",
                "dropdownData": null,
                "default": "",
                "editor": ""
            },
            "dropdownString": {
                "name": "下拉选择",
                "remark": "下拉选择",
                "type": "string",
                "dropdownData": [
                    {
                        "value": "bad",
                        "display": "bad",
                        "IsDefault": false
                    },
                    {
                        "value": "good",
                        "display": "good",
                        "IsDefault": false
                    }
                ],
                "default": "good",
                "editor": "dropdown"
            },

            "inputChar": {
                "name": "文本",
                "remark": "文本",
                "type": "char",
                "dropdownData": null,
                "default": "",
                "editor": ""
            },
            "inputText": {
                "name": "长文本",
                "remark": "长文本",
                "type": "text",
                "default": "",
                "editor": ""
            },
            "inputDate": {
                "name": "日期",
                "remark": "日期",
                "type": "date",
                "default": "",
                "editor": ""
            },
            "inputLongDate": {
                "name": "长日期",
                "remark": "长日期",
                "type": "longDate",
                "default": "",
                "editor": ""
            }, 
            "expressionType": {
                "type": "string",
                "default": "我是表达式",
                "editor": "expression",
                "name": "我是表达式",
                "remark": "你是字符串类型",
            },
        },
        "outputs": {
            "outputInteger": {
                "name": "整形",
                "remark": "测试整型",
                "type": "integer", //默认数据类型作为编辑器(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型,entity (都会对应默认的显示模式)
                "dropdownData": null,
                "default": "",
                /* 说明 这里是标识交互弹出哪种界面如果没有设置信息则默认使用原生的交互模式 输出都是必须是outCopy 没有配置 */
                "editor": "outCopy" //输出默认只有一种编辑器
            },
            "outputEntity": {
                "name": "实体",
                "remark": "输出实体",
                "type": "entity",
                "dropdownData": null,
                "default": "",
                "editor": "outCopy" //实体默认就是这个编辑器暂时不让选择
            },
            "outputBoolean": {
                "name": "布尔类型",
                "remark": "输出布尔",
                "type": "boolean",
                "dropdownData": null,
                "default": "",
                "editor": "outCopy"
            }
        }
    }
}

export default {
    metaData, userData, newMetaData
}