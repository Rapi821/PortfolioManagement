<template>
  <div class="fill-height">
    <TopBarMarket :comp_id="comp_id" />
    <v-container class="fill-height " fluid>
      <v-row no-gutters class="mt-n12">
        <v-col cols="12" sm="2"></v-col>
        <v-col cols="12" sm="2"
          ><div>
            <div class=" text-h5 mb-2">
              Dashboard
            </div>
            <v-card :loading="loading" class="elevation-2" max-width="200">
              <template slot="progress">
                <v-progress-linear
                  color="primary"
                  indeterminate
                  height="2"
                ></v-progress-linear>
              </template>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class=" text-overline mb-4">
                    Portfolio Wert
                  </div>
                  <v-list-item-title
                    data-testid="PortfolioWert"
                    v-if="!loading"
                    class="text-h6 mb-1 mt-n6"
                  >
                    {{
                      parseInt(portValue)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "€"
                    }}
                  </v-list-item-title>
                  <v-list-item-title v-if="loading" class="text-h6 mb-1 mt-n6">
                    -
                  </v-list-item-title>
                  <div class="text-overline mb-4">
                    Verfügbares Geld
                  </div>
                  <v-list-item-title
                    data-testid="VerfügbaresGeld"
                    v-if="!loading"
                    class="text-h6 mb-1 mt-n6"
                  >
                    {{
                      parseInt(cash)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "€"
                    }}
                  </v-list-item-title>
                  <v-list-item-title v-if="loading" class="text-h6 mb-1 mt-n6">
                    -
                  </v-list-item-title>
                  <div class="text-overline mb-4">
                    Aktien Wert
                  </div>
                  <v-list-item-title
                    data-testid="AktienWert"
                    v-if="!loading"
                    class="text-h6 mb-1 mt-n6"
                  >
                    {{
                      parseInt(akValue)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "€"
                    }}
                  </v-list-item-title>
                  <v-list-item-title v-if="loading" class="text-h6 mb-1 mt-n6">
                    -
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-btn elevation="1" class="primary  mt-2" @click="showCode"
              >Competition Code</v-btn
            >
          </div>
          <div>
            <v-btn
              elevation="1"
              class="primary mt-2"
              :to="`/ranking/${comp_id}`"
              >Ranking</v-btn
            >
            <v-btn
              elevation="1"
              data-testid="btnBuyDialog"
              @click="sellbuy"
              class="primary mt-2 ml-2"
              color="sucess"
              >Kaufen</v-btn
            >
          </div></v-col
        >

        <v-col cols="12" sm="5"
          ><div class="z">
            <div class=" text-h5 mb-2 ms-5">Aktien</div>
            <v-data-table
              :loading="loading"
              :headers="headers"
              :items="akHave"
              class="elevation-2 ms-5"
            >
              <template v-slot:[`item.wert`]="{ item }">
                <div>
                  {{
                    parseInt(item.wert)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "€"
                  }}
                </div>
              </template>
              <template v-slot:[`item.buy_price`]="{ item }">
                <div>
                  {{
                    parseInt(item.buy_price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "€"
                  }}
                </div>
              </template>
              <template v-slot:[`item.count`]="{ item }">
                <div>
                  {{
                    parseInt(item.count)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                </div>
              </template>
              <template v-slot:[`item.verkaufen`]="{ item }">
                <v-btn
                  @click="openSellDialog(item)"
                  outlined
                  elevation="0"
                  class="  mt-2 mb-2 me-2"
                  small
                  color="primary"
                  >Verkaufen</v-btn
                >
              </template>
            </v-data-table>
          </div></v-col
        >

        <v-col cols="12" sm="2"></v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="sellDialog" max-width="300px">
      <v-card>
        <div class="d-flex justify-space-around">
          <v-container fluid>
            <v-row
              ><v-col cols="12" sm="6"
                ><div>
                  Verkaufen
                </div>
                <v-text-field
                  v-model="sellCount"
                  hide-details
                  single-line
                  type="number"
                  @input="sellAkWert"
              /></v-col>
              <v-col cols="12" sm="6"
                ><div>
                  <p>Wert:</p>
                  <p>{{ sellWert }}</p>
                </div></v-col
              ></v-row
            >
            <div class="d-flex justify-space-around">
              <v-btn
                @click="sellAk"
                elevation="1"
                small
                block
                class="primary  mt-1 mb-1 mx-auto"
                >Verkaufen</v-btn
              >
            </div>

            <!-- <v-btn
              @click="closeSell"
              elevation="1"
              small
              class="primary  mt-1 mb-1"
              >Close</v-btn
            > -->
          </v-container>
        </div>
      </v-card>
    </v-dialog>
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
                    data-testid="btnBuy"
                    @click="openBuyDialog(item)"
                    small
                    plain
                    class="primary  mt-2 mb-2 me-2"
                    >Kaufen</v-btn
                  >
                  <v-btn
                    @click="buyDetail(item)"
                    small
                    plain
                    class="primary  mt-2 mb-2"
                    >Detail</v-btn
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
                  type="Number"
                  color="primary"
                  v-model="sellPrice"
                  @input="sellAkCount"
              /></v-form>
              <!-- <div class="mb-3 mt-n1 textfields d-flex justify-space-between">
                <v-btn width="45%">Plus</v-btn>
                <v-btn width="45%">Minus</v-btn>
              </div> -->
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Verfügbares Geld:
                </div>
                <div class="h5">
                  {{ cash }}
                </div>
              </div>
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Preis pro Aktie:
                </div>
                <div class="h5">
                  <!-- {{ akData.find((e) => e.isin == curAk.isin).kurs }} -->
                </div>
              </div>
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Dein Aktienwert:
                </div>
                <div class="h5">
                  {{ curAk.wert }}
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
                  Portfolio Wert:
                </div>
                <div class="h5">
                  {{ portValue }}
                </div>
              </div>
              <div class="textfields d-flex justify-space-between">
                <div class="h5">
                  Verfügbares Geld nach Kauf:
                </div>
                <div class="h5">
                  {{ Number(cash) + Number(sellPrice) }}
                </div>
              </div>
              <div class="mb-n3 mt-3 textfields d-flex ">
                <v-btn width="100%" @click="sellAk">Verkaufen</v-btn>
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
    <v-dialog v-model="buyDialog" max-width="500px">
      <v-card>
        <v-card-title>Aktien Kaufen</v-card-title>
        <v-window>
          <v-window-item
            ><v-form
              ><v-text-field
                data-testid="MoneyForStock"
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
          <v-btn
            data-testid="btnBuyStock"
            @click="buyStock"
            small
            class="primary  mt-2 mb-2"
            >Kaufen</v-btn
          >
          <v-btn @click="closeBuy" small class="primary  mt-2 mb-2"
            >Cancel</v-btn
          >
        </v-card-action>
      </v-card>
    </v-dialog>
    <v-dialog v-model="compCode_dialog" max-width="200px">
      <v-card>
        <v-card-title class="mt-n1"
          ><v-spacer></v-spacer>{{ compCode }}<v-spacer></v-spacer
        ></v-card-title>

        <!-- <v-card-action>
          <v-btn @click="closeCode" small class="primary mt-2 mb-2"
            >Cancel</v-btn
          >
        </v-card-action> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import TopBarMarket from "../components/TopBarMarket.vue";
import server from "@/serverInterface";

export default {
  components: {
    TopBarMarket,
  },
  methods: {
    sellAkWert() {
      let akHavingCount = this.stocks.find((e) => e.isin == this.curAk.isin)
        .count;
      if (this.sellCount > akHavingCount) {
        this.sellCount = akHavingCount;
        alert(`Du kannst nur maximal ${akHavingCount} Aktien verkaufen`);
      }
      this.sellPrice = this.akKurs.find((e) => e.isin == this.curAk.isin).wert;
      this.sellWert = this.sellPrice * this.sellCount;
    },
    closeSell() {
      this.sellDialog = false;
    },
    async sellbuy() {
      this.dialog = true;
    },
    openSellDialog(item) {
      this.curAk = item;
      this.step = 1;
      this.sellDialog = true;
    },
    openBuyDialog(item) {
      this.curAk = item;
      this.buyDialog = true;
      // this.dialog = false;
    },
    closeBuy() {
      this.buyDialog = false;
    },
    closeCode() {
      this.compCode_dialog = false;
    },
    async showCode() {
      let comps = (await server.get(`http://localhost:3000/user/competitions`))
        .data;
      comps = comps.find((e) => e.competition_id == this.comp_id);
      this.compCode = comps.competition_code;
      // console.log(comps);
      this.compCode_dialog = true;
    },
    sellAkCount() {
      if (this.sellPrice > this.curAk.wert) {
        this.sellPrice = this.curAk.wert;
      }
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
      this.user = (await server.get("http://localhost:3000/user/data")).data;
      // console.log(this.user);
    },
    async getStocks() {
      this.stocks = (
        await server.get(
          `http://localhost:3000/competitions/${this.comp_id}/getCompStocks`
        )
      ).data;
      // console.log(this.stocks);
    },
    async buyStock() {
      console.log("buy");
      let newItem = {
        isin: this.curAk.isin,
        buy_price: this.curAk.kurs,
        competition_id: this.comp_id,
        count: this.buyCount,
      };
      await server.post(`http://localhost:3000/user/buyStocks`, newItem);
      this.dialog = false;
      this.buyDialog = false;
      await this.getStocks();
      this.createAkForTable();
    },
    async sellAk() {
      // console.log(this.sellPrice);
      // console.log(this.curAk);
      // let newCount = (this.sellPrice / this.curAk.wert).toFixed(2);
      this.sellPrice = this.akKurs.find((e) => e.isin == this.curAk.isin).wert;
      let obj = {
        isin: this.curAk.isin,
        sell_price: this.sellPrice,
        buy_price: Number(this.curAk.buy_price),
        competition_id: this.comp_id,
        count: Number(this.sellCount),
      };
      console.log(obj);
      await server.post(`http://localhost:3000/user/sellStocks`, obj);
      this.sellDialog = false;
      window.location.reload();
      // this.getStocks();
      // this.createAkForTable();
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
    getBuyCount() {
      // console.log(this.curAk);
      this.buyCount = (this.anzGeld / this.curAk.kurs).toFixed(2);
    },
    buyDetail(item) {
      this.$router.replace(`/detailAk/${item.isin}/${this.comp_id}`);
    },
    createAkForTable() {
      this.cash = 0;
      this.akValue = 0;
      this.akHave = [];
      let ak = {};
      let kurs = {};
      for (let a of this.stocks) {
        if (a.isin != "0000") {
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
    (this.loading = true), await this.getData();
    await this.getStocks();
    this.akInfo = (
      await axios.get("https://heroku-porftolio-crawler.herokuapp.com/akInfo")
    ).data;
    this.akKurs = (
      await axios.get("https://heroku-porftolio-crawler.herokuapp.com/akKurs")
    ).data;
    // console.log(this.akInfo);
    // console.log(this.akKurs);
    this.createAktie();
    this.createAkForTable();
    this.loading = false;
  },
  data() {
    return {
      loading: false,
      akInfo: [],
      akData: [],
      akKurs: [],
      akHave: [],
      sellDialog: false,
      cash: 0,
      compCode_dialog: false,
      compCode: "",
      anzGeld: 0,
      buyCount: 0,
      portValue: 0,
      akValue: 0,
      sellPrice: 0,
      sellCount: 0,
      newCash: 0,
      dialog: false,
      buyDialog: false,
      step: 0,
      visible: false,
      competetion: {},
      user: {},
      sellWert: 0,
      curAk: {},
      stocks: [],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {
          text: "Isin",
          align: "start",
          sortable: false,
          value: "isin",
        },
        { text: "Wert", value: "wert" },
        { text: "Kaufpreis", value: "buy_price" },
        { text: "Count?", value: "count" },
        { text: "", value: "verkaufen" },
      ],
      headersKaufen: [
        {
          text: "Name",
          align: "center",
          sortable: true,
          value: "name",
        },
        { text: "ISIN", value: "isin", sortable: false },
        { text: "Kurs", value: "kurs" },
        { text: "Kaufen", value: "actions", sortable: false },
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
/* .z {
  margin-left: 7vw;
}
.b {
  margin-left: 20vw;
}
.bod {
  height: 100%;
}
.mar {
  margin-left: 80px;
}
.mar2 {
  margin-right: 630px;
} */
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
