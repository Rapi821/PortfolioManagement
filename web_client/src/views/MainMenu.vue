<template>
  <div>
    <TopBar />
    <v-card max-width="700px" class="mx-auto mt-2 elevation-2">
      <v-card-title>Deine Competitions</v-card-title>
      <v-card-text>{{ user.firstname }} {{ user.lastname }}</v-card-text>
      <v-card-actions
        ><v-btn @click="compEnter" class="btn" color="primary"
          >Competition Beitreten</v-btn
        ><v-btn @click="compCreate" class="btn" color="primary"
          >Competition Erstellen</v-btn
        >
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
                      v-model="competetion.title"
                      label="Titel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="competetion.starting_money"
                      label="Startgeld"
                    ></v-text-field> </v-col
                  ><v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="competetion.end_date"
                      label="End Datum"
                    ></v-text-field> </v-col
                ></v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="createCompetition">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog></v-card-actions
      >
    </v-card>

    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8"
          ><v-data-table
            :headers="headers"
            :items="competetions"
            class="elevation-3"
            ><template v-slot:[`item.title`]="{ item }">
              <span
                ><router-link :to="`/Dashboard/${item.competition_id}`">{{
                  item.title
                }}</router-link></span
              >
            </template></v-data-table
          ></v-col
        ></v-row
      >
    </v-container>

    <!-- <h3>Testbuttons für Routen</h3> -->
    <!-- TEST BUTTONS FÜR ROUTEN -->
    <v-btn
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
          buy_price: 100,
          count: 10,
          competition_id: 0,
        })
      "
    >
      Kaufe Aktien </v-btn
    ><!--
    <v-btn color="blue darken-1" text @click="getCompetition('0')">
      Get Data für eine Competition
    </v-btn> -->
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue';
import server from '@/serverInterface';
export default {
  components: {
    TopBar,
  },
  methods: {
    async getCompetition(x) {
      console.log(
        (await server.get(`http://localhost:3000/competition/${x}`)).data
      );
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
      this.competetions = (
        await server.get(`http://localhost:3000/user/competitions`)
      ).data;
      // console.log(this.competetions);
    },
    async createCompetition() {
      console.log(this.competetion);
      await server.post(
        `http://localhost:3000/createNewCompetition`,
        this.competetion
      );
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
        { text: 'Portfoliowert', value: 'portfolio_value' },
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
};
</script>

<style lang="scss" scoped></style>
