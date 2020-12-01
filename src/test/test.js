// const metaData = {
//     configuration: {
//         title: "属性配置信息",
//         type: "object",
//         properties: {
//             integerType: {
//                 type: "integer",
//                 name: "你就是整数",
//                 default: 123456789,
//                 description: "银行卡卡号",
//             },
//             booleanType: {
//                 type: "boolean",
//                 name: "你就是布尔",
//                 default: null,
//                 description: "确定是否要生成是劳动法卡开房记录缝即可了",
//             },
//             dropdownType: {
//                 type: "string",
//                 editor: "dropdown",
//                 dropdownData: [
//                     { value: "good", display: "好" },
//                     { value: "bad", display: "坏" },
//                 ],
//                 default: "good",
//                 name: "选择这个是好人还是坏人",
//                 description: "你是下拉类型",
//             },
//             dateType: {
//                 type: "dateTime",
//                 default: "2020-11-09",
//                 name: "选择启动时间",
//                 description: "选择启动时间，到时间就会启动的，知道吗",
//             },
//             stringType: {
//                 type: "string",
//                 default: "请如实输入你的指向",
//                 name: "请如实输入你的指向",
//                 description: "你是字符串类型",
//                 valueValidation: [{
//                     regex: "^abc$",
//                     message: "值必须是abc"
//                 }]
//             },
//             expressionType: {
//                 type: "string",
//                 default: "我是表达式",
//                 editor: "expression",
//                 name: "我是表达式",
//                 description: "你是字符串类型",
//             },
//             entityType: {
//                 type: "string",
//                 default: "实体",
//                 editor: "entity",
//                 name: "我是实体",
//                 description: "我是实体",
//             },
//         }
//     }

// };

// const contribution1 = {
//     "configuration": {},
//     "vpluginRule": {
//         "inputs": {
//             "inputNumber": {
//                 "name": "小数",
//                 "remark": "小数",
//                 "type": "number",
//                 "dropdownData": null,
//                 "default": "",
//                 "required": true,
//                 "editor": ""

//             },
//             "inputInteger": {
//                 "name": "整数",
//                 "remark": "测试整型",
//                 "type": "integer", //默认数据类型作为编辑器(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型,entity (都会对应默认的显示模式)
//                 "dropdownData": null,
//                 "required": true,
//                 "default": "",
//                 /* 说明 这里是标识交互弹出哪种界面如果没有设置信息则默认使用原生的交互模式，，inputCopy说明当是实体的时候需要弹出映射
//                     配置界面，如果是非实体的话弹出表达式界面  */
//                 "editor": "" //dropdown ，inputCopy
//             },
//             "inputEntity": {
//                 "name": "实体",
//                 "remark": "输入实体",
//                 "type": "entity",
//                 "dropdownData": null,
//                 "default": "132",
//                 "editor": "inputCopy" //实体默认就是这个编辑器暂时不让选择
//             },
//             "inputBoolean": {
//                 "name": "布尔类型",
//                 "remark": "输入布尔",
//                 "type": "boolean",
//                 "dropdownData": null,
//                 "default": "",
//                 "editor": ""
//             },
//             "dropdownString": {
//                 "name": "下拉选择",
//                 "remark": "下拉选择",
//                 "type": "string",
//                 "dropdownData": [
//                     {
//                         "value": "bad",
//                         "display": "bad",
//                         "IsDefault": false
//                     },
//                     {
//                         "value": "good",
//                         "display": "good",
//                         "IsDefault": false
//                     }
//                 ],
//                 "default": "good",
//                 "editor": "dropdown"
//             },

