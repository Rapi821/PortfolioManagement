<template>
  <div class="d-flex  justify-center align-center">
    <Chart v-if="loaded" :chartdata="chartData" :options="options" />
  </div>
</template>
<script>
import Chart from '../components/Chart';
import axios from 'axios';
export default {
  data() {
    return {
      loaded:false,
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
  async mounted () {
    this.loaded = false
    try {
     
        await axios.get(
          `http://localhost:5000/kursByTime/DE000A1EWWW0?date=2022-01-01`
        )
      
      // this.chartdata = userlist
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async getLabels() {
      let labelss = (
        await axios.get(
          `http://localhost:5000/kursByTime/DE000A1EWWW0?date=2022-01-01`
        )
      ).data;
      // this.chartData.labels.push(labelss[0].zeit);
     
      for (let elm of labelss) {
        this.chartData.labels.push(elm.zeit);
      }
       console.log(this.chartData.labels);
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
  /* min-width: 900px;
  max-width: 1600px;
  max-height: 900px; */
}
</style>
