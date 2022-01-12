<template>
  <div>
    <TopBar />

    <div class="d-flex">
      <div class="d-none d-xl-flex b"></div>
      <div class="mar">
        <div class="z text-h5">
          Portfolio Wert
        </div>
        <v-card class="" max-width="200">
          <v-list-item three-line>
            <v-list-item-content>
              <div class=" text-overline mb-4">
                Portfolio Wert
              </div>
              <v-list-item-title class="text-h6 mb-1 mt-n6">
                5774€
              </v-list-item-title>
              <div class="text-overline mb-4">
                Portfolio Wert
              </div>
              <v-list-item-title class="text-h6 mb-1 mt-n6">
                5774€
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "../components/TopBar.vue";

export default {
  components: {
    TopBar,
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
</style>
