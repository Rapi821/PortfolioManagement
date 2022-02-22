<template>
  <div>
    <TopBarMarket />
    <h1>Ranking</h1>
    <div>
      <v-btn :to="`/Dashboard/${comp_id}`">Zurück zum Dashboard</v-btn>
    </div>
    <div>
      <template>
        <v-container class="fill-height " fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8">
              <v-data-table
                :headers="headers"
                :items="desserts"
                class="elevation-1"
                max-width="500px"
              >
              </v-data-table> </v-col></v-row
        ></v-container>
      </template>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import server from '@/serverInterface';
import TopBarMarket from "../components/TopBar.vue";
export default {
  components: { TopBarMarket },
  props: {
    comp_id: {
      type: Number,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Platzierung",
          align: "start",
          sortable: true,
          value: "#",
        },
        { text: "Name", value: "#" },
        { text: "Portfolio Wert", value: "#" },
      ],
    };
  },
  methods: {
    // async getCompetition() {
    //   console.log(
    //     (await server.get(`http://localhost:3000/competition/${this.comp_id}`))
    //       .data
    //   );
    // },
  },
  async created() {
    // await this.getCompetition();
  },
};
</script>

<style lang="scss" scoped></style>
