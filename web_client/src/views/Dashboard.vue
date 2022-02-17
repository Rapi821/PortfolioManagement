<template>
  <div>
    <TopBar />

    <div class="d-flex z">
      <div class="d-none d-xl-flex b"></div>
      <div class="mar">
        <div class=" text-h5 mb-2">
          Portfolio Wert
        </div>
        <v-card class="elevation-0" max-width="200">
          <v-list-item three-line>
            <v-list-item-content>
              <div class=" text-overline mb-4">
                Portfolio Wert
              </div>
              <v-list-item-title class="text-h6 mb-1 mt-n6">
                {{ portValue }}
              </v-list-item-title>
              <div class="text-overline mb-4">
                Verfügbares Geld
              </div>
              <v-list-item-title class="text-h6 mb-1 mt-n6">
                {{ cash }}
              </v-list-item-title>
              <div class="text-overline mb-4">
                Aktien Wert
              </div>
              <v-list-item-title class="text-h6 mb-1 mt-n6">
                {{ akValue }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
      <v-spacer></v-spacer>
      <div class="mar2">
        <div class=" text-h5 mb-2">Dein Aktien Gemma</div>
        <v-data-table
          :headers="headers"
          :items="akHave"
          class="elevation-0"
        ></v-data-table>
      </div>

      <!-- <div class="d-none d-xl-flex b"></div> -->
    </div>
    <div>
      <v-btn :to="`/ranking/${comp_id}`">Ranking</v-btn>
    </div>
    <v-btn @click="sellbuy">Kaufen</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <div class="d-flex justify-space-around">
          <v-container
            fluid
            :style="[
              !visible
                ? {
                    'border-bottom': '1px solid #fff',
                  }
                : {
                    'border-bottom': '1px solid rgba(0,0,0,0.12)',
                  },
            ]"
            style="border-right:1px solid rgba(0,0,0,0.12)"
          >
            <div v-on:click="stepc0" :disabled="step == 0">
              Kaufen
            </div>
          </v-container>
          <!-- <v-divider class="ml-5" vertical></v-divider> -->
          <!-- ml-5 nicht clean -->
          <v-container
            fluid
            :style="[
              visible
                ? {
                    'border-bottom': '1px solid #fff',
                  }
                : {
                    'border-bottom': '1px solid rgba(0,0,0,0.12)',
                  },
            ]"
          >
            <div v-on:click="stepc1" :disabled="step == 1">Verkaufen</div>
          </v-container>
        </div>
        <!-- Nicht löschen -->
        <!-- <div class="d-flex flex-row">
          <v-divider
            :style="{ visibility: visible ? 'visible' : 'hidden' }"
          ></v-divider>
          <v-divider
            :style="{ visibility: !visible ? 'visible' : 'hidden' }"
          ></v-divider>
        </div> -->
        <v-window v-model="step">
          <v-container class="buysellwindow">
            <v-window-item :value="0">
              <v-data-table
                dense
                :headers="headersKaufen"
                :items="akData"
                :items-per-page="10"
                class="elevation-1"
              >
                <!-- Detailpage der einzelnen Aktien -->

                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    @click="buyStock(item)"
                    small
                    plain
                    class="primary  mt-2 mb-2"
                    >Kaufen</v-btn
                  >
                </template>
              </v-data-table>
            </v-window-item>
            <!-- Verkauf -->
            <v-window-item :value="1">
              <v-form
                ><v-text-field
                  label="Anzahl verkaufen"
                  name="Anzahl"
                  type="text"
                  color="primary"
              /></v-form>
              <div class="mb-3 mt-n1 textfields d-flex justify-space-between">
                <v-btn width="45%">Plus</v-btn>
                <v-btn width="45%">Minus</v-btn>
              </div>
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Verfügbares Geld:
                </div>
                <div class="h5">
                  2345
                </div>
              </div>
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Preis pro Aktie:
                </div>
                <div class="h5">
                  743
                </div>
              </div>

              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Preis insgesamt:
                </div>
                <div class="h5">
                  2344
                </div>
              </div>
              <v-divider class="divider_style"></v-divider>
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Preis insgesamt:
                </div>
                <div class="h5">
                  2344
                </div>
              </div>
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Verfügbares Geld nach Kauf:
                </div>
                <div class="h5">
                  2344
                </div>
              </div>
              <div class="mb-n3 mt-3 textfields d-flex ">
                <v-btn width="100%">Kaufe Appleasd</v-btn>
              </div></v-window-item
            >
          </v-container>
        </v-window>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="createCompetition">
            Create
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import TopBar from '../components/TopBar.vue';
import server from '@/serverInterface';

