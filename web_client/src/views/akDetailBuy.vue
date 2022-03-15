<template>
  <div>
    <TopBarMarket :comp_id="comp_id" />
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="2" class="mr-n2"> </v-col>
        <v-col  cols="12" sm="5">
          <v-card  outlined>
            <!-- <v-card-title justify="center" class="mx-auto">{{
              akInfo.title
            }}</v-card-title> -->
            <!-- <v-card-text> -->
            <!-- <v-row>
          <div>
            <b>ISIN:</b> {{ akInfo.isin }} <b> WKN:</b>
            {{ akInfo.wkn }}  //Denke nicht dass das wichtig ist zu sehen oder?
          </div>
        </v-row> -->
            <!-- <v-row>
                <div><b>Wert: </b> {{ akKurs[0].wert }}</div>
              </v-row>
            </v-card-text> -->

            <Chart
              :chartdata="chartData"
              :options="chartOptions"
              :key="componentRefreshKey"
            /> </v-card
        ></v-col>
        <v-col cols="12" sm="1"> </v-col>
        <v-col cols="12" sm="2" class=""><v-card>test</v-card> </v-col>
        <v-col cols="12" sm="2"> </v-col>
      </v-row>
    </v-container>

    <div class="mx-auto">
      <v-btn class="me-1" color="primary" @click="oneDay()">1 Tag</v-btn>
      <v-btn class="me-1" color="primary" @click="oneWeek()">1 Woche</v-btn>
      <v-btn class="me-1" color="primary" @click="oneMonth()">1 Monat</v-btn>
    </div>
    <div class="mx-auto">
      <v-btn color="primary" :to="`/Dashboard/${comp_id}`"
        >Zurück zur competetion "{{ competetion[comp_id].title }}"</v-btn
      >
    </div>

    <!-- <span>{{ akByTimeWert }}</span> -->

    <!-- weggeben -->
    <!-- <div class="d-flex  justify-center align-center">
      <Chart v-if="!loaded" :chartdata="chartData" :options="options" />
    </div> -->
    <v-dialog v-model="buyDialog" max-width="500px">
      <v-card>
        <v-card-title>Aktien Kaufen</v-card-title>
        <v-window>
          <v-window-item
            ><v-form
              ><v-text-field
                label="Geld"
                name="toBuy"
                type="number"
                color="primary"
                v-model="anzGeld"
                @input="getBuyCount"/><v-text-field
                label="Anzahl"
                name="Count"
                type="text"
                color="primary"
                v-model="buyCount"
                readonly
            /></v-form>
          </v-window-item>
        </v-window>
        <v-card-action>
          <v-btn @click="buyStock" small class="primary  mt-2 mb-2"
            >Kaufen</v-btn
          >
        </v-card-action>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Chart from "../components/Chart";
import TopBarMarket from "../components/TopBarMarket.vue";
import axios from "axios";
import server from "@/serverInterface";
export default {
  name: "Market",
  data() {
    return {
      dialog: true,
      loading: false,
      componentRefreshKey: 0,
      datum: new Date(),
      test: [],
      competetion: [],
      loaded: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            top: 10,
            // Nicht responive nicht so nice
            right: 20,
            bottom: 10,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true,  sollte gehen, geht nicht
        //         mirror: true,
        //       },
        //     },
        //   ],
        // },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      buyDialog: false,
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#f87979",
            type: "line",
            borderColor: "#f87979",
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
  // watch: {
  //   dialog(val) {
  //     if (!val) return;

  //     setTimeout(() => (this.dialog = false), 4000);
  //   },
  // },
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
    async getCompbyID() {},
    forceRerender() {
      this.componentRefreshKey += 1;
    },
    openBuyDialog() {
      this.buyDialog = true;
    },
    // getBuyCount() {
    //   console.log(this.curAk);

    //   this.buyCount = (this.anzGeld / this.curAk.kurs).toFixed(2);
    // },
    async getKurs() {
      this.akKurs = (
        await axios.get(
          `https://heroku-porftolio-crawler.herokuapp.com/akDetailKurs/${this.akInfo.isin}`
        )
      ).data;
      // console.log(this.akKurs);
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
      // console.log(this.akByTime);
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
      this.chartData.datasets[0].data = [];
      this.chartData.labels = [];
      for (let elm of this.akByTime) {
        // this.chartData.datasets.data.push(elm.wert);
        this.test.push(elm.wert);
        let zeitMod = elm.zeit.split("T");
        // console.log(zeitMod);
        let datum = zeitMod[0];
        let zeit = zeitMod[1].split(".")[0];
        let datumZeit = `${zeit} ${datum}`;
        this.chartData.labels.push(datumZeit);
      }
      this.chartData.datasets[0].data = this.test;
      // console.log(this.chartData.labels);
      // console.log(this.chartData.datasets[0].data);
      this.wertExtraktion();
      // console.log(this.datum);
      this.loaded = true;
      this.forceRerender();
      // console.log(this.datum);
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
        let zeitMod = elm.zeit.split("T");
        // console.log(zeitMod);
        let datum = zeitMod[0];
        let zeit = zeitMod[1].split(".")[0];
        let datumZeit = `${zeit} ${datum}`;
        this.chartData.labels.push(datumZeit);
      }
      this.chartData.labels.reverse();
      //Hier this.test array reversen
      this.test.reverse();
      this.chartData.datasets[0].data = this.test;
      // console.log(this.chartData.labels);
      // console.log(this.chartData.datasets[0].data);
      this.wertExtraktion();
      // console.log(this.datum);
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
    TopBarMarket,
  },
  async created() {
    this.loading = true;
    this.akInfo = (
      await axios.get(
        `https://heroku-porftolio-crawler.herokuapp.com/akDetail/${this.isin}`
      )
    ).data[0];
    this.competetion = (
      await server.get(`http://localhost:3000/user/competitions`)
    ).data;

    console.log(this.competetion);

    this.getKurs();
    // this.getCompbyID();
    this.oneMonth();
    this.loading = false;
  },

  props: {
    isin: {
      type: String,
    },
    comp_id: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.test {
  // padding-top: 10vh;
  // padding-bottom: 10vh;
  //height: 109px;
}
.chart-wrapper {
  border: 1px solid blue;
  height: 600px;
  width: 600px;
}
</style>
