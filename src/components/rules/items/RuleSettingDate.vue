<template>
  <item-template :itemData="itemData" @onSettingClick="onSettingClick">
    <template v-slot:content>
      <DatePicker
        :type="dateType"
        :format="dateFormat"
        placement="bottom-end"
        placeholder="请选择日期"
        v-model="value"
      ></DatePicker>
    </template>
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
      dateFormat: "yyyy-MM-dd",
      dateType: "date",
    };
  },
  props: {
    itemData: [Object, Array],
  },
  mounted() {
    this.value = this.itemData.userData
      ? this.itemData.userData.paramSourceValue
      : this.itemData.default;
  },
  // 方法集合
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
  },
};
</script>