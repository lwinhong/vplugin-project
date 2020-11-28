<script>
import RuleSettingDate from "./RuleSettingDate";
export default {
  extends: RuleSettingDate,
  data() {
    return {
      dateFormat: "yyyy-MM-dd HH:mm:ss",
      dateType: "datetime",
    };
  },
};
</script>