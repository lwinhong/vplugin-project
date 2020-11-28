<template>
  <Modal
    v-model="visible"
    mask
    :mask-closable="false"
    title="返回参数配置"
    :width="800"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <Table
      :columns="setTableColumn"
      :data="settingDataTable"
      width="100%"
      height="200"
      border
    ></Table>
  </Modal>
</template>

<script>
export default {
  name: "RuleSettingOutParamsEditor",
  props: {
    data: Array,
    showModal: Boolean,
  },
  model: {
    prop: "showModal",
  },
  computed: {
    settingDataTable() {
      return this.data;
    },
  },
  data() {
    // 这里存放数据
    return {
      visible: false,
      //settingDataTable: []
      /* 上下文类型 
          
          客户端包括：实体（entity），控件（control），窗体输入（windowVariant），窗体输出（windowOutput），
          方法输出（ruleSetOutput），方法变量（ruleSetVariant），构件变量（systemVariant）
          
          服务端 方法输出（ruleSetOutput），方法变量（ruleSetVariant），构件变量（systemVariant） */
      destTypeItems: [
        { name: "实体", value: "entity" },
        { name: "控件", value: "control" },
        { name: "窗体输入", value: "windowVariant" },
        { name: "窗体输出", value: "windowOutput" },
        {
          name: "方法输出",
          value: "ruleSetOutput",
          scrop: ["client", "server"],
        },
        {
          name: "方法变量",
          value: "ruleSetVariant",
          scrop: ["client", "server"],
        },
        {
          name: "构件变量",
          value: "systemVariant",
          scrop: ["client", "server"],
        },
      ],
      srcTypeItems: [
        { name: "表达式", value: "expression" },
        { name: "返回值", value: "returnValue" },
      ],
      setTableColumn: [
        {
          title: "目标类型",
          key: "destType",
          align: "center",
          width: 120,
          render: (h, params) => {
            let _this = this;
            return h(
              "Dropdown",
              {
                props: {
                  trigger: "click",
                  transfer: true,
                },
                on: {
                  "on-click": (value) => {
                    params.row.destType = value;
                    _this.settingDataTable[params.index].destType = value;
                    if (value == "entity") {
                      params.row.scrType = "returnValue";
                      _this.settingDataTable[params.index].scrType =
                        "returnValue";
                    }
                  },
                }, //iview组件内部的属性定义在其标签的对象里
              },
              [
                h("a", [
                  //创建一个a标签,a标签里面又有元素,继续放入后面数组
                  h(
                    "span",
                    this.getItemName(this.destTypeItems, params.row.destType)
                  ), //span中的内容
                  h("Icon", {
                    props: {
                      type: "md-arrow-dropdown",
                      size: "18",
                    },
                  }),
                ]),
                h(
                  "DropdownMenu",
                  {
                    //创建一个和a标签同级的标签
                    slot: "list", //iview组件内部的属性定义在其标签的对象里
                  },
                  this.destTypeItems.map(function (type) {
                    //把map看作循环,type看作循环的每一项
                    return h(
                      "DropdownItem",
                      {
                        props: {
                          name: type.value,
                          selected: type.value == params.row.destType,
                        },
                      },
                      type.name
                    );
                  })
                ),
              ]
            );
          },
        },
        {
          title: "目标",
          key: "dest",
        },
        {
          title: "来源类型",
          key: "srcType",
          align: "center",
          width: 100,
          render: (h, params) => {
            let _this = this;
            return h(
              "Dropdown",
              {
                props: {
                  trigger: "click",
                },
                on: {
                  "on-click": (value) => {
                    params.row.srcType = value;
                    _this.settingDataTable[params.index].srcType = value;
                  },
                }, //iview组件内部的属性定义在其标签的对象里
              },
              [
                h("a", [
                  //创建一个a标签,a标签里面又有元素,继续放入后面数组
                  h(
                    "span",
                    this.getItemName(this.srcTypeItems, params.row.srcType)
                  ), //span中的内容
                  h("Icon", {
                    props: {
                      type: "md-arrow-dropdown",
                      size: "18",
                    },
                  }),
                ]),
                h(
                  "DropdownMenu",
                  {
                    //创建一个和a标签同级的标签
                    slot: "list", //iview组件内部的属性定义在其标签的对象里
                  },
                  this.srcTypeItems.map(function (type) {
                    //把map看作循环,type看作循环的每一项
                    return h(
                      "DropdownItem",
                      {
                        props: {
                          name: type.value,
                          selected: type.value == params.row.srcType,
                          //   disabled:
                          //     params.row.destType == "entity" &&
                          //     params.row.srcType == "expression"
                          //       ? false
                          //       : true,
                        },
                      },
                      type.name
                    );
                  })
                ),
              ]
            );
          },
        },
        {
          title: "来源",
          key: "srcSetting",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", "未配置"),
              h("Button", {
                props: {
                  icon: "md-open",
                  type: "text",
                  size: this.$editorUtil.itemStyle.itemInputSize,
                },
                style: {
                  marginLeft: "30px",
                },
                on: {
                  click: () => {
                    alert(params.row.srcCode);
                  },
                },
              }),
            ]);
          },
        },
      ],
    };
  },
  // 方法集合
  methods: {
    ok() {
      this.$emit("ok", this.settingDataTable);
    },
    cancel() {
      this.$emit("cancel");
    },
    getItemName(items, key) {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.value == key) return item.name;
      }
      return key;
    },
  },
  // 监控data中的数据变化
  watch: {
    // data(newValue, oldValue) {
    //   setTimeout(() => {
    //     debugger;
    //     this.settingDataTable = this.$editorUtil.deepCopy(newValue);
    //   }, 0);
    // },
    showModal(newValue, oldValue) {
      this.visible = newValue;
    },
    // visible(newValue, oldValue) {
    //   this.showModal = this.visible;
    // },
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
</style>