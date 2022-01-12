<template>

<div>
   <v-row no-gutters> 
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
      </v-col>
      </v-row>
  <v-card
    class="mx-auto"
    max-width="344"
  >
  
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Portfolio Wert
        </div>
        <v-list-item-title class="text-h5 mb-1 mt-n6">
          5774€
        </v-list-item-title>
        <div class="text-overline mb-4">
          Portfolio Wert
        </div>
        <v-list-item-title class="text-h5 mb-1 mt-n6">
          5774€
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</div>
</template>