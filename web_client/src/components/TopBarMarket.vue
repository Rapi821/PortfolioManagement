<template>
  <v-app-bar app elevation="1" color="secondary" dark class="px-16">
    <div class="d-none d-xl-flex a"></div>
    <v-btn color="white" outlined @click="logOut">Logout</v-btn>

    <v-spacer></v-spacer>
    <v-btn outlined active-class="" :to="`/Market/${comp_id}`">Market</v-btn>
    <v-btn
      data-testid="btnMainMenu"
      outlined
      active-class=""
      class="mx-3"
      :to="`/mainmenu`"
      >Main Menu</v-btn
    >
    <!-- <v-btn outlined active-class="white primary--text" to="/Dashboard"
      >Dashboard</v-btn
    > -->

    <div class="d-none d-xl-flex a"></div>
  </v-app-bar>
</template>

<script>
import server from "@/serverInterface";
export default {
  name: "TopBarMarket",
  props: {
    comp_id: {
      type: String,
    },
  },
  data: () => ({
    //
  }),
  methods: {
    async logOut() {
      await server.post("http://localhost:3000/user/logout");
      this.$router.replace(`/`);
    },
  },
};
</script>
<style>
.a {
  width: 300px;
}
</style>
