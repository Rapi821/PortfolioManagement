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
                5774€
              </v-list-item-title>
              <div class="text-overline mb-4">
                Verfügbares Geld
              </div>
              <v-list-item-title class="text-h6 mb-1 mt-n6">
                237€
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
      <v-spacer></v-spacer>
      <div class="mar2">
        <div class=" text-h5 mb-2">
          Dein Aktien Gemma
        </div>
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-0"
        ></v-data-table>
      </div>

      <!-- <div class="d-none d-xl-flex b"></div> -->
    </div>
    <v-btn @click="sellbuy">TestButton</v-btn>
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
              <v-form
                ><v-text-field
                  label="Anzahl"
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
              </div>
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
import TopBar from "../components/TopBar.vue";

export default {
  components: {
    TopBar,
  },
  methods: {
    sellbuy() {
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
  },
  data() {
    return {
      dialog: false,
      step: 0,
      visible: false,
      competetion: {},
    };
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
  margin-bottom: ;
}
.divider_style {
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>
