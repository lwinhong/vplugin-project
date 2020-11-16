<template>
  <item-template :itemData="itemData" @onSettingClick="onSettingClick">
    <!-- <template v-slot:header ="scope">
        {{scope}}
    </template> -->
    <template v-slot:content>
      <Input
        v-model="value"
        placeholder="Enter something..."
        style="width: 300px"
      >
        <Button slot="append" icon="md-open" @click="onExpressionEdit" />
      </Input>
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
  // 方法集合
  methods: {
    save() {
      let result = {};
      result[this.itemData.editorType] = this.value;
      //result.dataCheck = true;
      return result;
    },
    onExpressionEdit() {
      alert("表达式");
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