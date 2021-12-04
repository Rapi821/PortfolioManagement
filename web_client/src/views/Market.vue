<template>
  <div class="flex-row mx-auto d-flex mb-6 justify-center fill-height">
    <div class="d-none d-xl-flex a"></div>
    <v-spacer></v-spacer>
    <div align="center">
      <v-data-table
        :headers="headers"
        :items="akData"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn :to="`/akDetail/${item.isin}`">Details</v-btn>
        </template>
      </v-data-table>
    </div>
    <v-spacer></v-spacer>
    <div class="d-none d-xl-flex a"></div>
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
      akData: [],

      headers: [
        {
          text: 'Name',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        { text: 'ISIN', value: 'isin', sortable: false },
        { text: 'WKN', value: 'wkn', sortable: false },
        { text: 'Kurs', value: 'kurs' },
        { text: 'Aktionen', value: 'actions' },
      ],
    };
  },
  methods: {
    createAktie() {
      // console.log(this.akInfo);
      for (let elm of this.akInfo) {
        let aktie = { name: elm.title, isin: elm.isin, wkn: elm.wkn, kurs: 1 };
        this.akData.push(aktie);
      }
      for (let el of this.akData) {
        console.log(el);
        let wert = this.akKurs.find((e) => e.isin == el.isin);
        if (wert == undefined) {
          wert = { wert: 1 };
        }
        el.kurs = wert.wert;
      }
      // console.log(this.akData);
    },
  },
  async created() {
    this.akInfo = (await axios.get('http://localhost:3000/akInfo')).data;
    this.akKurs = (await axios.get('http://localhost:3000/akKurs')).data;
    this.createAktie();
  },
};
</script>
<style>
.a {
  width: 300px;
}
</style>
