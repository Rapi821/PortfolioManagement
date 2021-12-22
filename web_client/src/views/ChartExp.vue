<template>
  <div class="d-flex  justify-center align-center">
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
  min-width: 500px;
  max-width: 800px;
  max-height: 500px;
}
</style>