//             "inputChar": {
//                 "name": "文本",
//                 "remark": "文本",
//                 "type": "char",
//                 "dropdownData": null,
//                 "required": true,
//                 "default": "",
//                 "editor": ""
//             },
//             "inputText": {
//                 "name": "长文本",
//                 "remark": "长文本",
//                 "required": true,
//                 "type": "text",
//                 "default": "",
//                 "editor": ""
//             },
//             "inputDate": {
//                 "name": "日期",
//                 "remark": "日期",
//                 "type": "date",
//                 "default": "",
//                 "editor": ""
//             },
//             "inputLongDate": {
//                 "name": "长日期",
//                 "remark": "长日期",
//                 "type": "longDate",
//                 "default": "",
//                 "editor": ""
//             },
//             "expressionType": {
//                 "type": "string",
//                 "default": "我是表达式",
//                 "editor": "expression",
//                 "name": "我是表达式",
//                 "remark": "你是字符串类型",
//             },
//         },
//         "outputs": {
//             "outputInteger": {
//                 "name": "整形",
//                 "remark": "测试整型",
//                 "type": "integer", //默认数据类型作为编辑器(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型,entity (都会对应默认的显示模式)
//                 "dropdownData": null,
//                 "default": "",
//                 /* 说明 这里是标识交互弹出哪种界面如果没有设置信息则默认使用原生的交互模式 输出都是必须是outCopy 没有配置 */
//                 "editor": "outCopy" //输出默认只有一种编辑器
//             },
//             "outputEntity": {
//                 "name": "实体",
//                 "remark": "输出实体",
//                 "type": "entity",
//                 "dropdownData": null,
//                 "default": "",
//                 "editor": "outCopy" //实体默认就是这个编辑器暂时不让选择
//             },
//             "outputBoolean": {
//                 "name": "布尔类型",
//                 "remark": "输出布尔",
//                 "type": "boolean",
//                 "dropdownData": null,
//                 "default": "",
//                 "editor": "outCopy"
//             }
//         }
//     }
// }

// const metaData1 = {
//     "metaType": "Rule",
//     "metaData": [
//         {
//             "metaProperty": "entryPoint",
//             "metaValue": "com.yindangu.rule.NumberUppercaseRule.evaluate"
//         },
//         {
//             "metaProperty": "ruleCode",
//             "metaValue": "numberuppercaseruleclient"
//         },
//         {
//             "metaProperty": "ruleName",
//             "metaValue": "数字转大写"
//         },
//         {
//             "metaProperty": "ruleType",
//             "metaValue": "Client"
//         },
//         {
//             "metaProperty": "ruleCategory",
//             "metaValue": "web.other"
//         },
//         {
//             "metaProperty": "description",
//             "metaValue": ""
//         },
//         {
//             "metaProperty": "author",
//             "metaValue": "guorq"
//         },
//         {
//             "metaProperty": "transactionType",
//             "metaValue": "none"
//         },
//         {
//             "metaProperty": "schemaVersion",
//             "metaValue": "1"
//         },
//         {
//             "metaProperty": "outputs",
//             "metaValue": [
//                 {
//                     "code": "test1",
//                     "name": "实体",
//                     "remark": "返回实体",
//                     "isMust": true,
//                     "entityInfo": null,
//                     "type": "char" //类型说明：数据类型(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型,entity (实体))
//                 },
//                 {
//                     "code": "outPutentity",
//                     "name": "实体",
//                     "remark": "返回实体",
//                     "isMust": true,
//                     "type": "entity",
//                     "entityInfo": {
//                         "dynamicParameter": false,//预留 动态参数
//                         "entityField": [
//                             {
//                                 "code": "test1",
//                                 "name": "测试1",
//                                 "desc": "字段1",
//                                 "type": "char" //类型说明：数据类型(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型)
//                             },
//                             {
//                                 "code": "test1",
//                                 "name": "测试1",
//                                 "desc": "字段1",
//                                 "type": "char"
//                             }
//                         ]
//                     }

//                 }
//             ]
//         },
//         {
//             "metaProperty": "inputs",
//             "metaValue": [
//                 {
//                     "code": "inputInteger",
//                     "name": "整形",
//                     "remark": "测试整型",
//                     "entityInfo": null,
//                     "default": "",
//                     "isMust": true,
//                     "type": "integer" //类型说明：数据类型(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型，file-文件（文件id）,entity (实体))
//                 },
//                 {
//                     "code": "inputentity",
//                     "name": "实体",
//                     "remark": "输入实体",
//                     "type": "entity",
//                     "default": "",
//                     "isMust": true,
//                     "entityInfo": {
//                         "dynamicParameter": false,//预留 动态参数
//                         "entityField": [
//                             {
//                                 "code": "test1",
//                                 "name": "测试1",
//                                 "desc": "字段1",
//                                 "type": "char" //类型说明：数据类型(char-文本，text-长文本，number-小数，boolean-布尔，date-日期，longDate-长日期，integer-整型，file-文件（文件id）)
//                             },
//                             {
//                                 "code": "test1",
//                                 "name": "测试1",
//                                 "desc": "字段1",
//                                 "type": "char"
//                             }
//                         ]
//                     }

