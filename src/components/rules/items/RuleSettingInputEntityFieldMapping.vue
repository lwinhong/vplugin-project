<template>
  <div>
    <div>
      <span>来源实体: </span>
      <Select
        :size="$editorUtil.itemStyle.itemInputSize"
        style="width: 210px"
        @on-change="onSourceTypeChanged"
        v-model="selectedSourceType"
      >
        <Option
          v-for="item in sourceTypeItems"
          :value="item.value"
          :key="item.value"
          >{{ item.name }}</Option
        >
      </Select>
      <Select
        :size="$editorUtil.itemStyle.itemInputSize"
        v-model="selectedEntity"
        style="width: 210px"
        @on-change="onSourceEntityChanged"
      >
        <Option
          v-for="item in sourceEntityItems"
          :value="item.value"
          :key="item.value"
          >{{ item.name }}</Option
        >
      </Select>
    </div>
    <div>
      <Button
        type="text"
        :size="$editorUtil.itemStyle.itemInputSize"
        icon="md-add"
        @click="addNewRow"
      >
        新增</Button
      >
      <Divider type="vertical" :size="$editorUtil.itemStyle.itemInputSize" />
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
        @click="clear"
        >清空</Button
      >
    </div>
    <Table
      :data="settingDataTable"
      :columns="columns"
      :size="$editorUtil.itemStyle.itemInputSize"
      border
      highlight-row
      @on-current-change="tableCurrentChange"
    >
      <template slot-scope="{ row, index }" slot="paramEntityFieldSlot">
        <Select
          style="width: 100%"
          transfer
          :value="row.paramEntityField"
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="
            row.paramEntityField = $event;
            updateTableRow(row, index);
          "
        >
          <Option
            v-for="item in targetItems"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="fieldValueTypeSlot">
        <Select
          style="width: 100%"
          transfer
          :value="row.fieldValueType"
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="onFieldValueTypeChanged($event, row, index)"
        >
          <Option
            v-for="item in srcTypes"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="fieldValueSlot">
        <div v-if="row.fieldValueType == 'expression'">
          <span>{{ row.fieldValue }}</span>
          <Button
            icon="md-open"
            type="text"
            :size="$editorUtil.itemStyle.itemInputSize"
            @click="openExpressionEditor(row, index)"
          ></Button>
        </div>
        <Select
          v-else
          style="width: 100%"
          transfer
          :value="row.fieldValue"
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="
            row.fieldValue = $event;
            updateTableRow(row, index);
          "
        >
          <Option
            v-for="item in sourceEntityFields"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="actionSlot">
        <!-- <Button
          type="primary"
          :size="$editorUtil.itemStyle.itemInputSize"
          @click="addNewRow(index)"
          >新增</Button
        > -->
        <Button
          type="error"
          :size="$editorUtil.itemStyle.itemInputSize"
          @click="removeRow(index, row.id)"
          >移除</Button
        >
      </template>
    </Table>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("ruleEditorStore");

export default {
  name: "RuleSettingInputEntityFieldMapping",
  props: {
    data: Array,
    showModal: Boolean,
    itemData: [Object, Array],
  },
  model: {
    prop: "showModal",
    event: "change",
  },
  mounted() {
    let items = new Array();
    let meta = this.getInputMetaInfo()(this.itemData.editorKey);
    if (meta && meta.entityInfo && meta.entityInfo.entityField) {
      meta.entityInfo.entityField.forEach((entity) => {
        items.push({
          name: entity.code + (entity.name ? "(" + entity.name + ")" : ""),
          value: entity.code,
        });
      });
    }
    this.targetItems = items;
  },
  data() {
    // 这里存放数据
    return {
      visible: false,
      columns: [
        {
          title: "目标",
          key: "paramEntityField",
          slot: "paramEntityFieldSlot",
        },
        {
          title: "来源类型",
          key: "fieldValueType",
          width: 120,
          slot: "fieldValueTypeSlot",
        },
        {
          title: "来源",
          key: "fieldValue",
          slot: "fieldValueSlot",
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
        { name: "表达式", value: "expression" },
      ],
      currentRow: null,
      sourceTypeItems: [],
      sourceEntityItems: [],
      sourceEntityFields: [],
      selectedSourceType: "",
      selectedEntity: "",
      targetItems: [],
    };
  },
  computed: {
    ...mapState(["ruleMetaData"]),
    settingDataTable() {
      return this.data;
    },
  },
  // 方法集合
  methods: {
    ...mapGetters(["getInputMetaInfo"]),
    clear() {
      this.settingDataTable.splice(0, this.settingDataTable.length);
    },
    tableCurrentChange(currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
    },
    addNewRow(index) {
      let item = this.newRow();
      this.settingDataTable.push(item);
    },
    removeRow(index, id) {
      for (let i = 0; i < this.settingDataTable.length; i++) {
        const element = this.settingDataTable[i];
        if (element.id == id) {
          this.settingDataTable.splice(i, 1);
          break;
        }
      }
    },
    newRow() {
      let item = {
        id: uuidv4(),
        paramEntityField: "",
        fieldValueType: "field", //来源的类型 expression ，field
        fieldValue: "",
      };
      return item;
    },
    updateTableRow(row, index) {
      this.settingDataTable[index] = row;
    },
    loadInputSource() {
      let _this = this;
      this.$editorUtil.loadInputSourceDetails().then((items) => {
        let returnValue = [];
        if (items) {
          for (const key in items) {
            if (items.hasOwnProperty(key)) {
              const item = items[key];
              returnValue.push({
                name: item.text,
                value: key,
                details: item.value,
              });
            }
          }
        }
        this.sourceTypeItems = returnValue;
      });
    },
    onSourceTypeChanged(sourceValue) {
      this.sourceEntityItems = [];
      this.sourceEntityFields = [];
      this.selectedEntity = "";
      for (let i = 0; i < this.sourceTypeItems.length; i++) {
        const item = this.sourceTypeItems[i];
        if (item.value == sourceValue && item.details) {
          let entities = [];
          item.details.forEach((en) => {
            entities.push({ name: en.CodeName, value: en.Code });
          });
          this.sourceEntityItems = entities;
          break;
        }
      }
    },
    onSourceEntityChanged(entityCode) {
      this.$editorUtil
        .getEntityFields(this.selectedSourceType, entityCode)
        .then((items) => {
          let returnValue = [];
          debugger;
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
          this.sourceEntityFields = returnValue;
        });
    },
    onFieldValueTypeChanged(value, row, index) {
      row.fieldValue = "";
      row.fieldValueType = value;
      this.updateTableRow(row, index);
    },
    openExpressionEditor(row, index) {
      let _this = this;
      if (window.vPlugin) {
        let callBack = (expression) => {
          row.fieldValue = expression;
          _this.updateTableRow(row, index);
        };
        window.vPlugin.execute(
          "openExpression",
          row.srcCode,
          //_this.itemData.type,
          callBack
        );
      }
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