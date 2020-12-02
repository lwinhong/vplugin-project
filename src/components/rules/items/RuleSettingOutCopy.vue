<template>
  <div>
    <item-template
      :itemData="itemData"
      @onSettingClick="onSettingClick"
      :value="value"
    >
      <template v-slot:content>
        <Input
          v-model="valueDisplay"
          placeholder="未设置"
          readonly
          :size="$editorUtil.itemStyle.itemInputSize"
          style="width: 210px"
        >
          <Button
            slot="append"
            icon="md-open"
            @click="onPopup"
            :size="$editorUtil.itemStyle.itemInputSize"
          />
          <!-- <Poptip
          trigger="hover"
          title="详细配置"
          :content="value"
          placement="bottom-start"
        > -->
          <!-- </Poptip> -->
        </Input>
      </template>
    </item-template>
    <Modal
      v-model="mappingModalVisible"
      mask
      :mask-closable="false"
      title="方法实体字段映射"
      :width="800"
      @on-ok="mappingOk"
    >
      <RuleSettingOutParamsEditor :data="settingDataTable" :context="itemData"
    /></Modal>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("ruleEditorStore");
//import RuleSettingOutParamsEditor from "../ruleCommonEditor/RuleSettingOutParamsEditor";
export default {
  name: "RuleSettingOutCopy",
  //components: { RuleSettingOutParamsEditor },
  props: {
    itemData: [Object, Array],
  },
  data() {
    return {
      mappingModalVisible: false,
      value: "",
      valueDisplay: "",
      popupType: "outCopy",
      /*保存的数据*/
      settingData: [],

      /*保存的数据*/
      settingDataTable: [],
    };
  },
  methods: {
    ...mapGetters(["getDestDetails", "getOutputMetaInfo"]),
    save() {
      let result = {};
      result.srcCode = this.itemData.editorKey; //来源，也是元数据key，固定
      if (this.settingData && this.settingData.length > 0) {
        let settingData = this.settingData[0];

        result.srcType = settingData.srcType;
        result.dest = settingData.dest;
        result.destType = settingData.destType;
        if (settingData.hasOwnProperty("destFieldMapping")) {
          let mappings = new Array();

          if (settingData.destFieldMapping != null) {
            for (
              let index = 0;
              index < settingData.destFieldMapping.length;
              index++
            ) {
              const element = settingData.destFieldMapping[index];
              let map = {};
              map.destField = element.destField;
              map.destType = element.destType;
              map.srcValueType = element.srcValueType;
              map.srcValue = element.srcValue;
              mappings.push(map);
            }
            result.destFieldMapping = mappings;
          }
        }
      }
      return result;
    },
    onPopup() {
      this.settingDataTable = this.$editorUtil.deepCopy(this.settingData);
      this.mappingModalVisible = true;
    },
    onSettingClick(cmd) {
      switch (cmd) {
        case "reset":
          this.value = this.itemData.default;
          break;
      }
    },
    getItemName(items, key) {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.value == key) return item.name;
      }
      return key;
    },
    mappingOk() {
      debugger;
      this.settingData = this.$editorUtil.deepCopy(this.settingDataTable);
    },
    getEmptyOutConfig() {
      return {
        dest: "",
        destType: "",
        srcType: "returnValue", //来源类型 returnValue，expression
        srcCode: this.itemData.editorKey,
        srcSetting: "",
        destFieldMapping: null,
      };
    },
  },

  mounted() {
    debugger;
    this.value = this.itemData.userData || this.itemData.default || "";
    let empty = this.getEmptyOutConfig();
    empty.destFieldMapping = this.itemData.userData
      ? this.itemData.userData.destFieldMapping
      : null;
    this.settingData = [empty];
  },
  watch: {
    settingData: {
      handler(newValue, oldValue) {
        debugger;
        if (newValue[0].srcType == "returnValue") {
          this.valueDisplay = newValue[0].dest ? "已设置" : "";
          let info = this.getOutputMetaInfo(newValue[0].srcCode);
          if (info.type == "entity") {
            this.valueDisplay = newValue[0].destFieldMapping ? "已设置" : "";
          } else {
            this.valueDisplay = newValue[0].dest ? "已设置" : "";
          }
        }
      },
      deep: true,
    },
  },
};
</script>