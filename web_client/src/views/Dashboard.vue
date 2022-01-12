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
          <div v-on:click="stepc0" :disabled="step == 0">Kaufen</div>
          <div v-on:click="stepc1" :disabled="step == 1">Verkaufen</div>
        </div>
        <v-window v-model="step">
          <v-window-item :value="0">
            <v-form
              ><v-text-field
                label="Anzahl"
                name="Anzahl"
                type="text"
                color="primary"
            /></v-form>
            <div class="d-flex justify-space-around">
              <v-btn>Plus</v-btn>
              <v-btn>Minus</v-btn>
            </div>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Verfügbares Geld:
              </div>
              <div class="h5">
                2345
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Preis pro Aktie:
              </div>
              <div class="h5">
                743
              </div>
            </div>

            <div class="d-flex justify-space-between">
              <div class="h5">
                Preis insgesamt:
              </div>
              <div class="h5">
                2344
              </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Preis insgesamt:
              </div>
              <div class="h5">
                2344
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Verfügbares Geld nach Kauf:
              </div>
              <div class="h5">
                2344
              </div>
            </div>
            <v-btn>Kauf -Aktie-</v-btn>
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
            <div class="d-flex justify-space-around">
              <v-btn>Plus</v-btn>
              <v-btn>Minus</v-btn>
            </div>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Verfügbares Geld:
              </div>
              <div class="h5">
                2345
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Preis pro Aktie:
              </div>
              <div class="h5">
                743
              </div>
            </div>

            <div class="d-flex justify-space-between">
              <div class="h5">
                Preis insgesamt:
              </div>
              <div class="h5">
                2344
              </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Preis insgesamt:
              </div>
              <div class="h5">
                2344
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="h5">
                Verfügbares Geld nach Kauf:
              </div>
              <div class="h5">
                2344
              </div>
            </div>
            <v-btn>Kauf -Aktie-</v-btn></v-window-item
          >
        </v-window>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="createCompetition">
            Create
          </v-btn>
        </v-card-actions>
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
    },
    stepc1() {
      this.step = 1;
    },
  },
  data() {
    return {
      dialog: false,
      step: 0,
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
</style>
