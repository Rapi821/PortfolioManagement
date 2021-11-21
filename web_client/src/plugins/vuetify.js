import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#b3ccff", //
        secondary: "#fff333",
        accent: "#E53935",
      },
    },
  },
});
