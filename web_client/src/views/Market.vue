<template>
  <div class="fill-height">
    <TopBarMarket />
    <!-- <div class="d-none d-xl-flex a"></div> -->
    <!-- <v-spacer></v-spacer> -->
    <v-container class="fill-height " fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-data-table
            dense
            :headers="headers"
            :items="akData"
            :items-per-page="10"
            class="elevation-1"
          >
            <!-- Detailpage der einzelnen Aktien -->

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                :to="`/akDetail/${item.isin}`"
                small
                plain
                class="primary  mt-2 mb-2"
                >Details</v-btn
              >
              <v-btn
                @click="openSellDialog(item)"
                small
                plain
                class="primary ml-2 mt-2 mb-2 me-2"
                >Handeln</v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-spacer></v-spacer> -->
    <!-- <div class="d-none d-xl-flex a"></div> -->
  </div>
</template>

<script>
import axios from "axios";
import TopBarMarket from "../components/TopBarMarket.vue";
export default {
  name: "Market",
  components: { TopBarMarket },
  data() {
    return {
      akInfo: [],
      akKurs: [],
      akData: [],

      headers: [
        {
          text: "Name",
          align: "center",
          sortable: true,
          value: "name",
        },
        { text: "ISIN", value: "isin", sortable: false },
        { text: "WKN", value: "wkn", sortable: false },
        { text: "Kurs", value: "kurs" },
        { text: "Aktionen", value: "actions" },
        { text: "", value: "verkaufen" },
      ],
    };
  },
  methods: {
    createAktie() {
      // Funktion die alle Aktein mit deren Kruse bekommt
      // Für Datatable werden Manuell Objekte für die einzelnen Aktein erstellt
      for (let elm of this.akInfo) {
        let aktie = { name: elm.title, isin: elm.isin, wkn: elm.wkn, kurs: 1 };
        this.akData.push(aktie);
      }
      for (let el of this.akData) {
        console.log(el);
        let wert = this.akKurs.find((e) => e.isin == el.isin);
        if (wert == undefined) {
          wert = { wert: 1 };
        }
        el.kurs = wert.wert;
      }
      // console.log(this.akData);
    },
  },
  async created() {
    this.akInfo = (
      await axios.get("https://heroku-porftolio-crawler.herokuapp.com/akInfo")
    ).data;
    this.akKurs = (
      await axios.get("https://heroku-porftolio-crawler.herokuapp.com/akKurs")
    ).data;
    this.createAktie();
  },
};
</script>
<style>
.a {
  width: 300px;
}
</style>
<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
</style>
