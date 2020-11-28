<template>
  <item-template :itemData="itemData" @onSettingClick="onSettingClick">
    <!-- <template v-slot:header ="scope">
        {{scope}}
    </template> -->
    <template v-slot:content>
      <Checkbox v-model="value">{{ itemData.remark }}</Checkbox>
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
      value: false,
    };
  },
  props: {
    itemData: [Object, Array],
  },
  mounted() {
    this.value = Boolean(this.itemData.userData || this.itemData.default);
  },
  // 方法集合
  methods: {
    save() {
      let result = {};
      result[this.itemData.editorKey] = this.value;
      //result.dataCheck = true;
      return result;
    },
    onSettingClick(cmd) {
      switch (cmd) {
        case "reset":
          this.value = Boolean(this.itemData.default);
          break;
      }
    },
  },
};
</script>