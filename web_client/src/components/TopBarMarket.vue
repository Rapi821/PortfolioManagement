<template>
  <v-app-bar app color="secondary" dark class="px-16">
    <div class="d-none d-xl-flex a"></div>
    <v-btn color="black" active-class="white black--text" @click="logOut"
      >Logout</v-btn
    >

    <v-spacer></v-spacer>
    <v-btn
      outlined
      active-class="white primary--text"
      :to="`/Market/${comp_id}`"
      >Market</v-btn
    >
    <v-btn
      outlined
      active-class="white primary--text"
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
export default {
  name: 'TopBarMarket',
  props: {
    comp_id: {
      type: String,
    },
  },
  data: () => ({
    //
  }),
  methods: {
    logOut() {},
  },
};
</script>
<style>
.a {
  width: 300px;
}
</style>
