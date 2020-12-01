<template>
  <div id="app">
    <Index :ref="refIndex" />
    <!-- <router-view /> -->
    <!-- <div>123456798</div> -->
    <!-- <Button @click="save">Save</Button> -->
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
      // let value = this.thisInstance.validate();
      // if (value && value.length > 0 && showMsg) {
      //   this.$Message.error({
      //     content: "数据校验不通过，请查看页面中红色字样提示信息",
      //     duration: 4,
      //     closable: true,
      //   });
      // }
      // return value;
      return "";//校验还没做好。先不做校验
    },
    save() {
      let value = this.thisInstance.save();
      console.log(JSON.stringify(value))
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
    --theme-font-size: 11px;
    --theme-bg: #fff;
    --theme-bg-over: #f2f2f2;
    --theme-title-color: #262626;
    --theme-content-color: #585858;
    --theme-footer-color: var(--theme-content-color);
    --theme-box-padding: 8px 12px;
    --theme-validate-color: red
}

body {
    background: var(--theme-bg)
}

/*容器*/
.box {
    padding: 0 8px;
}

.box:after {
    content:'';
    position:fixed;
    top:0;
    bottom:0;
    left:50%;
    margin-left:-4px;
    border-left:1px solid #dcdee2;

}

/*模块*/
.mod-input{ /*参数设置模块*/
    padding-right:30px;
}

.mod-output{ /*返回值设置模块*/
    padding-right:22px;
}

.mod-title{
    margin: 16px 0 16px 32px;
    padding-left: 5px;
    line-height: 1.2;
    font-size: 16px;
    color: #252525;
    border-left: 2px solid #2d8cf0;
}

/*配置子项*/
.item-container {
    position: relative;
    padding-left: 22px
}

.item-cont {
    padding: var(--theme-box-padding);
    line-height: 1.5;
    font-family: var(--theme-font);
    color: var(--theme-color);
    cursor: default
}

.item-cont:hover,
.item-contSelected {
    border-radius:4px;
    background: var(--theme-bg-over)
}

.item-title {
    padding-bottom: 6px;
    font-size: calc(var(--theme-font-size) + 2px)
}

.item-name {
    font-weight: 700
}

.item-detail {
    color: var(--theme-content-color)
}

.item-detail,
.item-footer {
    font-size: var(--theme-font-size)
}

.item-footer {
    margin-top: 8px;
    color: var(--theme-footer-color)
}

.item-validate {
    color: var(--theme-validate-color)
}

.setting-toolbar-container {
    position: absolute;
    left: 0;
    top: 15px;
    bottom: 0;
    width: 22px
}

</style>
