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
        style="width: 300px"
        readonly
      >
        <Button slot="append" icon="md-open" @click="onPopup" />
      </Input>
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
      popupType:"openExpression"
    };
  },
  props: {
    itemData: [Object, Array],
  },
  // 方法集合
  methods: {
    save() {
      let result = {};
      result[this.itemData.editorKey] = this.value;
      //result.dataCheck = true;
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
    this.value = this.itemData.userData || this.itemData.default || "";
  },
};
</script>