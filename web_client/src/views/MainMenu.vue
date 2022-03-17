<template>
  <div class="fill-height">
    <TopBarMarket @someEvent="overlay = !overlay" />
    <v-overlay zIndex="9996" :absolute="absolute" :value="overlay" color="#b3dfff"></v-overlay>
    <v-container class="fill-height " fluid>
      <v-row class="negativMargin " d-flex justify="center">
        <v-col cols="12" sm="8">
          <div class=" text-h4 mb-1">Hallo {{ user.firstname }}!</div>
          <!-- Wahrscheinlich schaut eine Reihe besser aus aber mal schauen -->
          <div class=" text-h6 font-weight-light">
            Deine Competitions
          </div>
          <v-data-table
            data-testid="dataTable"
            :headers="headers"
            :items="competetions"
            class="elevation-3 overl"
          >
            <template v-slot:[`item.cash`]="{ item }">
              <div>
                {{
                  parseInt(item.cash)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '€'
                }}
              </div>
            </template>
            <template v-slot:[`item.portfolio_value`]="{ item }">
              <div>
                {{
                  parseInt(item.portfolio_value)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '€'
                }}
              </div>
            </template>
            <template v-slot:[`item.total`]="{ item }">
              <div>
                <div>
                  {{
                    parseInt(item.total)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '€'
                  }}
                </div>
              </div>
            </template>
            <template class="" v-slot:[`item.title`]="{ item }">
              <v-chip color="primary overoverl" class="" outlined label>
                <v-overlay
                  absolute="true"
                  :value="overlay"
                  color="primary"
                  opacity="0.1"
                ></v-overlay>
                <router-link
                  class="overoverl"
                  style="text-decoration: none;"
                  :to="`/Dashboard/${item.competition_id}`"
                  >{{ item.title }}
                </router-link>
              </v-chip>
            </template>
            <template v-slot:[`item.active`]="{ item }">
              <v-chip dark outlined :color="getColor(item.active)" v-if="item.active">
                {{ 'aktiv' }}
              </v-chip>
              <v-chip
                dark
                label
                outlined
                :color="getColor(item.active)"
                v-if="item.active == false"
              >
                {{ 'inaktiv' }}
              </v-chip>
            </template>
            <!-- <template v-slot:item.cash="{ item }">
              <span>
                {{ item.cash.toFixed(2) }}      Geht nicht
              </span>
            </template> -->
          </v-data-table>

          <v-btn @click="compEnter" class=" mt-2" color="primary">Competition Beitreten</v-btn>
          <v-btn
            data-testid="btnCompCreate"
            @click="compCreate"
            class="btn mt-2 ml-2"
            color="primary"
            >Competition Erstellen</v-btn
          ></v-col
        ></v-row
      >
    </v-container>

    <!-- <h3>Testbuttons für Routen</h3> -->
    <!-- TEST BUTTONS FÜR ROUTEN -->
    <!-- <v-btn
            color="blue darken-1"
            text
            @click="
              compEnter({
                code: 'V12FO3FWNY',
              })
            "
          >
            Competition Beitreten
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              buyStock({
                isin: 'US5949181045',
                buy_price: 100.12,
                count: 10,
                competition_id: 0,
              })
            "
          >
            Kaufe Aktien
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              sellStocks({
                isin: 'US5949181045',
                sell_price: 100,
                competition_id: 0,
                count: 10,
              })
            "
          >
            Aktien verkaufen
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              getRecords({
                competition_id: 0,
              })
            "
          >
            Get Records
          </v-btn>

          <v-btn color="blue darken-1" text @click="getCompetition('0')">
            Get Data für eine Competition
          </v-btn> -->
    <!--Keine Gute Lösung aber mal schauen  -->
    <v-card width="0px">
      <v-card-actions>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Competition erstellen</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      data-testid="comptitle"
                      v-model="competetion.title"
                      label="Titel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      data-testid="compmoney"
                      v-model="competetion.starting_money"
                      label="Startgeld"
                    ></v-text-field> </v-col
                  ><v-col cols="12" sm="6" md="4">
                    <v-text-field
                      data-testid="compenddate"
                      v-model="competetion.end_date"
                      label="End Datum"
                    ></v-text-field> </v-col
                ></v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn
                data-testid="btncompcreate"
                color="blue darken-1"
                text
                @click="createCompetition"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
import TopBarMarket from '../components/TopBar.vue';
import server from '@/serverInterface';
export default {
  components: {
    TopBarMarket,
  },
  methods: {
    getColor(active) {
      if (active) return 'green';
      else return 'red';
    },
    async getRecords(obj) {
      const x = (
        await server.get(`http://localhost:3000/competition/records/${obj.competition_id}`)
      ).data;
      console.log(x);
    },
    async sellStocks(obj) {
      await server.post(`http://localhost:3000/user/sellStocks`, obj);
      this.getComps();
    },
    async getCompetition(x) {
      console.log((await server.get(`http://localhost:3000/competition/${x}`)).data);
    },
    close() {
      this.dialog = false;
      this.dialog_enter = false;
    },
    compCreate() {
      this.dialog = true;
    },
    async compEnter(obj) {
      // this.dialog_enter = true;
      await server.post(`http://localhost:3000/user/addUserToCompetition`, obj);
      this.getComps();
    },
    competetionEnter() {
      //Do something
    },
    async getComps() {
      this.competetions = (await server.get(`http://localhost:3000/user/competitions`)).data;
      // console.log(this.competetions);
    },
    async createCompetition() {
      console.log(this.competetion);
      await server.post(`http://localhost:3000/createNewCompetition`, this.competetion);
      this.close();
      this.getComps();
    },
    async buyStock(obj) {
      await server.post(`http://localhost:3000/user/buyStocks`, obj);
      this.getComps();
    },
  },
  data() {
    return {
      overlay: false,
      zIndex: 0,

      absolute: true,
      competetions: [],
      user: {},
      dialog: false,
      dialog_enter: false,
      compCode: '',
      competetion: {
        title: '',
        starting_money: 0,
        end_date: '',
      },
      headers: [
        {
          text: 'titel',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Portfoliowert',
          value: 'portfolio_value',
        },
        { text: 'Cash', value: 'cash' },
        { text: 'Total', value: 'total' },
        { text: 'Status', value: 'active' },
        // { text: 'id', value: 'competition_id' },
      ],
    };
  },
  async created() {
    this.user = (await server.get(`http://localhost:3000/user/data`)).data;
    console.log(this.user);
    this.getComps();
  },
  // watch: {
  //     overlay (val) {
  //       val && setTimeout(() => {
  //         this.overlay = false
  //       }, 2000)
  //     },
  //   },
};
</script>

<style lang="scss" scoped>
.negativMargin {
  margin-top: -15vh;
}
.overl {
  position: relative;
  z-index: 9997;
}
.overoverl {
  position: relative;
  z-index: 9999;
}
</style>
