<template>
  <div class="box">
    <Row>
      <Col span="24" v-for="(val, name, index) in ruleMetaData" :key="index">
        <RuleSettingCheckbox
          v-if="editorUtil.IsBooleanEditor(val)"
          :itemData="val"
          :ref="getItemKey(index)"
        />
        <RuleSettingSelect
          v-else-if="editorUtil.IsSelectEditor(val)"
          :itemData="val"
          :ref="getItemKey(index)"
        />
        <RuleSettingDate
          v-else-if="editorUtil.IsDateTimeEditor(val)"
          :itemData="val"
          :ref="getItemKey(index)"
        />
        <RuleSettingExpression
          v-else-if="editorUtil.IsExpressionEditor(val)"
          :itemData="val"
          :ref="getItemKey(index)"
        />
        <RuleSettingNumber
          v-else-if="editorUtil.IsNumberEditor(val)"
          :itemData="val"
          :ref="getItemKey(index)"
        />
        <RuleSettingCustom
          v-else-if="editorUtil.IsCustomEditor(val)"
          :itemData="val"
          :ref="getItemKey(index)"
        />
        <RuleSettingEntity
          :itemData="val"
          v-else-if="editorUtil.IsEntityEditor(val)"
          :ref="getItemKey(index)"
        />
        <RuleSettingInput v-else :itemData="val" :ref="getItemKey(index)" />
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
      //校验各个item的值
      for (const key in this.ruleMetaData) {
        if (this.ruleMetaData.hasOwnProperty(key)) {
          const refName = this.getItemKey(index);
          const vueInstance = this.$refs[refName][0];
          if (vueInstance) {
            let message = null;
            if (vueInstance.validateValue) {
              //自己校验
              message = vueInstance.validateValue();
            } else if (vueInstance.itemData) {
              //公共统一的校验
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
      item.editorKey = name;
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
