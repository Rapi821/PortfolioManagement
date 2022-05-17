<template>
  <div class="fill-height">
    <TopBar :comp_id="comp_id" />
    <v-container class="fill-height" fluid>
      <v-row class="negativMargin" d-flex justify="center">
        <v-col cols="12" sm="8">
          <div class=" text-h5 mb-2 ">Ranking</div>
          <v-data-table :headers="headers" :items="ranking" class="elevation-0">
          </v-data-table>
          <v-btn class="mt-2" :to="`/Dashboard/${comp_id}`" color="primary"
            >Zurück zum Portfolio</v-btn
          >
        </v-col></v-row
      >
    </v-container>

    <!-- <div>
      <v-btn :to="`/Dashboard/${comp_id}`">Zurück zum Dashboard</v-btn>
    </div>
    <div>
      <template>
        <v-container class="fill-height " fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8"> </v-col></v-row
        ></v-container>
      </template>
    </div> -->
  </div>
</template>
<script>
import axios from "axios";
import server from "@/serverInterface";
import TopBar from "../components/TopBarMarket.vue";
export default {
  components: { TopBar },
  props: {
    comp_id: {
      type: String, // hab ich auf String geändert (vorher Number) :Sebi
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Platzierung",
          align: "start",
          sortable: true,
          value: "#",
        },
        { text: "Name", value: "name" },
        { text: "Portfolio Wert", value: "portwert" },
      ],
      rankingList: [],
      rItem: {},
      ranking: [],
      akKurs: [],
      akArr: [],
      userList: [],
    };
  },
  methods: {
    async getAkKurs() {
      this.akKurs = (
        await axios.get("https://heroku-porftolio-crawler.herokuapp.com/akKurs")
      ).data;
    },
    async getRankingCompetition() {
      this.rankingList = (
        await server.get(`http://localhost:3000/ranking/${this.comp_id}`)
      ).data;
      // console.log(this.rankingList);
      this.getuserList();
      this.sortRanking();
    },
    getuserList() {
      this.userList.push(this.rankingList[0]);
      for (const r of this.rankingList) {
        for (const u of this.userList) {
          if (u.user_id != r.user_id) {
            this.userList.push(r);
          }
        }
      }
      this.userList = this.userList.slice(0, this.userList.length - 1);
      // console.log(this.userList);
    },
    sortRanking() {
      let holdArr = [];
      let portWert = 0;
      let ak = 0;
      for (const r of this.userList) {
        holdArr = this.rankingList.filter((e) => e.user_id == r.user_id);
        // console.log(holdArr);
        for (const h of holdArr) {
          // console.log(h);
          if (h.isin !== "0000") {
            this.akArr.push(h);
          }
        }
        // console.log(this.akArr);
        for (const a of this.akArr) {
          // console.log(a);
          ak = this.akKurs.find((e) => e.isin == a.isin);
          portWert += ak.wert;
        }
        portWert += holdArr.find((e) => e.isin == "0000").buy_price;
        this.rItem = {
          name: `${r.firstname} ${r.lastname}`,
          portwert: portWert,
        };
        console.log(this.rItem);
        this.ranking.push(this.rItem);
        portWert = 0;
        this.akArr = [];
      }
    },
  },
  async created() {
    await this.getAkKurs();
    await this.getRankingCompetition();
  },
};
</script>

<style lang="scss" scoped></style>