//                 }
//             ]
//         }
//     ]
// }

// const userData = {
//     "inputNumber": 10.1,
//     "inputInteger": 100,
//     "inputBoolean": true,
//     "dropdownString": "bad",
//     "dateType": "2020-12-11",
//     "inputEntity": "这是值",
//     "expressionType": "a==b"
// };
const userData = {
    ruleInputParams: [{
        "paramCode": "inputchar",
        "paramSourceType": "expression",
        "paramSourceValue": ""
    }, {
        "paramCode": "inputtext",
        "paramSourceType": "expression",
        "paramSourceValue": "asdf"
    }, {
        "paramCode": "inputint",
        "paramSourceType": "expression",
        "paramSourceValue": 0
    }, {
        "paramCode": "inputdecimal",
        "paramSourceType": "expression",
        "paramSourceValue": 0
    }, {
        "paramCode": "inputDate",
        "paramSourceType": "expression",
        "paramSourceValue": "2020-11-17T16:00:00.000Z"
    }, {
        "paramCode": "inputDatetime",
        "paramSourceType": "expression",
        "paramSourceValue": "2020-11-26T16:00:00.000Z"
    }, {
        "paramCode": "inputbool",
        "paramSourceType": "expression",
        "paramSourceValue": true
    }, {
        "paramCode": "inputentity"
    }, {
        "paramCode": "inputdropdown",
        "paramSourceType": "expression",
        "paramSourceValue": ""
    }, {
        "paramCode": "inputcharexp",
        "paramSourceType": "expression",
        "paramSourceValue": "123"
    }
    ],
    ruleOutputParams: [{
        "srcCode": "outputchar",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }, {
        "srcCode": "outputtext",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }, {
        "srcCode": "oututint",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }, {
        "srcCode": "outputdecimal",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }, {
        "srcCode": "outputDate",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }, {
        "srcCode": "outputDatetime",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }, {
        "srcCode": "outputbool",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }, {
        "srcCode": "outputentity",
        "srcType": "returnValue",
        "dest": "",
        "destType": "entity",
        "destFieldMapping": null
    }
    ]
}


