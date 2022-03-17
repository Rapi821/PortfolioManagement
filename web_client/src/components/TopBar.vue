<template>
  <v-app-bar app color="secondary" dark class="px-16">
    <div class="d-none d-xl-flex a"></div>
    <v-btn color="black" active-class="white black--text" 
      >Logout</v-btn
    >

    <v-spacer></v-spacer>
    <v-tooltip bottom v-model="show">
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <!-- muss noch mit hover gemacht werden!! -->
          <v-btn
          
          @click="$emit('someEvent')"
          
            disabled
            v-bind="attrs"
            v-on="on"
            outlined
            active-class="white primary--text"
            >Market</v-btn
          >
        </div>
      </template>
      <span
        >Wähle eine Competition aus bevor du auf den Markt zugreifen
        kannst</span
      >
    </v-tooltip>

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
  name: "TopBar",

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
