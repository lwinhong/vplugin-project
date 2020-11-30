<template>
  <Modal
    v-model="visible"
    mask
    :mask-closable="false"
    title="方法实体字段映射"
    :width="800"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <Table
      :data="settingDataTable"
      :columns="columns"
      :size="$editorUtil.itemStyle.itemInputSize"
    >
      <template slot-scope="{ row, index }" slot="destSlot">
        <Select style="width: 100%" transfer>
          <Option :value="1">{{ 1 }}</Option>
          <Option :value="2">{{ 2 }}</Option>
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="srcTypeSlot">
        <Select style="width: 100%" transfer>
          <Option :value="1">{{ 1 }}</Option>
          <Option :value="2">{{ 2 }}</Option>
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="srcSettingSlot">
        <Select style="width: 100%" transfer>
          <Option :value="1">{{ 1 }}</Option>
          <Option :value="2">{{ 2 }}</Option>
        </Select>
      </template>
    </Table>
  </Modal>
</template>

<script>
export default {
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
  computed: {
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
  },
  // 监控data中的数据变化
  watch: {
    showModal(newValue, oldValue) {
      this.visible = newValue;
    },
  },
};
</script>