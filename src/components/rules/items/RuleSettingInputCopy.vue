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
    <RuleSettingEntityFieldMapping
      :showModal="mappingModalVisible"
      :data="settingData"
      ref="entityFieldMapping"
      @on-ok="onEntityFieldMappingOk"
    />
  </div>
</template>
<script>
import RuleSettingEntityFieldMapping from "../ruleCommonEditor/RuleSettingEntityFieldMapping";
export default {
  name: "RuleSettingInputCopy",
  components: { RuleSettingEntityFieldMapping },
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
    onEntityFieldMappingOk(settingDataTable) {
      this.settingData = this.$editorUtil.deepCopy(settingDataTable);
      //this.mappingModalVisible = false;
    },

    openEntityFieldMappingEditor(row, index) {
      //let _this = this;
      this.$refs.entityFieldMapping.show({
        row,
        index,
      });
    },
    getEmptyOutConfig() {
      return {
        dest: "",
        destType: "entity",
        srcType: "returnValue", //来源类型 returnValue，expression
        srcCode: this.itemData.editorKey,
        srcSetting: "",
        destFieldMapping: null,
      };
    },
  },

  mounted() {
    this.value = this.itemData.userData.paramSourceValue || this.itemData.default || "";
    this.settingData = [this.getEmptyOutConfig()];
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