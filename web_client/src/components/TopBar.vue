<template>
  <v-app-bar app color="primary" dark class="px-16">
    <div class="d-none d-xl-flex a"></div>
    <v-btn color="black" active-class="white black--text" to="/LoginRegister"
      >Button1</v-btn
    >

    <v-spacer></v-spacer>
    <v-btn outlined active-class="white primary--text" to="/Market"
      >Button2</v-btn
    >
    <v-btn outlined active-class="white primary--text" class="mx-3"
      >Button3</v-btn
    >
    <v-btn outlined active-class="white primary--text">Button4</v-btn>

    <div class="d-none d-xl-flex a"></div>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopBar",

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
