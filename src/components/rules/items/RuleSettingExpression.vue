<template>
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
        style="width:210px;"
        :size="$editorUtil.itemStyle.itemInputSize"
      >
        <Button
          slot="append"
          icon="md-open"
          :size="$editorUtil.itemStyle.itemInputSize"
          @click="onPopup"
        />
      </Input>
      <!-- </Poptip> -->
    </template>
  </item-template>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  //  components: { RuleSettingOuptSetting },
  data() {
    // 这里存放数据
    return {
      value: "",
      valueDisplay: "",
      popupType: "openExpression",
    };
  },
  props: {
    itemData: [Object, Array],
  },
  // 方法集合
  methods: {
    save() {
      let result = this.$editorUtil.saveSimpleCommon(this.itemData, this.value);
      return result;
    },
    onPopup() {
      console.log(this.popupType);
      if (window.vPlugin) {
        const _this = this;
        let callBack = function callback(returnValue) {
          _this.value = returnValue;
        };
        window.vPlugin.execute(
          this.popupType,
          this.value,
          this.itemData.type,
          callBack
        );
      }
    },
    onSettingClick(cmd) {
      switch (cmd) {
        case "reset":
          this.value = this.itemData.default;
          break;
      }
    },
  },
  mounted() {
    this.value =
      this.itemData.userData.paramSourceValue || this.itemData.default || "";
  },
  watch: {
    value(newValue, oldValue) {
      this.valueDisplay = newValue ? "已设置" : "";
    },
  },
};
</script>