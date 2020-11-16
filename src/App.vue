<template>
  <div id="app">
    <Index :ref="refIndex" />
    <!-- <router-view /> -->
    <!-- <div>123456798</div> -->
  </div>
</template>

<script>
import Index from "./components/Index";

export default {
  name: "App",
  components: {
    Index,
  },
  computed: {
    refIndex() {
      return "refIndex";
    },
    thisInstance() {
      return this.$refs[this.refIndex];
    },
  },
  methods: {
    validate(showMsg) {
      let value = this.thisInstance.validate();
      if (value && value.length > 0 && showMsg) {
        this.$Message.error({
          content: "数据校验不通过，请查看页面中红色字样提示信息",
          duration: 4,
          closable: true,
        });
      }
      return value;
    },
    save() {
      let value = this.thisInstance.save();
      return value;
    },
    //@keyup.ctrl.83="saveTest"
    // saveTest() {
    //   let result = this.save();
    //   let resultJson = JSON.stringify(result);
    //   alert(resultJson);
    //   console.log(resultJson);
    // },
    // valiateTest() {
    //   let result = this.validate();
    //   if (result && result.length > 0) {
    //     let resultJson = JSON.stringify(result);
    //     alert(resultJson);
    //   } else {
    //     alert("通过");
    //   }
    // },
  },
};
</script>

<style>
:root {
      --theme-font: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, Arial, sans-serif;
      --theme-font-size: 12px;
      --theme-bg: #fff;
      --theme-bg-over: #f2f2f2;
      --theme-title-color: #262626;
      --theme-content-color: #585858;
      --theme-footer-color: var(--theme-content-color);
      --theme-box-padding: 16px;
    }

    body {
      background: var(--theme-bg);
    }

    .box {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 8px;
    }

    .item-container {
      position: relative;
      padding-left: 22px;
    }

    .item-cont {
      padding: var(--theme-box-padding);
      line-height: 1.5;
      font-family: var(--theme-font);
      color: var(--theme-color);
      cursor: default;
    }

    .item-cont:hover,
    .item-contSelected {
      background: var(--theme-bg-over);
    }

    .item-title {
      font-size: calc(var(--theme-font-size) + 2px);
    }

    .item-name {
      font-weight: 700;
    }

    .item-detail {
      font-size: var(--theme-font-size);
      color: var(--theme-content-color);
    }

    .item-footer {
      margin-top: 8px;
      font-size: var(--theme-font-size);
      color: var(--theme-footer-color);
    }

    .setting-toolbar-container {
      position: absolute;
      left: 0;
      top: 15px;
      bottom: 0;
      width: 22px;
    }
</style>
