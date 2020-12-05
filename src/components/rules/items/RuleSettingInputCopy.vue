<template>
  <div>
    <item-template
      :itemData="itemData"
      @onSettingClick="onSettingClick"
      :value="value"
    >
      <template v-slot:content>
        <!-- <Poptip
          trigger="hover"
          title="详细配置"
          :content="value"
          placement="bottom-start"
        > -->
        <Input
          v-model="valueDisplay"
          placeholder="未设置"
          readonly
          style="width: 210px"
        >
          <Button
            slot="append"
            icon="md-open"
            @click="openEntityFieldMappingEditor"
          />
        </Input>
        <!-- </Poptip> -->
      </template>
    </item-template>
    <Modal
      v-model="mappingModalVisible"
      mask
      :mask-closable="false"
      title="规则入参设置"
      :width="800"
      @on-ok="onEntityFieldMappingOk"
    >
      <RuleSettingInputEntityFieldMapping
        :data="mappingData"
        :itemData="itemData"
        ref="entityFieldMapping"
    /></Modal>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "RuleSettingInputCopy",
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
      settingData: {
        paramSourceValue: "",
        paramSourceType: "",
        paramCode: "",
        paramFieldMapping: null,
      },
      mappingData: [],
    };
  },
  methods: {
    save() {
      let result = {};
      result.paramCode = this.itemData.editorKey; //来源，也是元数据key，固定
      result.paramSourceValue = this.settingData.paramSourceValue;
      result.paramSourceType = this.settingData.paramSourceType;
      result.paramFieldMapping = this.settingData.paramFieldMapping;

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
      let mappings = [];
      if (this.mappingData) {
        this.mappingData.forEach((mapping) => {
          mappings.push({
            paramEntityField: mapping.paramEntityField,
            fieldValueType: mapping.fieldValueType,
            fieldValue: mapping.fieldValue,
          });
        });
      }
      let mappingEditor = this.$refs.entityFieldMapping;

      this.settingData.paramFieldMapping = mappings.length > 0 ? mappings : null;
      this.settingData.paramSourceValue = mappingEditor.selectedEntity;
      this.settingData.paramSourceType = mappingEditor.selectedSourceType;

      this.mappingData = [];
    },

    openEntityFieldMappingEditor(row, index) {
      let mapping = [];
      if (this.settingData.paramFieldMapping) {
        this.settingData.paramFieldMapping.forEach((item) => {
          mapping.push({
            id: uuidv4(),
            paramEntityField: item.paramEntityField,
            fieldValueType: item.fieldValueType,
            fieldValue: item.fieldValue,
          });
        });
      }

      this.mappingData = mapping;
      this.$refs.entityFieldMapping.load(this.settingData);
      this.mappingModalVisible = true;
    },
  },

  mounted() {
    this.value = this.itemData.userData
      ? this.itemData.userData.paramSourceValue
      : this.itemData.default;

    this.settingData.paramCode = this.itemData.editorKey;

    if (this.itemData.userData) {
      this.settingData.paramSourceValue = this.itemData.userData.paramSourceValue;
      this.settingData.paramSourceType = this.itemData.userData.paramSourceType;
      if (this.itemData.userData.paramFieldMapping) {
        this.settingData.paramFieldMapping = this.itemData.userData.paramFieldMapping;
      }
    }
  },
  watch: {
    settingData: {
      handler(newValue, oldValue) {
        this.valueDisplay = newValue.paramFieldMapping ? "已设置" : "";
      },
      deep: true,
    },
  },
};
</script>