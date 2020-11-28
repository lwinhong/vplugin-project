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
    <RuleSettingOutParamsEditor
      :data="settingData"
      :showModal="mappingModalVisible"
      @ok="mappingOk"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
import RuleSettingOutParamsEditor from "../ruleCommonEditor/RuleSettingOutParamsEditor";
export default {
  name: "RuleSettingOutCopy",
  components: { RuleSettingOutParamsEditor },
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
    };
  },
  methods: {
    save() {
      let result = {};
      result[this.itemData.editorKey] = this.value;
      return result;
    },
    onPopup() {
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
    mappingOk(settingDataTable) {
      this.settingData = this.$editorUtil.deepCopy(settingDataTable);
      this.mappingModalVisible = false;
    },
    onCancel() {
      this.mappingModalVisible = false;
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
    this.value = this.itemData.userData || this.itemData.default || "";
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