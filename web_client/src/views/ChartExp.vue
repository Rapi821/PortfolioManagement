<template>
  <div class="d-flex  justify-center align-center">
    <Chart :chartdata="chartData" />
  </div>
</template>
<script>
import Chart from '../components/Chart';
import axios from 'axios';
export default {
  data() {
    return {
      test: [],
      chartOptions: {},
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: '#f87979',

            data: [],
          },
        ],
      },
    };
  },
  methods: {
    async getLabels() {
      let labelss = (
        await axios.get(
          `http://localhost:5000/kursByTime/DE000A1EWWW0?date=2022-01-01`
        )
      ).data;
      // this.chartData.labels.push(labelss[0].zeit);
      // console.log(this.chartData.labels);
      for (let elm of labelss) {
        this.chartData.labels.push(elm.zeit);
      }
    },

    async getData() {
      let dataa = (
        await axios.get(
          `http://localhost:5000/kursByTime/DE000A1EWWW0?date=2022-01-01`
        )
      ).data;
      for (let elm of dataa) {
        // this.chartData.datasets.data.push(elm.wert);
        this.test.push(elm.wert);
      }
      this.chartData.datasets[0].data = this.test;
    },
  },

  async created() {
    this.getLabels();
    this.getData();
    // console.log("Test");
  },

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
