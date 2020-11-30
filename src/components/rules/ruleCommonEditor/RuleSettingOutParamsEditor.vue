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
      :size="$editorUtil.itemStyle.itemInputSize"
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
        </Dropdown>
      </template>
      <template slot-scope="{ row, index }" slot="destSlot">
        <Dropdown trigger="click" transfer v-if="row.destType != 'control'">
          <a>
            <span>{{ row.dest ? row.dest : "请选择" }} </span>
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
        <template v-else>
          <span>{{ row.dest ? row.dest : "未配置" }}</span>
          <Button
            icon="md-open"
            type="text"
            :size="$editorUtil.itemStyle.itemInputSize"
            @click="openControlSelector(row, row.dest)"
          ></Button>
        </template>
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
      <template slot-scope="{ row, index }" slot="srcSettingSlot">
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
          @click="openEntityFieldMappingEditor(row, index)"
        ></Button>
      </template>
    </Table>
    <RuleSettingEntityFieldMapping
      ref="entityFieldMapping"
      @on-ok="onEntityFieldMappingOk"
    />
  </Modal>
</template>

<script>
const srcTypeExpression = { name: "表达式", value: "expression" };
const srcTypeReturnValue = { name: "返回值", value: "returnValue" };
import RuleSettingEntityFieldMapping from "./RuleSettingEntityFieldMapping";

export default {
  name: "RuleSettingOutParamsEditor",
  components: { RuleSettingEntityFieldMapping },
  props: {
    data: Array,
    showModal: Boolean,
    context: [Object, Array, String],
  },
  model: {
    prop: "showModal",
    event: "change",
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
        },
        {
          title: "来源",
          key: "srcSetting",
          align: "center",
          slot: "srcSettingSlot",
        },
      ],
    };
  },
  // 方法集合
  methods: {
    ok() {
      this.$emit("change", false);
      this.$emit("ok", this.settingDataTable);
    },
    cancel() {
      this.$emit("change", false);
      this.$emit("cancel");
    },
    getItemName(items, key) {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.value == key) return item.name;
      }
      return key;
    },
    openEntityFieldMappingEditor(row, index) {
      //let _this = this;
      this.$refs.entityFieldMapping.show({
        row,
        index,
      });
    },
    onEntityFieldMappingOk(context, mapping) {
      context.row.destFieldMapping = mapping;
      _this.updateTableRow(context.row, context.index);
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
    openControlSelector(row, selectedControl) {},
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