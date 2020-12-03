<template>
  <div>
    <div>
      <Button type="text" icon="md-add" @click="addNewRow"> 新增</Button>
      <Button v-show="false" type="text" icon="md-done-all">引入全部</Button>
      <Button type="text" icon="md-close">清空</Button>
    </div>
    <Table :data="settingDataTable" :columns="columns" border highlight-row>
      <template slot-scope="{ row, index }" slot="destSlot">
        <Select
          style="width: 100%"
          transfer
          :value="row.destField"
          @on-change="
            row.destField = $event;
            updateTableRow(row, index);
          "
        >
          <Option
            v-for="item in deEntityFields"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="srcTypeSlot">
        <Select
          style="width: 100%"
          transfer
          :value="row.srcValueType"
          @on-change="
            row.srcValueType = $event;
            updateTableRow(row, index);
          "
        >
          <Option
            v-for="item in srcTypes"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="srcValueSlot">
        <Select
          style="width: 100%"
          :value="row.srcValue"
          transfer
          @on-change="
            row.srcValue = $event;
            updateTableRow(row, index);
          "
        >
          <Option
            v-for="item in sourceFiledItems"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="actionSlot">
        <!-- <Button
          type="primary"
          @click="addNewRow(index)"
          >新增</Button
        > -->
        <Button type="error" @click="removeRow(index)">移除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("ruleEditorStore");

export default {
  props: {
    data: Array,
    showModal: Boolean,
    context: [Object, Array, String],
  },
  model: {
    prop: "showModal",
    event: "change",
  },
  data() {
    // 这里存放数据
    return {
      visible: false,
      columns: [
        {
          title: "目标字段",
          key: "destField",
          slot: "destSlot",
        },
        {
          title: "来源类型",
          key: "srcValueType", //来源的类型 expression ，field
          width: 120,
          slot: "srcTypeSlot",
        },
        {
          title: "来源",
          key: "srcValue",
          slot: "srcValueSlot",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          slot: "actionSlot",
          width: 80,
        },
      ],
      srcTypes: [
        { name: "字段", value: "field" },
        // ,
        // { name: "表达式", value: "expression" },
      ],
      deEntityFields: [],
      srcEntityFields: [],
    };
  },
  computed: {
    ...mapState(["ruleMetaData"]),
    settingDataTable() {
      return this.data;
    },

    sourceFiledItems() {
      let items = new Array();
      let meta = this.getOutputMetaInfo()(this.context.editorKey);
      if (meta && meta.entityInfo && meta.entityInfo.entityField) {
        meta.entityInfo.entityField.forEach((entity) => {
          items.push({
            name: entity.code + (entity.name ? "(" + entity.name + ")" : ""),
            value: entity.code,
          });
        });
      }
      return items;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.$editorUtil
    //     .getEntityFields("ruleSetOutput", this.context.userData.dest)
    //     .then((items) => {
    //       let returnValue = [];
    //       if (items) {
    //         for (const key in items) {
    //           if (items.hasOwnProperty(key)) {
    //             const item = items[key];
    //             returnValue.push({
    //               name: item,
    //               value: key,
    //             });
    //           }
    //         }
    //       }
    //      this.deEntityFields = returnValue;
    //     });
  },
  // 方法集合
  methods: {
    ...mapGetters(["getOutputMetaInfo"]),
    show(context) {
      this.dataContext = context;
      this.visible = true;
    },
    destFiledItems(dest) {
      this.$editorUtil.getEntityFields("ruleSetOutput", dest).then((items) => {
        let returnValue = [];
        if (items) {
          for (const key in items) {
            if (items.hasOwnProperty(key)) {
              const item = items[key];
              returnValue.push({
                name: item,
                value: key,
              });
            }
          }
        }
        this.deEntityFields = returnValue;
      });
    },
    ok() {
      let mapping = [];
      this.settingDataTable.forEach((mapping) => {
        let item = {
          destField: mapping.destField,
          destType: mapping.destType,
          srcValueType: mapping.srcValueType, //来源的类型 expression ，field
          srcValue: mapping.srcValue,
        };
        mapping.push(item);
      });

      this.$emit("change", false);
      this.$emit("on-ok", this.dataContext, mapping);
    },
    cancel() {
      this.$emit("change", false);
      this.$emit("cancel");
    },
    addNewRow() {
      let item = this.newRow();
      this.settingDataTable.push(item);
    },
    removeRow(index) {
      this.settingDataTable.splice(index, 1);
    },
    newRow() {
      let item = {
        destField: "",
        destType: "",
        srcValueType: "", //来源的类型 expression ，field
        srcValue: "",
      };
      return item;
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