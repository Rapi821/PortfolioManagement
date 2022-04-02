<template>
  <div class="fill-height">
    <TopBarMarket :comp_id="comp_id" />
    <!-- <div class="d-none d-xl-flex a"></div> -->
    <!-- <v-spacer></v-spacer> -->
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-data-table
            :loading="loading"
            :headers="headers"
            :items="akData"
            :items-per-page="10"
            class="elevation-0"
          >
            <!-- Detailpage der einzelnen Aktien -->
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.isin }}
                </td>
                <td>
                  {{ item.wkn }}
                </td>
                <td>{{ item.kurs }}</td>
                <td>
                  <!-- maybe smooth noch bissi ändern? -->
                  <div class="ml-n6 mr-6">
                    <v-sparkline
                      line-width="5"
                      smooth="8"
                      :value="item.graphvalues"
                      auto-draw
                    ></v-sparkline>
                  </div>
                </td>
                <td>
                  <v-btn
                    :to="`/detailAk/${item.isin}/${comp_id}`"
                    small
                    plain
                    class="primary mt-2 mb-2"
                    >Details</v-btn
                  >
                  <v-btn
                    @click="openSellDialog(item)"
                    small
                    plain
                    class="primary ml-2 mt-2 mb-2 me-2"
                    >Handeln</v-btn
                  >
                </td>
              </tr>
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
// import server from "@/serverInterface";
export default {
  name: "Market",
  components: { TopBarMarket },
  props: {
    comp_id: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      loading2: false,
      akInfo: [],
      akKurs: [],
      akData: [],
      allakKurs: [],
      hilfsarr: [],
      hilfsarr2: [],
      headers: [
        {
          text: "Name",

          sortable: true,
          value: "name",
        },
        { text: "ISIN", value: "isin", sortable: false },
        { text: "WKN", value: "wkn", sortable: false },
        { text: "Kurs", value: "kurs" },
        { text: "", value: "graphvalues", width: "15%", sortable: false },
        { text: "Aktionen", value: "actions", width: "22%" },
      ],
    };
  },
  methods: {
    createAktie() {
      // Funktion die alle Aktein mit deren Kruse bekommt
      // Für Datatable werden Manuell Objekte für die einzelnen Aktein erstellt
      let counter = 0;
      for (let elm of this.akInfo) {
        console.log(counter);
        let aktie = {
          name: elm.title,
          isin: elm.isin,
          wkn: elm.wkn,
          kurs: 1,
          graphvalues: this.allakKurs[counter].werte,
        };
        console.log("test 1");
        // console.log();
        this.akData.push(aktie);
        counter++;
      }
      for (let el of this.akData) {
        // console.log(el);
        let wert = this.akKurs.find((e) => e.isin == el.isin);
        if (wert == undefined) {
          wert = { wert: 1 };
        }
        el.kurs = wert.wert;
      }
      // console.log(this.akData);
    },
    async getKurs() {
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
        let counterid = 0;
        for (let elem of this.akInfo) {
          console.log(elem.isin);
          let lol = (
            await axios.get(
              `https://heroku-porftolio-crawler.herokuapp.com/kursByTime/${elem.isin}?date=${yesterdayDate}`
            )
          ).data;
          this.hilfsarr = [];
          for (let elle of lol) {
            this.hilfsarr.push(elle.wert);
          }
          this.hilfsarr2 = [];
          for (let i = 0; i < this.hilfsarr.length; i = i + 56) {
            this.hilfsarr2.push(this.hilfsarr[i]);
          }
          let aktie = {
            id: counterid,
            werte: this.hilfsarr2,
          };

          this.allakKurs.push(aktie);
          counterid++;
          // console.log(lol.filter((elem) => elem.wert));
        }
      } else {
        const yesterdayDate =
          today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
        // console.log(yesterdayDate);
        let counterid = 0;
        for (let elem of this.akInfo) {
          console.log(elem.isin);
          let lol = (
            await axios.get(
              `https://heroku-porftolio-crawler.herokuapp.com/kursByTime/${elem.isin}?date=${yesterdayDate}`
            )
          ).data;
          this.hilfsarr = [];
          for (let elle of lol) {
            this.hilfsarr.push(elle.wert);
          }
          this.hilfsarr2 = [];
          for (let i = 0; i < this.hilfsarr.length; i = i + 56) {
            this.hilfsarr2.push(this.hilfsarr[i]);
          }
          let aktie = {
            id: counterid,
            werte: this.hilfsarr2,
          };

          this.allakKurs.push(aktie);
          counterid++;
          // console.log(lol.filter((elem) => elem.wert));
        }
      }

      // console.log(test);
      // console.log(this.akKurs);
    },
  },
  async created() {
    this.loading = true;
    this.akInfo = (
      await axios.get("https://heroku-porftolio-crawler.herokuapp.com/akInfo")
    ).data;
    this.akKurs = (
      await axios.get("https://heroku-porftolio-crawler.herokuapp.com/akKurs")
    ).data;
    // console.log(this.akKurs);

    await this.getKurs();
    this.createAktie();
    console.log(this.akInfo);
    console.log(this.allakKurs);
    this.loading = false;
    // Vielleicht noch mit loading2 optimieren
  },
};
</script>
<style>
.a {
  width: 300px;
}
.negativMargin {
  margin-top: -20vh;
}
</style>
<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
</style>
