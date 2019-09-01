<template>
  <div class="table">
    <div class="container">
      <table-list></table-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TableList from '../page/project/components/MarketList'
export default {
  name: "dashboard",
  components: {
    Tabs: require("./Tabs.vue").default,
    TableList
  },
  computed: {
  }
};
</script>

<style scoped>
/* .el-row {
        margin-bottom: 20px;
    } */

</style>
