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
            @click="openEntityFieldMappingEditor"
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
      title="活动集参数映射"
      :width="800"
      @on-ok="onEntityFieldMappingOk"
    >
      <RuleSettingInputEntityFieldMapping
        :data="settingDataTable"
        ref="entityFieldMapping"
    /></Modal>
  </div>
</template>
<script>
//import RuleSettingEntityFieldMapping from "../ruleCommonEditor/RuleSettingEntityFieldMapping";
export default {
  name: "RuleSettingInputCopy",
  //components: { RuleSettingEntityFieldMapping },
  props: {
    itemData: [Object, Array],
  },
  data() {
    return {
      mappingModalVisible: false,
      value: "",
      valueDisplay: "",
      popupType: "inputCopy",
      /*保存的数据*/
      settingData: [],
      settingDataTable: [],
    };
  },
  methods: {
    save() {
      let result = {};
      result.paramCode = this.itemData.editorKey; //来源，也是元数据key，固定
      if (this.settingData && this.settingData.length > 0) {
        let settingData = this.settingData[0];

        result.paramSourceValue = settingData.paramSourceValue;
        result.paramSourceType = settingData.paramSourceType;
        result.paramFieldMapping = settingData.paramFieldMapping;
      }
      return result;
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
    onEntityFieldMappingOk() {
      debugger
      this.settingData = this.$editorUtil.deepCopy(this.settingDataTable);
      //this.mappingModalVisible = false;
    },

    openEntityFieldMappingEditor(row, index) {
      //let _this = this;
      // this.$refs.entityFieldMapping.show({
      //   row,
      //   index,
      // });
      this.settingDataTable = this.$editorUtil.deepCopy(this.settingData);
      this.mappingModalVisible = true;
    },

    getEmptyInConfig() {
      return {
        dest: "",
        srcType: "returnValue", //来源类型 returnValue，expression
        srcCode: this.itemData.editorKey,
        srcSetting: "",
        destFieldMapping: null,
      };
    },
  },

  mounted() {
    this.value =
      this.itemData.userData.paramSourceValue || this.itemData.default || "";
    this.settingData = [this.getEmptyInConfig()];
  },
  watch: {
    settingData: {
      handler(newValue, oldValue) {
        this.valueDisplay = newValue[0].dest != "" ? "已设置" : "";
      },
      deep: true,
    },
  },
};
</script>