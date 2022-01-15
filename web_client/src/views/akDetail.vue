<template>
  <div class="fill-height">
    <!-- <TopBar /> -->
    <v-card elevation="1" outlined max.width="300" class="mx-auto">
      <v-card-title align="center">{{ akInfo.title }}</v-card-title>
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
      <v-card-actions>
        <v-btn class="me-2 mx-auto" color="primary">Kaufen</v-btn>
        <v-btn class="me-2 mx-auto" color="primary">Verkaufen</v-btn>
      </v-card-actions>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn class="me-2 mx-auto" color="success" @click="oneDay()"
          >1 Tag</v-btn
        >
        <v-btn class="me-2 mx-auto" color="success" @click="oneWeek()"
          >1 Woche</v-btn
        >
        <v-btn class="me-2 mx-auto" color="success" @click="oneMonth()"
          >1 Monat</v-btn
        >
      </v-card-actions>
    </v-card>
    <span>{{ akByTimeWert }}</span>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Market',
  data() {
    return {
      akInfo: [],
      akKurs: [],
      akByTime: [],
      akByTimeWert: [],
    };
  },
  methods: {
    async getKurs() {
      this.akKurs = (
        await axios.get(
          `http://localhost:5000/akDetailKurs/${this.akInfo.isin}`
        )
      ).data;
    },
    async oneDay() {
      const today = new Date();
      const yesterday = today.getDate() - 1;
      const yesterdayDate =
        today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + yesterday;
      console.log(yesterdayDate);
      this.akByTime = (
        await axios.get(
          `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
        )
      ).data;
      this.wertExtraktion();
    },
    async oneWeek() {
      const today = new Date();
      const yesterday = today.getDate() - 7;
      const yesterdayDate =
        today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + yesterday;
      console.log(yesterdayDate);
      this.akByTime = (
        await axios.get(
          `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
        )
      ).data;
      this.wertExtraktion();
    },
    async oneMonth() {
      const today = new Date();
      // const yesterday = today.getDate() - 31;
      let lastMonth;
      if (today.getMonth() + 1 == 1) {
        lastMonth = 12;
        let lastYear = today.getFullYear() - 1;
        const yesterdayDate =
          lastYear + '-' + lastMonth + '-' + today.getDate();
        console.log(yesterdayDate);
        this.akByTime = (
          await axios.get(
            `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
          )
        ).data;
      } else {
        const yesterdayDate =
          today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        console.log(yesterdayDate);
        this.akByTime = (
          await axios.get(
            `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
          )
        ).data;
      }
      this.wertExtraktion();
    },
    wertExtraktion() {
      this.akByTimeWert = [];
      for (let elm of this.akByTime) {
        this.akByTimeWert.push(elm.wert);
      }
      console.log(this.akByTimeWert);
    },
  },
  async created() {
    this.akInfo = (
      await axios.get(`http://localhost:5000/akDetail/${this.isin}`)
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
