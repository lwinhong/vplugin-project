<template>
  <div>
    <div>
      <span>来源实体: </span>
      <Select
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
    <div class="tableToolbar">
      <Button
        type="text"
        icon="md-add"
        @click="addNewRow"
      >
        新增</Button
      >
      <Button v-show="false"
        type="text"
        icon="md-done-all"
        >引入全部</Button
      >
      <Button
        type="text"
        icon="md-close"
        @click="clear"
        >清空</Button
      >
    </div>
    <Table
      :data="settingDataTable"
      :columns="columns"
      border
      highlight-row
      @on-current-change="tableCurrentChange"
    >
      <template slot-scope="{ row, index }" slot="paramEntityFieldSlot">
        <Select
          transfer
          :value="row.paramEntityField"
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
          transfer
          v-model="row.fieldValueType"
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
          <Input
            v-model="row.fieldValue "
            placeholder="未设置"
            readonly
          >
            <Button
              icon="md-open"
              slot="append"
              @click="openExpressionEditor(row, index)"
            ></Button
          ></Input>
        </div>
        <Select
          v-else
          transfer
          v-model="row.fieldValue"
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
        <Button
          slot="append"
          type="error"
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
          type: entity.type,
        });
      });
    }
    //加载 目标 选项（来自规则元数据）
    this.targetItems = items;

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
      //来源来源实体类型
      _this.sourceTypeItems = returnValue;
    });
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
        { name: "实体字段", value: "field" },
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
      // for (let i = 0; i < this.settingDataTable.length; i++) {
      //   const element = this.settingDataTable[i];
      //   if (element.id == id) {
      //     this.settingDataTable.splice(i, 1);
      //     break;
      //   }
      // }
      this.settingDataTable.splice(index, 1);
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
    /**
     * 加载当前窗体数据（下拉项、数据还原等），在这窗体显示的时候调用
     */
    load(settingData) {
      this.selectedSourceType = settingData.paramSourceType;
      this.onSourceTypeChanged(this.selectedSourceType);

      this.selectedEntity = settingData.paramSourceValue;
      this.onSourceEntityChanged(this.selectedEntity);
    },
    /**
     * 来数据类型改变- 加载改来源的实体选项
     */
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

    /**
     * 实体改变，加载他的字段（列表中的来源列的下拉候选项）
     */
    onSourceEntityChanged(entityCode) {
      this.$editorUtil
        .getEntityFields(this.selectedSourceType, entityCode)
        .then((items) => {
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