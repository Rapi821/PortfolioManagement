<template>
  <div class="fill-height">
    <TopBar />
    <v-card elevation="1" outlined max.width="300" class="mx-auto">
      <v-card-title align="center">{{ this.akInfo.title }}</v-card-title>
      <v-card-text>
        <v-row>
          <div>
            <b>ISIN:</b> {{ this.akInfo.isin }} <b> WKN:</b>
            {{ this.akInfo.wkn }}
          </div>
        </v-row>
        <v-row>
          <div><b>Wert: </b> {{ this.akKurs[0].wert }}</div>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn class="me-2 mx-auto" color="primary">Kaufen</v-btn>
        <v-btn class="me-2 mx-auto" color="primary">Verkaufen</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Market',
  data() {
    return {
      akInfo: [],
      akKurs: [],
    };
  },
  methods: {
    async getKurs() {
      this.akKurs = (
        await axios.get(
          `https://hello-worls-azure-crawler.azurewebsites.net/akDetailKurs/${this.akInfo.isin}`
        )
      ).data;
    },
  },
  async created() {
    this.akInfo = (
      await axios.get(
        `https://hello-worls-azure-crawler.azurewebsites.net/akDetail/${this.isin}`
      )
    ).data[0];
    this.getKurs();
  },
  props: {
    isin: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
