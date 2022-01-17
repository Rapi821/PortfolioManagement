<template>
  <div class="d-flex  justify-center align-center">
    <Chart :chartdata="chartData" :options="chartOptions" />
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
        labels: ['etst'],
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
      console.log(this.chartData.labels);
      this.chartData.labels.push('Testb');
      for (let elm of labelss) {
        this.chartData.labels.push(elm.zeit);

        this.test.push(elm.zeit);
        // console.log(elm.zeit);
      }
      // console.log(labelss);
      // console.log(this.labels);
      // console.log(this.test);
    },
    async getData() {
      let dataa = (
        await axios.get(
          `http://localhost:5000/kursByTime/DE000A1EWWW0?date=2022-01-01`
        )
      ).data;
      for (let elm of dataa) {
        this.chartData.datasets.data.push(elm.wert);
      }
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
