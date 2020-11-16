<template>
  <div class="box">
    <Row>
      <Col span="24" v-for="(val, name, index) in ruleMetaData" :key="index">
        <template v-if="editorUtil.IsBooleanEditor(val)">
          <rule-setting-checkbox :itemData="val" :ref="getItemKey(index)" />
        </template>
        <template v-else-if="editorUtil.IsSelectEditor(val)">
          <rule-setting-select :itemData="val" :ref="getItemKey(index)" />
        </template>
        <template v-else-if="editorUtil.IsDateTimeEditor(val)">
          <rule-setting-date :itemData="val" :ref="getItemKey(index)" />
        </template>
        <template v-else-if="editorUtil.IsExpressionEditor(val)">
          <rule-setting-expression :itemData="val" :ref="getItemKey(index)" />
        </template>
        <template v-else-if="editorUtil.IsNumberEditor(val)">
          <rule-setting-number :itemData="val" :ref="getItemKey(index)" />
        </template>
        <template v-else>
          <RuleSettingInput :itemData="val" :ref="getItemKey(index)" />
        </template>
      </Col>
    </Row>
    <!-- <Spin size="large" fix v-if="!allDone"></Spin> -->
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("ruleEditorStore");

export default {
  computed: {
    ...mapState(["ruleMetaData", "allDone"]),
    editorUtil() {
      return this.$editorUtil;
    },
  },
  methods: {
    onSelected(index) {
      this.selectedIndex = -1;
    },
    validate() {
      let result = [];
      let index = 0;
      //收集各个item的值,生成指定的数据格式
      for (const key in this.ruleMetaData) {
        if (this.ruleMetaData.hasOwnProperty(key)) {
          const refName = this.getItemKey(index);
          const vueInstance = this.$refs[refName][0];
          if (vueInstance) {
            let message = null;
            if (vueInstance.validateValue) {
              message = vueInstance.validateValue();
            } else if (vueInstance.itemData) {
              message = this.$editorUtil.validate(
                vueInstance.itemData.valueValidation,
                vueInstance.value
              );
            }
            if (message) {
              const metaData = this.ruleMetaData[key];
              result.push({
                key: key,
                name: metaData.name,
                message,
              });
            }
          }
        }
        index++;
      }

      return result;
    },
    save() {
      let result = {};
      let index = 0;

      //收集各个item的值,生成指定的数据格式
      for (const key in this.ruleMetaData) {
        if (this.ruleMetaData.hasOwnProperty(key)) {
          const element = this.ruleMetaData[key];
          const refName = this.getItemKey(index);
          const itemValue = this.$refs[refName][0].save();
          if (itemValue) {
            Object.assign(result, itemValue);
            index++;
          }
        }
      }
      return result;
    },
    getItemKey(index) {
      return "item" + index;
    },
    getItemObj(item, name, index) {
      item.index = index;
      item.editorType = name;
      return item;
    },
  },
  data() {
    return {
      selectedIndex: -1,
    };
  },
};
</script>