const metaData = {
    "metaType": "Rule",
    "metaData": [{
        "metaProperty": "entryPoint",
        "metaValue": "com.yindangu.demo.NumberUpperRule"
    }, {
        "metaProperty": "ruleCode",
        "metaValue": "testalltype"
    }, {
        "metaProperty": "ruleName",
        "metaValue": "测试所有类型"
    }, {
        "metaProperty": "ruleType",
        "metaValue": "Server"
    }, {
        "metaProperty": "ruleCategory",
        "metaValue": "web.other"
    }, {
        "metaProperty": "description",
        "metaValue": "为了测试有关类型是否OK"
    }, {
        "metaProperty": "author",
        "metaValue": "guorq"
    }, {
        "metaProperty": "transactionType",
        "metaValue": "none"
    }, {
        "metaProperty": "schemaVersion",
        "metaValue": "1"
    }, {
        "metaProperty": "outputs",
        "metaValue": [{
            "code": "outputchar",
            "name": "char类型",
            "remark": null,
            "isMust": false,
            "type": "char",
            "default": null,
            "entityInfo": null
        }, {
            "code": "outputtext",
            "name": "text类型",
            "remark": null,
            "isMust": false,
            "type": "text",
            "default": null,
            "entityInfo": null
        }, {
            "code": "oututint",
            "name": "int类型",
            "remark": null,
            "isMust": false,
            "type": "integer",
            "default": null,
            "entityInfo": null
        }, {
            "code": "outputdecimal",
            "name": "decimal类型",
            "remark": null,
            "isMust": false,
            "type": "number",
            "default": null,
            "entityInfo": null
        }, {
            "code": "outputDate",
            "name": "日期类型",
            "remark": null,
            "isMust": false,
            "type": "date",
            "default": null,
            "entityInfo": null
        }, {
            "code": "outputDatetime",
            "name": "日期时间类型",
            "remark": null,
            "isMust": false,
            "type": "longDate",
            "default": null,
            "entityInfo": null
        }, {
            "code": "outputbool",
            "name": "bool类型",
            "remark": null,
            "isMust": false,
            "type": "boolean",
            "default": null,
            "entityInfo": null
        }, {
            "code": "outputentity",
            "name": "实体类型",
            "remark": null,
            "isMust": false,
            "type": "entity",
            "default": null,
            "entityInfo": {
                "dynamicParameter": false,
                "entityField": [{
                    "code": "outputFiledChar",
                    "name": "",
                    "desc": "",
                    "type": "char",
                    "default": null
                }, {
                    "code": "outputFiledText",
                    "name": "",
                    "desc": "",
                    "type": "char",
                    "default": null
                }, {
                    "code": "outputFiledint",
                    "name": "",
                    "desc": "",
                    "type": "integer",
                    "default": null
                }, {
                    "code": "outputFileddecimal",
                    "name": "",
                    "desc": "",
                    "type": "number",
                    "default": null
                }, {
                    "code": "outputFiledbool",
                    "name": "",
                    "desc": "",
                    "type": "boolean",
                    "default": null
                }, {
                    "code": "outputdate",
                    "name": "",
                    "desc": "",
                    "type": "date",
                    "default": null
                }, {
                    "code": "outputdatetime",
                    "name": "",
                    "desc": "",
                    "type": "longDate",
                    "default": null
                }
                ]
            }
        }
        ]
    }, {
        "metaProperty": "inputs",
        "metaValue": [{
            "code": "inputchar",
            "name": "char类型",
            "remark": null,
            "isMust": false,
            "type": "char",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputtext",
            "name": "text类型",
            "remark": null,
            "isMust": false,
            "type": "text",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputint",
            "name": "int类型",
            "remark": null,
            "isMust": false,
            "type": "integer",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputdecimal",
            "name": "decimal类型",
            "remark": null,
            "isMust": false,
            "type": "number",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputDate",
            "name": "日期类型",
            "remark": null,
            "isMust": false,
            "type": "date",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputDatetime",
            "name": "日期时间类型",
            "remark": null,
            "isMust": false,
            "type": "longDate",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputbool",
            "name": "bool类型",
            "remark": null,
            "isMust": false,
            "type": "boolean",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputentity",
            "name": "实体类型",
            "remark": null,
            "isMust": false,
            "type": "entity",
            "default": null,
            "entityInfo": {
                "dynamicParameter": false,
                "entityField": [{
                    "code": "inputFiledChar",
                    "name": "",
                    "desc": "",
                    "type": "char",
                    "default": null
                }, {
                    "code": "inputFiledText",
                    "name": "",
                    "desc": "",
                    "type": "char",
                    "default": null
                }, {
                    "code": "inputFiledint",
                    "name": "",
                    "desc": "",
                    "type": "integer",
                    "default": null
                }, {
                    "code": "inputFileddecimal",
                    "name": "",
                    "desc": "",
                    "type": "number",
                    "default": null
                }, {
                    "code": "inputFiledbool",
                    "name": "",
                    "desc": "",
                    "type": "boolean",
                    "default": null
                }, {
                    "code": "inputdate",
                    "name": "",
                    "desc": "",
                    "type": "date",
                    "default": null
                }, {
                    "code": "inputdatetime",
                    "name": "",
                    "desc": "",
                    "type": "longDate",
                    "default": null
                }
                ]
            }
        }, {
            "code": "inputdropdown",
            "name": "",
            "remark": null,
            "isMust": false,
            "type": "char",
            "default": null,
            "entityInfo": null
        }, {
            "code": "inputcharexp",
            "name": "",
            "remark": null,
            "isMust": false,
            "type": "char",
            "default": null,
            "entityInfo": null
        }
        ]
    }
    ]
}


