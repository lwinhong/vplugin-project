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
    >
      <template slot-scope="{ row, index }" slot="destTypeSlot">
        <Dropdown trigger="click" transfer>
          <a>
            <span>{{ getItemName(destTypeItems, row.destType) }} </span>
            <Icon type="md-arrow-dropdown" size="18" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="value in destTypeItems"
              :key="value.value"
              :selected="value.value == row.destType"
              @click.native="onDestTypeChanged(value.value, row, index)"
            >
              {{ value.name }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> </template
      ><template slot-scope="{ row, index }" slot="destSlot">
        <Dropdown trigger="click" transfer>
          <a>
            <!-- <span>{{ getItemName(destItems, row.destType) }} </span> -->
            <span v-text="row.dest"></span>
            <Icon type="md-arrow-dropdown" size="18" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="value in destItems"
              :key="value.value"
              :selected="value.value == row.destType"
              @click.native="onDestChanged(value.value, row, index)"
            >
              {{ value.name }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template slot-scope="{ row, index }" slot="srcTypeSlot">
        <Dropdown trigger="click">
          <a>
            <span>{{ getItemName(srcTypeItems, row.srcType) }} </span>
            <Icon type="md-arrow-dropdown" size="18" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="value in srcTypeItems"
              :key="value.value"
              :selected="value.value == row.srcType"
              @click.native="onSrcTypeChanged(value.value, row, index)"
            >
              {{ value.name }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template slot-scope="{ row }" slot="srcSettingSlot">
        <span>{{
          row.srcType == "returnValue"
            ? row.destFieldMapping
              ? "已配置"
              : "未配置"
            : row.srcSetting
        }}</span>
        <Button
          v-if="row.srcType == 'returnValue'"
          icon="md-open"
          type="text"
          :size="$editorUtil.itemStyle.itemInputSize"
          @click="openSrcEditor(row.srcType)"
        ></Button>
      </template>
    </Table>
  </Modal>
</template>

<script>
const srcTypeExpression = { name: "表达式", value: "expression" };
const srcTypeReturnValue = { name: "返回值", value: "returnValue" };

export default {
  name: "RuleSettingOutParamsEditor",
  props: {
    data: Array,
    showModal: Boolean,
    context: [Object, Array, String],
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
      srcTypeItems: [srcTypeReturnValue],
      destItems: [{ name: "myentity", value: "myentity" }],
      setTableColumn: [
        {
          title: "目标类型",
          key: "destType",
          align: "center",
          width: 120,
          slot: "destTypeSlot",
          //   render: (h, params) => {
          //     let _this = this;
          //     return h(
          //       "Dropdown",
          //       {
          //         props: {
          //           trigger: "click",
          //           transfer: true,
          //         },
          //         on: {
          //           "on-click": (value) => {
          //             let row = params.row;

          //             row.destType = value;
          //             row.dest = "";
          //             let isEntity = value == "entity";
          //             if (isEntity) {
          //               row.srcType = "returnValue";
          //             }

          //             _this.settingDataTable[params.index] = row;
          //             if (isEntity) {
          //               _this.srcTypeItems = [srcTypeReturnValue];
          //             } else {
          //               _this.srcTypeItems = [
          //                 srcTypeReturnValue,
          //                 srcTypeExpression,
          //               ];
          //             }
          //           },
          //         }, //iview组件内部的属性定义在其标签的对象里
          //       },
          //       [
          //         h("a", [
          //           //创建一个a标签,a标签里面又有元素,继续放入后面数组
          //           h(
          //             "span",
          //             this.getItemName(this.destTypeItems, params.row.destType)
          //           ), //span中的内容
          //           h("Icon", {
          //             props: {
          //               type: "md-arrow-dropdown",
          //               size: "18",
          //             },
          //           }),
          //         ]),
          //         h(
          //           "DropdownMenu",
          //           {
          //             //创建一个和a标签同级的标签
          //             slot: "list", //iview组件内部的属性定义在其标签的对象里
          //           },
          //           this.destTypeItems.map(function (type) {
          //             //把map看作循环,type看作循环的每一项
          //             return h(
          //               "DropdownItem",
          //               {
          //                 props: {
          //                   name: type.value,
          //                   selected: type.value == params.row.destType,
          //                 },
          //               },
          //               type.name
          //             );
          //           })
          //         ),
          //       ]
          //     );
          //   },
        },
        {
          title: "目标",
          key: "dest",
          align: "center",
          slot: "destSlot",
        },
        {
          title: "来源类型",
          key: "srcType",
          align: "center",
          width: 120,
          slot: "srcTypeSlot",
          //   render: (h, params) => {
          //     let _this = this;
          //     return h(
          //       "Dropdown",
          //       {
          //         props: {
          //           trigger: "click",
          //         },
          //         on: {
          //           "on-click": (value) => {
          //             params.row.srcType = value;
          //             if (value == "expression") {
          //               params.row.srcSetting = this.context
          //                 ? this.context.editorKey
          //                 : "";
          //             }
          //             _this.settingDataTable[params.index] = params.row;
          //           },
          //         }, //iview组件内部的属性定义在其标签的对象里
          //       },
          //       [
          //         h("a", [
          //           //创建一个a标签,a标签里面又有元素,继续放入后面数组
          //           h(
          //             "span",
          //             this.getItemName(this.srcTypeItems, params.row.srcType)
          //           ), //span中的内容
          //           h("Icon", {
          //             props: {
          //               type: "md-arrow-dropdown",
          //               size: "18",
          //             },
          //           }),
          //         ]),
          //         h(
          //           "DropdownMenu",
          //           {
          //             //创建一个和a标签同级的标签
          //             slot: "list", //iview组件内部的属性定义在其标签的对象里
          //           },
          //           this.srcTypeItems.map(function (type) {
          //             //把map看作循环,type看作循环的每一项
          //             return h(
          //               "DropdownItem",
          //               {
          //                 props: {
          //                   name: type.value,
          //                   selected: type.value == params.row.srcType,
          //                 },
          //               },
          //               type.name
          //             );
          //           })
          //         ),
          //       ]
          //     );
          //   },
        },
        {
          title: "来源",
          key: "srcSetting",
          align: "center",
          slot: "srcSettingSlot",
          //   render: (h, params) => {
          //     return h("div", [
          //       h("span", "未配置"),
          //       h("Button", {
          //         props: {
          //           icon: "md-open",
          //           type: "text",
          //           size: this.$editorUtil.itemStyle.itemInputSize,
          //         },
          //         style: {
          //           marginLeft: "30px",
          //         },
          //         on: {
          //           click: () => {
          //             alert(params.row.srcCode);
          //           },
          //         },
          //       }),
          //     ]);
          //   },
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
    openSrcEditor(srcType) {
      alert(srcType);
    },
    onDestChanged(value, row, index) {
      row.dest = value;
      this.updateTableRow(row, index);
    },
    onDestTypeChanged(value, row, index) {
      if (row.destType == value) return;
      row.destType = value;
      row.dest = "";
      let isEntity = value == "entity";
      if (isEntity) {
        row.srcType = "returnValue";
      }
      if (isEntity) {
        this.srcTypeItems = [srcTypeReturnValue];
      } else {
        this.srcTypeItems = [srcTypeReturnValue, srcTypeExpression];
      }
      this.updateTableRow(row, index);
    },
    onSrcTypeChanged(value, row, index) {
      if (row.srcType == value) return;
      row.srcType = value;
      if (value == "expression") {
        row.srcSetting = this.context ? this.context.editorKey : "";
      }
      this.updateTableRow(row, index);
    },
    updateTableRow(row, index) {
      this.settingDataTable[index] = row;
    },
  },
  // 监控data中的数据变化
  watch: {
    showModal(newValue, oldValue) {
      this.visible = newValue;
    },
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
</style>