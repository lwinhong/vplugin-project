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
                default: true,
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
                valueValidation:[{
                    regex:"^abc$",
                    message:"值必须是abc"
                }]
            },
            expressionType: {
                type: "string",
                default: "我是表达式",
                editor: "expression",
                name: "我是表达式",
                description: "你是字符串类型",
            },
        }
    }

};

const userData = {
    "integerType": 100,
    "booleanType": true,
    "dropdownType": "bad",
    "dateType": "2020-12-11",
    "stringType": "这是值",
    "expressionType": "a==b"
};

export default {
    metaData, userData
}