<template>
  <div
    class="item-container"
    @click="onItemClick"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div
      class="item-cont"
      :class="{ 'item-contSelected': isSelected || isHover }"
    >
      <div class="item-title">
        <span class="item-name">{{ itemData.name }}:</span>
        <span>{{ itemData.description }}</span>
        <slot name="header" :headerData="itemData" />
      </div>
      <div class="item-detail">
        <slot name="content"></slot>
      </div>
      <div class="item-footer">
        <slot name="footer"></slot>
        <slot name="validate"></slot>
      </div>
    </div>
    <div class="setting-toolbar-container" v-show="isSelected || isHover">
      <Dropdown
        trigger="click"
        placement="bottom-start"
        @on-click="onSettingClick"
      >
        <a href="javascript:void(0)">
          <Icon type="md-settings" size="18"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="reset">重置</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("ruleEditorStore");
export default {
  computed: {
    ...mapState(["currentItemIndex"]),
    isSelected() {
      return this.currentItemIndex == this.itemData.index;
    },
  },
  methods: {
    ...mapActions(["setCurrentItemIndexAction"]),
    onItemClick() {
      this.setCurrentItemIndexAction(this.itemData.index);
    },
    onSettingClick(cmd) {
      this.$emit("onSettingClick", cmd);
    },
  },
  props: {
    itemData: [Object, Array],
  },
  data() {
    return {
      isHover: false,
    };
  },
};
</script>