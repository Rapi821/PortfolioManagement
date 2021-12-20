<template>
  <div>
    <TopBar />
    <v-card>
      <v-card-title>Deine Competitions</v-card-title>
      <v-card-actions
        ><v-btn>Competition Beitreten</v-btn> <v-btn>Neue Competition</v-btn></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue';
export default {
  components: {
    TopBar,
  },
  props: {
    user_id: Number,
  },
  created () {
    console.log(this.user_id);
  },
};
</script>

<style lang="scss" scoped></style>
