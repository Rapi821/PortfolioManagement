<template>
  <v-app
    style="background-image: linear-gradient(to left top, #ccf0ff, #d3f2ff, #d9f3ff, #e0f5ff, #e6f7ff);"
  >
    <!-- <v-app-bar app color="primary" dark class="px-16">
      <div class="d-none d-xl-flex a"></div>
      <v-btn color="black" active-class="white black--text" to="/LoginRegister"
        >Button1</v-btn
      >

      <v-spacer></v-spacer>
      <v-btn outlined>Button2</v-btn>
      <v-btn outlined class="mx-3">Button3</v-btn>
      <v-btn outlined>Button4</v-btn>

      <div class="d-none d-xl-flex a"></div>
    </v-app-bar> -->
    <!-- <TopBar class="d-none"></TopBar> -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import TopBar from "./components/TopBar.vue";

export default {
  name: "App",
  components: {  },
  data: () => ({
    //
  }),
};
</script>

<style>
.a {
  width: 300px;
}
</style>
