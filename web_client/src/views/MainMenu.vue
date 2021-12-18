<template>
  <div>
      <TopBar/>
    <v-card> </v-card>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
export default {
  components: {
    TopBar,
  },
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped></style>
