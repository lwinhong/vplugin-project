<template>
  <item-template
    :itemData="itemData"
    @onSettingClick="onSettingClick"
    :value="value"
  >
    <template v-slot:content>
      <Input
        v-model="value"
        placeholder="请输入..."
        :type="inputType"
        clearable
        :size="$editorUtil.itemStyle.itemInputSize"
        :autosize="{ minRows: 2, maxRows: 6 }"
      />
    </template>
  </item-template>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  name: "RuleSettingChar",
  data() {
    // 这里存放数据
    return {
      value: "",
      //validateMsg: null,
      devHtml: "",
      inputType: "text",
    };
  },
  props: {
    itemData: [Object, Array],
  },
  mounted() {
    this.value = this.itemData.userData.paramSourceValue || this.itemData.default || "";
    //this.devHtml="<button>132</button>"
  },
  methods: {
    save() {
      let result = this.$editorUtil.saveSimpleCommon(this.itemData, this.value);
      return result;
    },
    onSettingClick(cmd) {
      switch (cmd) {
        case "reset":
          this.value = this.itemData.default;
          break;
      }
    },
    // validateValue() {
    //   let result = this.$editorUtil.validate(
    //     this.itemData.valueValidation,
    //     this.value
    //   );
    //   return result;
    // },
  },
  // watch: {
  //   value(newValue, oldValue) {
  //     if (this.itemData.valueValidation) {
  //       this.validateMsg = this.$editorUtil.validate(
  //         this.itemData.valueValidation,
  //         newValue
  //       );
  //     }
  //   },
  // },
};
</script>