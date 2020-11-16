<template>
  <item-template :itemData="itemData" @onSettingClick="onSettingClick">
    <template v-slot:content>
      <DatePicker
        type="date"
        placement="bottom-end"
        placeholder="请选择日期"
        style="width: 300px"
        v-model="value"
        format="yyyy-MM-dd"
      ></DatePicker>
    </template>
  </item-template>
</template>

<script>
import ItemTemplate from "../RuleSettingItemTemplate";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ItemTemplate },
  data() {
    // 这里存放数据
    return {
      value: "",
    };
  },
  props: {
    itemData: [Object, Array],
  },
  mounted() {
    this.value = this.itemData.userData || this.itemData.default || "";
  },
  // 方法集合
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
  },
};
</script>