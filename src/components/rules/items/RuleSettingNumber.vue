<template>
  <item-template :itemData="itemData" @onSettingClick="onSettingClick" :value="value">
    <!-- <template v-slot:header ="scope">
        {{scope}}
    </template> -->
    <template v-slot:content>
      <InputNumber
        v-model="value"
        placeholder="请输入..."
        style="width: 300px"
        :precision="precision"
      ></InputNumber>
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
      value: 0,
      precision: 0,
    };
  },
  props: {
    itemData: [Object, Array]
  },
  mounted() {
    this.value = Number(this.itemData.userData || this.itemData.default);
    //this.precision = 0;
  },
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
          this.value = Number(this.itemData.default);
          break;
      }
    },
  },
};
</script>