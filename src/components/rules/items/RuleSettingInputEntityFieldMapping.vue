<template>
  <!-- <Modal
    v-model="visible"
    mask
    :mask-closable="false"
    title="实体字段映射12"
    :width="800"
    @on-ok="ok"
    @on-cancel="cancel"
  > -->
  <div>
    <div>
      <Button
        type="text"
        :size="$editorUtil.itemStyle.itemInputSize"
        icon="md-add"
        @click="addNewRow"
      >
        新增</Button
      >
      <!-- <Button
        type="text"
        :size="$editorUtil.itemStyle.itemInputSize"
        icon="md-remove"
         @click="removeRow()"
        >移除</Button
      > -->
      <Button
        type="text"
        :size="$editorUtil.itemStyle.itemInputSize"
        icon="md-done-all"
        >引入全部</Button
      >
      <Button
        type="text"
        :size="$editorUtil.itemStyle.itemInputSize"
        icon="md-close"
        >清空</Button
      >
    </div>
    <Table
      :data="settingDataTable"
      :columns="columns"
      :size="$editorUtil.itemStyle.itemInputSize"
      border
      highlight-row
    >
      <template slot-scope="{ row, index }" slot="destSlot">
        <Select
          style="width: 100%"
          transfer
          :value="row.dest"
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="updateTableRow(row, index)"
        >
          <Option :value="1">{{ 1 }}</Option>
          <Option :value="2">{{ 2 }}</Option>
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="srcTypeSlot">
        <Select
          style="width: 100%"
          transfer
          :value="row.srcType"
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="updateTableRow(row, index)"
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
          transfer
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="updateTableRow(row, index)"
        >
          <Option :value="1">{{ 1 }}</Option>
          <Option :value="2">{{ 2 }}</Option>
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="actionSlot">
        <Button
          type="primary"
          :size="$editorUtil.itemStyle.itemInputSize"
          @click="addNewRow(index)"
          >新增</Button
        >
        <Button
          type="error"
          :size="$editorUtil.itemStyle.itemInputSize"
          @click="removeRow(index)"
          >移除</Button
        >
      </template>
    </Table>
  </div>

  <!-- </Modal> -->
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("ruleEditorStore");

export default {
  name: "RuleSettingInputEntityFieldMapping",
  props: {
    data: Array,
    showModal: Boolean,
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
          title: "目标",
          key: "dest",
          slot: "destSlot",
        },
        {
          title: "来源类型",
          key: "srcType",
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
          width: 140,
        },
      ],
      srcTypes: [
        { name: "字段", value: "field" },
        { name: "表达式", value: "expression" },
      ],
    };
  },
  computed: {
    ...mapState(["ruleMetaData"]),
    settingDataTable() {
      return this.data;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    show(context) {
      this.dataContext = context;
      this.visible = true;
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
      debugger;
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