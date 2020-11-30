<template>
  <div class="box">
    <Row :gutter="56">
      <Col :span="colSpan">
        <h5>参数设置</h5>
        <Row>
          <Col
            span="24"
            v-for="(val, name, index) in ruleMetaData.inputs"
            :key="index"
          >
            <RuleSettingBoolean
              v-if="editorUtil.IsBooleanEditor(val)"
              :itemData="val"
              :ref="getItemKey(index)"
            />
            <RuleSettingDropdown
              v-else-if="editorUtil.IsDropdownEditor(val)"
              :itemData="val"
              :ref="getItemKey(index)"
            />
            <RuleSettingDate
              v-else-if="editorUtil.IsDateEditor(val)"
              :itemData="val"
              :ref="getItemKey(index)"
            />
            <RuleSettingLongDate
              v-else-if="editorUtil.IsLongDateEditor(val)"
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
            <RuleSettingInteger
              v-else-if="editorUtil.IsIntegerEditor(val)"
              :itemData="val"
              :ref="getItemKey(index)"
            />
            <RuleSettingInputCopy
              :itemData="val"
              v-else-if="editorUtil.IsInputEntityEditor(val)"
              :ref="getItemKey(index)"
            />
            <RuleSettingText
              :itemData="val"
              v-else-if="editorUtil.IsTextEditor(val)"
              :ref="getItemKey(index)"
            />
            <RuleSettingCustom
              v-else-if="editorUtil.IsCustomEditor(val)"
              :itemData="val"
              :ref="getItemKey(index)"
            />
            <RuleSettingChar v-else :itemData="val" :ref="getItemKey(index)" />
          </Col>
        </Row>
      </Col>
      <Col :span="colSpan" v-if="ruleMetaData.outputs">
        <h5>返回值设置</h5>
        <Row>
          <Col
            span="24"
            v-for="(val, name, index) in ruleMetaData.outputs"
            :key="index"
          >
            <RuleSettingOutCopy
              :itemData="val"
              :ref="getItemKey(index, outputTypeCode)"
            />
          </Col>
        </Row>
      </Col>
    </Row>
    <!-- <Spin size="large" fix v-if="!allDone"></Spin> -->
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("ruleEditorStore");
const inputTypeCode = "ruleInputParams";
const outputTypeCode = "ruleOutputParams";
export default {
  computed: {
    ...mapState(["ruleMetaData", "allDone"]),
    editorUtil() {
      return this.$editorUtil;
    },
    colSpan() {
      return this.ruleMetaData.outputs ? 12 : 24;
    },
    outputTypeCode() {
      return outputTypeCode;
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
      let _this = this;

      let saveHandler = (metaData, saveArray, ruleType) => {
        if (!metaData) return;
        let index = 0;
        //收集各个item的值,生成指定的数据格式
        for (const key in metaData) {
          if (metaData.hasOwnProperty(key)) {
            const element = metaData[key];
            const refName = _this.getItemKey(index, ruleType);
            const itemValue = _this.$refs[refName][0].save();
            if (itemValue) {
              saveArray.push(itemValue);
            }
            index++;
          }
        }
      };

      if (this.ruleMetaData.inputs) {
        let inputs = [];
        saveHandler(this.ruleMetaData.inputs, inputs, inputTypeCode);
        result[inputTypeCode] = inputs;
      }

      if (this.ruleMetaData.outputs) {
        let outputs = [];
        saveHandler(this.ruleMetaData.outputs, outputs, outputTypeCode);
        result[outputTypeCode] = outputs;
      }

      return result;
    },
    /**
     * 获取生成item的key index 下标，ruleType：input、output
     */
    getItemKey(index, ruleType) {
      return "item_" + (ruleType || inputTypeCode) + index;
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
