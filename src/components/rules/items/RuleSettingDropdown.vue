<template>
  <item-template :itemData="itemData" @onSettingClick="onSettingClick">
    <!-- <template v-slot:header ="scope">
        {{scope}}
    </template> -->
    <template v-slot:content>
      <Select v-model="value">
        <Option
          v-for="item in itemData.dropdownData"
          :value="item.value"
          :key="item.value"
          >{{ item.display }}
        </Option>
      </Select>
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
    };
  },
  mounted() {
    this.value = this.itemData.userData
      ? this.itemData.userData.paramSourceValue
      : this.itemData.default;
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