export default {
  components: {
    TopBar,
  },
  methods: {
    async sellbuy() {
      this.dialog = true;
    },
    stepc0() {
      this.step = 0;
      this.visible = false;
    },
    stepc1() {
      this.step = 1;
      this.visible = true;
    },
    async getData() {
      this.user = (await server.get('http://localhost:3000/user/data')).data;
      console.log(this.user);
    },
    async getStocks() {
      this.stocks = (
        await server.get(
          `http://localhost:3000/competitions/${this.comp_id}/getCompStocks`
        )
      ).data;
      console.log(this.stocks);
    },
    async buyStock(ak) {
      console.log('buy');
      let newItem = {
        isin: ak.isin,
        buy_price: ak.kurs,
        competition_id: this.comp_id,
        count: 1,
      };
      await server.post(`http://localhost:3000/user/buyStocks`, newItem);
      this.dialog = false;
      await this.getStocks();
      this.createAkForTable();
    },
    createAktie() {
      // Funktion die alle Aktein mit deren Kruse bekommt
      // Für Datatable werden Manuell Objekte für die einzelnen Aktein erstellt
      for (let elm of this.akInfo) {
        let aktie = { name: elm.title, isin: elm.isin, wkn: elm.wkn, kurs: 1 };
        this.akData.push(aktie);
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
    createAkForTable() {
      this.cash = 0;
      this.akValue = 0;
      this.akHave = [];
      let ak = {};
      let kurs = {};
      for (let a of this.stocks) {
        if (a.isin != '0000') {
          kurs = this.akData.find((e) => e.isin == a.isin);
          ak = {
            name: this.akInfo.find((e) => e.isin == a.isin).title,
            isin: a.isin,
            count: a.count,
            buy_price: a.buy_price,
            wert: kurs.kurs * a.count,
          };
          this.akHave.push(ak);
        } else {
          this.cash = a.buy_price;
        }
      }
      for (let elm of this.akHave) {
        this.akValue += Number(elm.wert);
      }
      this.portValue = Number(this.akValue) + Number(this.cash);
    },
  },
  async created() {
    await this.getData();
    await this.getStocks();
    this.akInfo = (
      await axios.get('https://heroku-porftolio-crawler.herokuapp.com/akInfo')
    ).data;
    this.akKurs = (
      await axios.get('https://heroku-porftolio-crawler.herokuapp.com/akKurs')
    ).data;
    this.createAktie();
    this.createAkForTable();
  },
  data() {
    return {
      akInfo: [],
      akData: [],
      akKurs: [],
      akHave: [],
      cash: 0,
      portValue: 0,
      akValue: 0,
      dialog: false,
      step: 0,
      visible: false,
      competetion: {},
      user: {},
      stocks: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Isin',
          align: 'start',
          sortable: false,
          value: 'isin',
        },
        { text: 'Wert', value: 'wert' },
        { text: 'Buy_Price', value: 'buy_price' },
        { text: 'Count', value: 'count' },
      ],
      headersKaufen: [
        {
          text: 'Name',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        { text: 'ISIN', value: 'isin', sortable: false },
        { text: 'Kurs', value: 'kurs' },
        { text: 'Kaufen', value: 'actions' },
      ],
    };
  },
  props: {
    comp_id: {
      type: String,
    },
  },
};
</script>
<style>
.z {
  margin-top: 150px; /* Nur Vorübergehend! */
}
.b {
  width: 300px; /* entfernung von linkem bildschirmrand */
  height: 100%;
}
.bod {
  height: 100%;
}
.mar {
  margin-left: 80px;
}
.mar2 {
  margin-right: 630px;
}
.buysellwindow {
  padding: 7%;
}
.textfields {
  margin-top: 1%;
}
.divider_style {
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>
