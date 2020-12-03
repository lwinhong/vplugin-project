<template>
  <!-- <Modal
    v-model="visible"
    mask
    title="返回参数配置"
    :width="800"
    @on-ok="ok"
    @on-cancel="cancel"
  > -->
  <div>
    <Table
      :columns="setTableColumn"
      :data="settingDataTable"
      width="100%"
      height="162"
      border
      :size="$editorUtil.itemStyle.itemInputSize"
    >
      <template slot-scope="{ row, index }" slot="destTypeSlot">
        <!-- <Dropdown trigger="click" transfer>
        <a>
          <span
            >{{ getItemName(destTypeItems, row.destType) || "请选择" }}
          </span>
          <Icon type="md-arrow-dropdown" size="18" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            v-for="item in destTypeItems"
            :key="item.value"
            :selected="item.value == row.destType"
            @click.native="
              onDestTypeChanged(item.value, item.details, row, index)
            "
          >
            {{ item.name }}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>   
      
       @on-select="onDestTypeChanged(row.destType, item.details, row, index)"-->

        <Select
          style="width: 100%"
          transfer
          :value="row.destType"
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="onDestTypeChanged($event, row, index)"
        >
          <Option
            v-for="item in destTypeItems"
            :key="item.value"
            :value="item.value"
            >{{ item.name }}</Option
          >
        </Select>
      </template>
      <template slot-scope="{ row, index }" slot="destSlot">
        <Select
          style="width: 100%"
          transfer
          :value="row.dest"
          :size="$editorUtil.itemStyle.itemInputSize"
          @on-change="onDestChanged($event, row, index)"
          v-if="row.destType != 'control'"
        >
          <Option
            v-for="item in destItems"
            :key="item.value"
            :value="item.value"
            >{{ item.name }}</Option
          >
        </Select>
        <!-- <Dropdown trigger="click" transfer v-if="row.destType != 'control'">
        <a>
          <span>{{ row.dest ? row.dest : "请选择" }} </span>
          <Icon type="md-arrow-dropdown" size="18" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            v-for="value in destItems"
            :key="value.value"
            :selected="value.value == row.destType"
            @click.native="onDestChanged(value.value, row, index)"
          >
            {{ value.name }}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> -->
        <template v-else>
          <span>{{ row.dest ? row.dest : "未配置" }}</span>
          <Button
            icon="md-open"
            type="text"
            :size="$editorUtil.itemStyle.itemInputSize"
            @click="openControlSelector(row, row.dest)"
          ></Button>
        </template>
      </template>
      <template slot-scope="{ row, index }" slot="srcTypeSlot">
        <Dropdown trigger="click">
          <a>
            <span>{{ getItemName(srcTypeItems, row.srcType) }} </span>
            <!-- <Icon type="md-arrow-dropdown" size="18" /> -->
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="value in srcTypeItems"
              :key="value.value"
              :selected="value.value == row.srcType"
              @click.native="onSrcTypeChanged(value.value, row, index)"
            >
              {{ value.name }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template slot-scope="{ row, index }" slot="srcSettingSlot">
        <!-- <span>{{ row.srcCode ? "已配置" : "未配置" }}</span> -->
        <span>{{
          row.scrType == "entity"
            ? row.destFieldMapping
              ? "已配置"
              : "未配置"
            : row.srcCode
        }}</span>
        <Button
          v-if="isMappingVisble"
          icon="md-open"
          type="text"
          :size="$editorUtil.itemStyle.itemInputSize"
          @click="openMappingEditor(row, index)"
        ></Button>
      </template>
    </Table>

    <Modal
      v-model="mappingModalVisible"
      mask
      :mask-closable="false"
      title="规则返回值设置"
      :width="800"
      @on-ok="onEntityFieldMappingOk"
    >
      <RuleSettingOutputEntityFieldMapping
        :data="settingMappingData" :context="context"
        ref="entityFieldMapping"
    /></Modal>
  </div>
</template>

<script>
const srcTypeExpression = { name: "表达式", value: "expression" };
const srcTypeReturnValue = { name: "返回值", value: "returnValue" };

//import RuleSettingEntityFieldMapping from "./RuleSettingEntityFieldMapping";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("ruleEditorStore");

export default {
  name: "RuleSettingOutParamsEditor",
  //components: { RuleSettingEntityFieldMapping },
  props: {
    data: Array,
    showModal: Boolean,
    context: [Object, Array, String],
  },
  model: {
    prop: "showModal",
    event: "change",
  },
  computed: {
    ...mapState(["allDestDetails", "ruleMetaData"]),

    settingDataTable() {
      return this.data;
    },
    isMappingVisble() {
      return this.isDataEntity(this.data[0].srcCode);
    },
    destTypeItems() {
      // return [
      //   { name: "实体", value: "entity" },
      //   { name: "控件", value: "control" },
      //   { name: "窗体输入", value: "windowVariant" },
      //   { name: "窗体输出", value: "windowOutput" },
      //   {
      //     name: "方法输出",
      //     value: "ruleSetOutput",
      //     scrop: ["client", "server"],
      //   },
      //   {
      //     name: "方法变量",
      //     value: "ruleSetVariant",
      //     scrop: ["client", "server"],
      //   },
      //   {
      //     name: "构件变量",
      //     value: "systemVariant",
      //     scrop: ["client", "server"],
      //   },
      // ];
      let items = this.getDestDetails();
      debugger;
      let result = new Array();
      let info = this.getOutputMetaInfo()(this.data[0].srcCode);
      for (let index = 0; index < items.length; index++) {
        const element = items[index];

        if (element.hasOwnProperty("details")) {
          if (element.details != null) {
            for (let i = 0; i < element.details.length; i++) {
              const item = element.details[i];
              if (item.DataType == info.type) {
                result.push(element);
              }
            }
          }
        }
      }
      let dests = new Array();
      result.forEach((item) => {
        if (item.details) {
          item.details.forEach((dest) => {
            dests.push({ name: dest.CodeName, value: dest.Code });
          });
        }
      });
      this.destItems = dests;
      return result;
    },
  },
  data() {
    // 这里存放数据
    return {
      mappingModalVisible: false,
      visible: false,
      srcTypeItems: [srcTypeReturnValue],
      destItems: [],
      //这里是映射信息
      settingMappingData: [],
      setTableColumn: [
        {
          title: "目标类型",
          key: "destType",
          width: 140,
          slot: "destTypeSlot",
        },
        {
          title: "目标",
          key: "dest",
          slot: "destSlot",
        },
        {
          title: "来源类型",
          key: "srcType",
          width: 100,
          slot: "srcTypeSlot",
        },
        {
          title: "来源",
          key: "srcSetting",
          slot: "srcSettingSlot",
        },
      ],
    };
  },
  // 方法集合
  methods: {
    ...mapGetters(["getDestDetails", "getOutputMetaInfo"]),
    ok() {
      this.$emit("change", false);
      this.$emit("ok", this.settingDataTable);
    },
    isDataEntity(metaCode) {
      var metaInfo = this.getOutputMetaInfo()(metaCode);
      return metaInfo.type == "entity";
    },

    cancel() {
      this.$emit("change", false);
      this.$emit("cancel");
    },
    getItemName(items, key) {
      if (items) {
        for (let index = 0; index < items.length; index++) {
          const item = items[index];
          if (item.value == key) return item.name;
        }
      }
      return key;
    },
    openMappingEditor(row, index) {
      if (this.isMappingVisble) {
        //这里获取Map ing信息 直接给下游的容器使用
        if (this.settingMappingData.length == 0) {
          if (this.settingDataTable[0].destFieldMapping != null) {
            this.settingMappingData = this.$editorUtil.deepCopy(
              this.settingDataTable[0].destFieldMapping
            );
          } else this.settingMappingData = new Array();
        }
        debugger
        this.$refs.entityFieldMapping.destFiledItems(this.settingDataTable[0].dest);
        this.mappingModalVisible = true;
        return;
      }
      if (row.srcType == "returnValue") {
        // this.$refs.entityFieldMapping.show({
        //   row,
        //   index,
        // });
      } else {
        if (window.vPlugin) {
          let callBack = (expression) => {
            row.srcCode = expression;
            _this.updateTableRow(context.row, context.index);
          };
          window.vPlugin.execute(
            "openExpression",
            row.srcCode,
            _this.itemData.type,
            callBack
          );
        }
      }
    },
    onEntityFieldMappingOk() {
      this.settingMappingData = this.$editorUtil.deepCopy(
        this.settingMappingData
      );
      this.settingDataTable[0].destFieldMapping = this.settingMappingData;
      //this.data.destFieldMapping=this.settingMappingData;
    },
    onDestChanged(value, row, index) {
      row.dest = value;
      this.updateTableRow(row, index);
    },
    onDestTypeChanged(value, row, index) {
      if (row.destType == value) return;
      row.destType = value;
      row.dest = "";
      let isEntity = value == "entity";
      if (isEntity) {
        row.srcType = "returnValue";
      }
      //   if (isEntity) {
      //     this.srcTypeItems = [srcTypeReturnValue];
      //   } else {
      //     this.srcTypeItems = [srcTypeReturnValue, srcTypeExpression];
      //   }

      let dests = new Array();
      let items = this.destTypeItems;
      items.forEach((item) => {
        if (item.value == value && item.details) {
          item.details.forEach((dest) => {
            dests.push({ name: dest.CodeName, value: dest.Code });
          });
        }
      });
      this.destItems = dests;
      this.updateTableRow(row, index);
    },
    onSrcTypeChanged(value, row, index) {
      row.srcType = value;
      //row.srcCode = "";
      row.destFieldMapping = null;
      this.updateTableRow(row, index);
    },
    openControlSelector(row, selectedControl) {
      if (window.vPlugin) {
        window.vPlugin.execute(
          "openControlSelector",
          selectedControl,
          (value) => {
            row.dest = value;
            this.updateTableRow(row, index);
          }
        );
      }
    },
    updateTableRow(row, index) {
      this.settingDataTable[index] = row;
    },
  },
  // 监控data中的数据变化
  watch: {
    showModal(newValue, oldValue) {
      this.visible = newValue;
      if (newValue) {
        //console.log(this.destTypeItems);
      }
    },
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
</style>