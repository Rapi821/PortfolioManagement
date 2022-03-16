<template>
  <div class="fill-height">
    <TopBar />
    <v-card elevation="1" outlined max-width="700" class="mx-auto mt-2">
      <v-card-title justify="center" class="mx-auto">{{
        akInfo.title 
      }}</v-card-title>
      <v-card-text>
        <v-row>
          <div>
            <b>ISIN:</b> {{ akInfo.isin }} <b> WKN:</b>
            {{ akInfo.wkn }}
          </div>
        </v-row>
        <v-row>
          <div><b>Wert: </b> {{ akKurs[0].wert }}</div>
        </v-row>
      </v-card-text>
      <!-- <v-card-actions>
        <div class="mx-auto">
          <v-btn class="me-2" color="primary">Kaufen</v-btn>
          <v-btn class="me-2" color="primary">Verkaufen</v-btn>
        </div>
      </v-card-actions> -->
      <v-card-actions>
        <div class="d-flex  justify-center align-center">
          <Chart
            :chartdata="chartData"
            :options="chartOptions"
            :key="componentRefreshKey"
          />
        </div>
      </v-card-actions>
      <v-card-actions>
        <div class="mx-auto">
          <v-btn class="me-1" color="success" @click="oneDay()">1 Tag</v-btn>
          <v-btn class="me-1" color="success" @click="oneWeek()">1 Woche</v-btn>
          <v-btn class="me-1" color="success" @click="oneMonth()"
            >1 Monat</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
    <!-- <span>{{ akByTimeWert }}</span> -->

    <!-- weggeben -->
    <!-- <div class="d-flex  justify-center align-center">
      <Chart v-if="!loaded" :chartdata="chartData" :options="options" />
    </div> -->
  </div>
</template>

<script>
import Chart from "../components/Chart";
import TopBar from "../components/TopBar.vue";

import axios from "axios";
export default {
  name: "Market",
  data() {
    return {
      componentRefreshKey: 0,
      datum: new Date(),
      test: [],
      loaded: false,
      chartOptions: {
       legend: {
            display: false
         },//geht wahrscheinlich nicht
         tooltips: {
            enabled: false
         }},

      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#f87979",

            data: [],
          },
        ],
      },
      
      akInfo: [],
      akKurs: [],
      akByTime: [],
      akByTimeWert: [],
    };
  },
  async mounted() {
    // this.loaded = false
    // try {
    //     await axios.get(
    //       `http://localhost:5000/akDetailKurs/${this.akInfo.isin}`
    //     )
    //   // this.chartdata = userlist
    //   this.loaded = true
    // } catch (e) {
    //   console.error(e)
    // }
    // this.oneDay();
    // this.oneWeek();
    // this.oneMonth();
  },
  methods: {
    forceRerender() {
      this.componentRefreshKey += 1;
    },
    async getKurs() {
      this.akKurs = (
        await axios.get(
          `https://heroku-porftolio-crawler.herokuapp.com/akDetailKurs/${this.akInfo.isin}`
        )
      ).data;
    },
    async oneDay() {
      const today = new Date();
      const yesterday = today.getDate() - 1;
      const yesterdayDate =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + yesterday;
      // console.log(yesterdayDate);
      this.akByTime = (
        await axios.get(
          `https://heroku-porftolio-crawler.herokuapp.com/kursByTime/${this.isin}?date=${yesterdayDate}`
        )
      ).data;
      this.wertExtraktion();

      for (let elm of this.akByTime) {
        // this.chartData.datasets.data.push(elm.wert);
        this.test.push(elm.wert);
      }
      this.chartData.datasets[0].data = this.test;
    },
    async oneWeek() {
      const today = new Date();
      const yesterday = today.getDate() - 7;
      const yesterdayDate =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + yesterday;
      // console.log(yesterdayDate);
      this.akByTime = (
        await axios.get(
          `https://heroku-porftolio-crawler.herokuapp.com/kursByTime/${this.isin}?date=${yesterdayDate}`
        )
      ).data;
      this.wertExtraktion();
      this.datum = yesterdayDate;
      console.log(this.datum);
    },
    async oneMonth() {
      const today = new Date();
      // const yesterday = today.getDate() - 31;
      let lastMonth;
      if (today.getMonth() + 1 == 1) {
        lastMonth = 12;
        let lastYear = today.getFullYear() - 1;
        const yesterdayDate =
          lastYear + "-" + lastMonth + "-" + today.getDate();
        this.datum = yesterdayDate;
        // console.log(yesterdayDate);
        this.akByTime = (
          await axios.get(
            `https://heroku-porftolio-crawler.herokuapp.com/kursByTime/${this.isin}?date=${yesterdayDate}`
          )
        ).data;
      } else {
        const yesterdayDate =
          today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
        // console.log(yesterdayDate);
        this.akByTime = (
          await axios.get(
            `https://heroku-porftolio-crawler.herokuapp.com/kursByTime/${this.isin}?date=${yesterdayDate}`
          )
        ).data;
      }
      this.chartData.datasets[0].data = [];
      this.chartData.labels = [];
      for (let elm of this.akByTime) {
        // this.chartData.datasets.data.push(elm.wert);
        this.test.push(elm.wert);
        this.chartData.labels.push(elm.zeit);
      }
      this.chartData.datasets[0].data = this.test;
      console.log(this.chartData.labels);
      console.log(this.chartData.datasets[0].data);
      this.wertExtraktion();
      console.log(this.datum);
      this.loaded = true;
      this.forceRerender();
    },
    wertExtraktion() {
      this.akByTimeWert = [];
      for (let elm of this.akByTime) {
        this.akByTimeWert.push(elm.wert);
      }
    },
  },
  components: {
    Chart,
    TopBar,
  },
  async created() {
    this.akInfo = (
      await axios.get(
        `https://heroku-porftolio-crawler.herokuapp.com/akDetail/${this.isin}`
      )
    ).data[0];
    this.getKurs();
  },

  props: {
    isin: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