const contribution = {
    "configuration": {
        "title": "属性配置信息",
        "type": "object"
    },
    "vpluginRule": {
        "inputs": {
            "inputchar": {
                "type": "char",
                "name": "char类型",
                "default": null,
                "remark": null,
                "editor": "",
                "dropdownData": null
            },
            "inputtext": {
                "type": "text",
                "name": "text类型",
                "default": null,
                "remark": null,
                "editor": "",
                "dropdownData": null
            },
            "inputint": {
                "type": "integer",
                "name": "int类型",
                "default": null,
                "remark": null,
                "editor": "",
                "dropdownData": null
            },
            "inputdecimal": {
                "type": "number",
                "name": "decimal类型",
                "default": null,
                "remark": null,
                "editor": "",
                "dropdownData": null
            },
            "inputDate": {
                "type": "date",
                "name": "日期类型",
                "default": null,
                "remark": null,
                "editor": "",
                "dropdownData": null
            },
            "inputDatetime": {
                "type": "longDate",
                "name": "日期时间类型",
                "default": null,
                "remark": null,
                "editor": "",
                "dropdownData": null
            },
            "inputbool": {
                "type": "boolean",
                "name": "bool类型",
                "default": null,
                "remark": null,
                "editor": "",
                "dropdownData": null
            },
            "inputentity": {
                "type": "entity",
                "name": "实体类型",
                "default": null,
                "remark": null,
                "editor": "inputCopy",
                "dropdownData": null
            },
            "inputdropdown": {
                "type": "char",
                "name": "下拉",
                "default": null,
                "remark": null,
                "editor": "dropdown",
                "dropdownData": [
                    {
                        "value": "fdfd",
                        "display": "fdfd中午",
                        "IsDefault": false
                    },
                    {
                        "value": "gfgd",
                        "display": "hdfhd完善",
                        "IsDefault": false
                    }
                ]
            },
            "inputcharexp": {
                "type": "char",
                "name": "表达式inputCopy",
                "default": null,
                "remark": null,
                "editor": "inputCopy",
                "dropdownData": null
            }
        },
        "outputs": {
            "outputchar": {
                "type": "char",
                "name": "char类型",
                "default": null,
                "remark": null,
                "editor": "outCopy",
                "dropdownData": null
            },
            "outputtext": {
                "type": "text",
                "name": "text类型",
                "default": null,
                "remark": null,
                "editor": "outCopy",
                "dropdownData": null
            },
            "oututint": {
                "type": "integer",
                "name": "int类型",
                "default": null,
                "remark": "int类型int类型int类型int类型int类型int类型int类型",
                "editor": "outCopy",
                "dropdownData": null
            },
            "outputdecimal": {
                "type": "number",
                "name": "decimal类型",
                "default": null,
                "remark": null,
                "editor": "outCopy",
                "dropdownData": null
            },
            "outputDate": {
                "type": "date",
                "name": "日期类型",
                "default": null,
                "remark": null,
                "editor": "outCopy",
                "dropdownData": null
            },
            "outputDatetime": {
                "type": "longDate",
                "name": "日期时间类型",
                "default": null,
                "remark": null,
                "editor": "outCopy",
                "dropdownData": null
            },
            "outputbool": {
                "type": "boolean",
                "name": "bool类型",
                "default": null,
                "remark": null,
                "editor": "outCopy",
                "dropdownData": null
            },
            "outputentity": {
                "type": "entity",
                "name": "实体类型",
                "default": null,
                "remark": null,
                "editor": "outCopy",
                "dropdownData": null
            }
        }
    }
}

const dests = {
    "ruleSetOutput": {
        "text": "方法输出",
        "value": [{
            "Code": "result",
            "Name": "",
            "CodeName": "result(1)",
            "DataType": "entity",
            "InitValue": "",
            "Desc": ""
        }
        ]
    },
    "ruleSetVariant": {
        "text": "方法变量",
        "value": [{
            "Code": "result2",
            "Name": "",
            "CodeName": "result(2)",
            "DataType": "entity",
            "InitValue": "",
            "Desc": ""
        }
        ]
    },
    "systemVariant": {
        "text": "构件变量",
        "value": [{
            "Code": "result3",
            "Name": "",
            "CodeName": "result(3)",
            "DataType": "entity",
            "InitValue": "",
            "Desc": ""
        }
        ]
    }
}


export default {
    userData, contribution, metaData, dests
}