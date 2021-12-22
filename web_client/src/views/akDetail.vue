<template>
  <div>
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
          `http://localhost:5000/akDetailKurs/${this.akInfo.isin}`
        )
      ).data;
    },
  },
  async created() {
    this.akInfo = (
      await axios.get(`http://localhost:5000/akDetail/${this.isin}`)
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
