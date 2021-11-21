<template>
  <div class="d-flex justify-center fill-height">
    <Chart class="a " />
  </div>
</template>
<script>
import Chart from "../components/Chart";
export default {
  components: {
    Chart,
  },
};
</script>
<style scoped>
.a {
  width: 1000px;
  height: 500px;
}
</style>
