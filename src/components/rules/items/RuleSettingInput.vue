<template>
  <item-template
    :itemData="itemData"
    @onSettingClick="onSettingClick"
    :value="value"
  >
    <!-- <template v-slot:header ="scope">
        {{scope}}
    </template> -->
    <template v-slot:content>
      <Input
        v-model="value"
        placeholder="请输入..."
        style="width: 300px"
        clearable
      />
    </template>
    <!-- <span
      slot="validate"
      v-text="validateMsg"
      v-if="validateMsg"
      style="color: red"
    ></span> -->
    <!-- <Alert type="error" show-icon  v-text="validateMsg"  v-if="validateMsg" slot="validate"></Alert> -->
  </item-template>
</template>

<script>
//import ItemTemplate from "../RuleSettingItemTemplate";

export default {
  // import引入的组件需要注入到对象中才能使用
  //components: { ItemTemplate },
  data() {
    // 这里存放数据
    return {
      value: "",
      //validateMsg: null,
    };
  },
  props: {
    itemData: [Object, Array],
  },
  mounted() {
    this.value = this.itemData.userData || this.itemData.default || "";
  },
  methods: {
    save() {
      let result = {};
      result[this.itemData.editorType] = this.value;
      //result.dataCheck = true;
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