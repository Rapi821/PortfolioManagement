<template>
  <div class="fill-height">
    <!-- <v-card class="mx-auto" max-width="600">
      <v-card-title>Willkomen zu Portfolio-Management</v-card-title>
      <v-card-text>Starte das Abenteuer</v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" to="LoginRegister">
          Anmelden
        </v-btn>
      </v-card-actions>
    </v-card> -->
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col class="ml-12"
          ><p class=" text-xl-h1 text-lg-h1 text-md-h2 text-no-wrap font-weight-medium">
            Willkommen zu <br />Portfolio-Management
          </p>
          <p class="text-xl-h4 text-lg-h4 text-md-h5 font-weight-light">
            Starte das Abenteuer
          </p>
          <v-btn
            data-testid="btnstart"
            min-width="200px"
            class="mt-14"
            outlined
            rounded
            large
            color=""
            to="LoginRegister"
          >
            Anmelden
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {},
};
</script>
<style>
.a {
  width: 300px;
}
</style>
